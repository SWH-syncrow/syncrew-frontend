"use client";
import { isLoggedInAtom, userAtom } from "@app/GlobalProvider";
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

const useAuth = () => {
  const [checkTokenLoading, setCheckTokenLoading] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const setUserAtom = useSetAtom(userAtom);
  const resetUserAtom = useResetAtom(userAtom);
  const setIsLoggedInAtom = useSetAtom(isLoggedInAtom);
  const resetIsLoggedInAtom = useResetAtom(userAtom);

  useEffect(() => {
    (async () => {
      const refresh = await getRefreshTokenFromCookie();
      if (refresh) reissueToken.mutate(refresh);

      setCheckTokenLoading(false);
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
    onError: (err) => {
      console.error(err);
      deleteRefreshTokenFromCookie();
      resetUserAtom();
      resetIsLoggedInAtom();
    },
  });

  const { isFetching } = useQuery(["getUser"], {
    queryFn: async () => await AuthUserApis.getUser(),
    onSuccess: ({ data }) => {
      setUserAtom(data);
      setIsLoggedInAtom(true);
    },
    onError: (err) => {
      console.error(err);
      resetUserAtom();
      resetIsLoggedInAtom();
    },
    enabled: accessToken !== "",
  });

  return {
    isLoading: checkTokenLoading || reissueToken.isLoading || isFetching,
  };
};

export default useAuth;
