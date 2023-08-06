"use client";
import { isSettledAuthAtom, userAtom } from "@app/GlobalProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useAtom, useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { AuthUserApis } from "src/lib/apis/authUserApis";
import { authInstance } from "src/lib/axios/instance";
import {
  deleteRefreshTokenFromCookie,
  getRefreshTokenFromCookie,
} from "../_server/serverAuth";

const useAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const resetUserAtom = useResetAtom(userAtom);

  const setIsSettledAuth = useSetAtom(isSettledAuthAtom);

  useEffect(() => {
    if (user.id !== -1) return;

    getRefreshTokenFromCookie().then((refresh) =>
      refresh ? reissueToken.mutate() : setIsSettledAuth(true)
    );
  }, [user.id]);

  const reissueToken = useMutation({
    mutationFn: async () => await AuthUserApis.reissueToken(),
    onSuccess: ({ data: { accessToken } }: AxiosResponse) => {
      authInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
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
      setUser(data);
    },
    onError: (err) => {
      console.error(err);
      resetUserAtom();
    },
    onSettled: () => setIsSettledAuth(true),
    enabled: !!authInstance.defaults.headers.common["Authorization"],
  });

  return;
};

export default useAuth;
