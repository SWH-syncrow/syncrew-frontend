"use client";

import useAuth from "@components/_hooks/useAuth";
import useGetChannels from "@components/_hooks/useGetChannels";
import { atom } from "jotai";
import { DevTools } from "jotai-devtools";
import { atomWithReset } from "jotai/utils";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { GetUserResponse } from "src/lib/apis/_models/AuthDto";
import { ChannelsObj } from "./chat/_components/types";
import LoadingScreen from "@components/LoadingScreen";

export const userAtom = atomWithReset<GetUserResponse>({
  id: -1,
  username: "",
  email: "",
  profileImage: "",
  temp: 36.5,
  isTestTarget: false,
});
userAtom.debugLabel = "userAtom";

export const channelsAtom = atom<ChannelsObj>({});
channelsAtom.debugLabel = "channelsAtom";

export default function GlobalProvider(props: { children: React.ReactNode }) {
  const path = usePathname();
  const { isLoading } = useAuth();
  useGetChannels();

  const storePathValues = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    const prevPath = storage.getItem("currentPath") || "";
    storage.setItem("prevPath", prevPath);
    storage.setItem("currentPath", globalThis.location.pathname);
  };

  useEffect(() => storePathValues, [path]);

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      <DevTools />
      {props.children}
    </>
  );
}
