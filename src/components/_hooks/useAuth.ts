"use client";
import { isLoggedInAtom, userAtom } from "@app/GlobalProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import {
  getRefreshTokenFromCookie,
  setRefreshTokenToCookie,
} from "../_server/serverAuth";
import { AuthUserApis } from "src/lib/apis/authUserApis";
import { useEffect, useState } from "react";
import authInstance from "src/lib/axios/instance";
const useAuth = () => {
  const [accessToken, setAccessToken] = useState("");
  const setUserAtom = useSetAtom(userAtom);
  const resetUserAtom = useResetAtom(userAtom);
  const setIsLoggedInAtom = useSetAtom(isLoggedInAtom);
  const resetIsLoggedInAtom = useResetAtom(userAtom);

  useEffect(() => {
    (async () => {
      const refresh = (await getRefreshTokenFromCookie())?.value || "";
      if (refresh !== "") reissueToken.mutate(refresh);
    })();
  }, []);

  const reissueToken = useMutation({
    mutationFn: async (refreshToken: string) =>
      await AuthUserApis.reissueToken(refreshToken),
    onSuccess: (res: any) => {
      const { accessToken, refreshToken } = res.data;
      authInstance.defaults.headers.common["Authorization"] = `${accessToken}`;
      setRefreshTokenToCookie(refreshToken);
      setAccessToken(accessToken);
    },
    onError: (err) => {
      console.error(err);
      resetUserAtom();
      resetIsLoggedInAtom();
    },
  });

  useQuery(["getUser"], {
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

  return;
};

export default useAuth;
