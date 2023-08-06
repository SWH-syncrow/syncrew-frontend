"use client";
import { isSettledAuthAtom, userAtom } from "@app/GlobalProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { useEffect, useState } from "react";
import { AuthUserApis } from "src/lib/apis/authUserApis";
import { authInstance } from "src/lib/axios/instance";
import {
  deleteRefreshTokenFromCookie,
  getRefreshTokenFromCookie,
  setRefreshTokenToCookie,
} from "../_server/serverAuth";
import { redirect } from "next/navigation";
import { AxiosError } from "axios";

const useAuth = () => {
  const [accessToken, setAccessToken] = useState("");
  const setUserAtom = useSetAtom(userAtom);
  const resetUserAtom = useResetAtom(userAtom);

  const setIsSettledAuth = useSetAtom(isSettledAuthAtom);

  useEffect(() => {
    (async () => {
      const refresh = await getRefreshTokenFromCookie();
      if (refresh) reissueToken.mutate(refresh);
      else setIsSettledAuth(true);
    })();
  }, []);

  const reissueToken = useMutation({
    mutationFn: async (refreshToken: string) =>
      await AuthUserApis.reissueToken(refreshToken),
    onSuccess: (res: any) => {
      const { accessToken, refreshToken } = res.data;
      authInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
      setRefreshTokenToCookie(refreshToken);
      setAccessToken(accessToken);
    },
    onError: (err: AxiosError) => {
      console.error(err);
      deleteRefreshTokenFromCookie();
      resetUserAtom();
      setIsSettledAuth(true);

      if (err.response?.status === 401) redirect("/login");
    },
  });

  useQuery(["getUser"], {
    queryFn: async () => await AuthUserApis.getUser(),
    onSuccess: ({ data }) => {
      setUserAtom(data);
    },
    onError: (err) => {
      console.error(err);
      resetUserAtom();
    },
    onSettled: () => setIsSettledAuth(true),
    enabled: accessToken !== "",
  });

  return;
};

export default useAuth;
