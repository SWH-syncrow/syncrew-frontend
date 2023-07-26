"use client";

import useAuth from "@components/hooks/useAuth";
import { atomWithReset } from "jotai/utils";
import React from "react";
import { User } from "./types";

export const userAtom = atomWithReset<User>({
  id: -1,
  username: "",
  email: "",
  profileImage: "",
  temp: 36.5,
});
export const isLoggedInAtom = atomWithReset<boolean>(false);
export default function GlobalProvider(props: { children: React.ReactNode }) {
  useAuth();
  return (
    <>
      {/* <DevTools /> */}
      {props.children}
    </>
  );
}
