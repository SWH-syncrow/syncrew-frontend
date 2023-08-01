"use client";

import useAuth from "@components/hooks/useAuth";
import { atomWithReset } from "jotai/utils";
import React, { useEffect } from "react";
import { User } from "./types";
import { usePathname } from "next/navigation";

export const userAtom = atomWithReset<User>({
  id: -1,
  username: "",
  email: "",
  profileImage: "",
  temp: 36.5,
  isTestTarget: false,
});
export const isLoggedInAtom = atomWithReset<boolean>(false);
export default function GlobalProvider(props: { children: React.ReactNode }) {
  useAuth();
  const path = usePathname();

  const storePathValues = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    const prevPath = storage.getItem("currentPath") || "";
    storage.setItem("prevPath", prevPath);
    storage.setItem("currentPath", globalThis.location.pathname);
  };

  useEffect(() => storePathValues, [path]);

  return <>{props.children}</>;
}
