import { userAtom } from "@app/GlobalProvider";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AuthUserApis } from "src/lib/apis/authUserApis";
import { KakaoAuth } from "src/lib/apis/kakao/KakaoAuth";
import { authInstance } from "src/lib/axios/instance";

const useAuthKakao = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams?.get("code");
  const setUserAtom = useSetAtom(userAtom);

  useEffect(() => {
    if (query) getKakaoToken.mutate(query);
  }, [query]);

  const getKakaoToken = useMutation({
    mutationFn: async (code: string) => {
      const data = {
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_KAKAO_REST_KEY || "",
        redirect_uri: `${
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_PROD_DOMAIN
            : process.env.NEXT_PUBLIC_DOMAIN
        }/login`,
        code,
      };
      const queryString = Object.keys(data)
        .map((key) => `${key}=${data[key as keyof typeof data]}`)
        .join("&");

      return await KakaoAuth.getToken(queryString);
    },
    onSuccess: (res: any) => {
      kakaoLogin.mutate(res.data.access_token);
    },
    retry: false,
  });

  const kakaoLogin = useMutation({
    mutationFn: async (kakao_access_token: string) =>
      await AuthUserApis.kakaoLogin(kakao_access_token),
    onSuccess: (res: any) => {
      const {
        user,
        token: { accessToken },
      } = res.data;
      authInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
      setUserAtom(user);
      const currentPath =
        globalThis?.sessionStorage.getItem("currentPath") || "/login";
      currentPath === "/login" ? router.push("/") : router.push(currentPath);
    },
    onError: (e) => {
      alert("로그인에 실패했어요");
      console.error(e);
    },
  });

  return {
    isLoading: getKakaoToken.isLoading || kakaoLogin.isLoading,
  };
};

export default useAuthKakao;
