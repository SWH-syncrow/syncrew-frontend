"use client";

import { setRefreshTokenToCookie } from "@components/_server/serverAuth";
import { useHydrateAtoms } from "jotai/utils";
import { PropsWithChildren, useEffect } from "react";
import { GetUserResponse } from "src/lib/apis/_models/AuthDto";
import { authInstance } from "src/lib/axios/instance";
import { userAtom } from "./GlobalProvider";

export default function AuthProvider({
  children,
  auth,
}: PropsWithChildren<{
  auth: {
    user: GetUserResponse;
    token: { accessToken: string; refreshToken: string };
  } | null;
}>) {
  auth &&
    useHydrateAtoms([
      [userAtom, auth?.user],
    ]);

  useEffect(() => {
    if (!auth) return;

    authInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth?.token.accessToken}`;
    console.log(authInstance.defaults.headers.common);

    setRefreshTokenToCookie(auth?.token.refreshToken);
  }, []);

  return <>{children}</>;
}
