"use client";

import useAuth from "@components/_hooks/useAuth";
import useGetChannels from "@components/_hooks/useGetChannels";
import { useQuery } from "@tanstack/react-query";
import { atom, useSetAtom } from "jotai";
import { atomWithReset } from "jotai/utils";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { GetUserResponse } from "src/lib/apis/_models/AuthDto";
import { GetUserGroupsResponse } from "src/lib/apis/_models/UserDto";
import { MypageApis } from "src/lib/apis/mypageApis";
import { ChannelsObj } from "./chat/_components/types";

export const userAtom = atomWithReset<GetUserResponse>({
  id: -1,
  username: "",
  email: "",
  profileImage: "",
  temp: 36.5,
  isTestTarget: false,
});
userAtom.debugLabel = "userAtom";

export const isFetchingAuthAtom = atom<boolean>(true);
isFetchingAuthAtom.debugLabel = "isFetchingAuthAtom";

export const enteredGroupsAtom = atom<number[]>([0]);
enteredGroupsAtom.debugLabel = "userEnteredGroupsAtom";

export const channelsAtom = atom<ChannelsObj | null>(null);
channelsAtom.debugLabel = "channelsAtom";

export default function GlobalProvider({ children }: PropsWithChildren) {
  const setEnteredGroups = useSetAtom(enteredGroupsAtom);
  const path = usePathname();
  useAuth();
  useGetChannels();

  useQuery(["getEnteredGroups"], {
    queryFn: async () => await MypageApis.getMyGropus(),
    onSuccess: ({ data }: { data: GetUserGroupsResponse[] }) => {
      setEnteredGroups(data.map((g) => g.id));
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const storePathValues = () => {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    const prevPath = storage.getItem("currentPath") || "";
    storage.setItem("prevPath", prevPath);
    storage.setItem("currentPath", globalThis.location.pathname);
  };

  useEffect(() => storePathValues, [path]);

  return <>{children}</>;
}
