"use client";
import { isSettledAuthAtom, userAtom } from "@app/GlobalProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthUserApis } from "src/lib/apis/authUserApis";
import { authInstance } from "src/lib/axios/instance";
import {
  deleteRefreshTokenFromCookie,
  getRefreshTokenFromCookie,
} from "../_server/serverAuth";

const useAuth = () => {
  const [accessToken, setAccessToken] = useState("");
  const setUserAtom = useSetAtom(userAtom);
  const resetUserAtom = useResetAtom(userAtom);

  const setIsSettledAuth = useSetAtom(isSettledAuthAtom);

  useEffect(() => {
    getRefreshTokenFromCookie().then((refresh) =>
      refresh ? reissueToken.mutate() : setIsSettledAuth(true)
    );
  }, []);

  const reissueToken = useMutation({
    mutationFn: async () => await AuthUserApis.reissueToken(),
    onSuccess: (res: AxiosResponse) => {
      const { accessToken } = res.data;
      authInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
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
