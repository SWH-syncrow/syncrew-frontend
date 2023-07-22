"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { setRefreshTokenToCookie } from "../serverAuth";
const useAuth = () => {
  useQuery(["getAuth"], {
    queryFn: async () => {
      return { data: { access_token: "Test", refresh_token: "test" } };
    },
    onSuccess: ({ data }) => {
      const { access_token, refresh_token } = data;
      axios.defaults.headers.common["Authorization"] = `${access_token}`;
      setRefreshTokenToCookie(refresh_token);
      // user 정보
    },
    onError: (err) => {
      console.error(err);
      // 로그아웃
    },
  });

  return;
};

export default useAuth;
