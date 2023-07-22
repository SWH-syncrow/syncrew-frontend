import { setRefreshTokenToCookie } from "@components/serverAuth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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
    mutationFn: async (kakao_access_token: string) => {
      return;
    },
    onSuccess: ({ data }) => {
      const { access_token, refresh_token } = data;
      axios.defaults.headers.common["Authorization"] = `${access_token}`;
      setRefreshTokenToCookie(refresh_token);
      // user 정보 저장
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
