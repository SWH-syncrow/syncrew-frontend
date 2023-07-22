import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { KakaoAuth } from "src/lib/apis/KakaoAuth";

const useAuthKakao = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("code");

  const getKakaoToken = useMutation({
    mutationFn: async (code: string) => {
      const data = {
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_KAKAO_REST_KEY || "",
        redirect_uri: `${
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PROD_DOMAIN
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
      // getAuthFromServer.mutate(res.data.access_token);
    },
    retry: false,
  });

  const getAuthFromServer = useMutation({
    mutationFn: async (token: string) => {
      return;
    },
    onSuccess: (res: any) => {
      const { access_token, refresh_token } = res.data;
      //토큰 쿠키 저장
    },
  });

  useEffect(() => {
    if (query) {
      getKakaoToken.mutate(query);
    }
  }, [query]);

  return {
    isLoading: getKakaoToken.isLoading || getAuthFromServer.isLoading,
  };
};

export default useAuthKakao;
