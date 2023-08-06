"use client";

import useAuth from "@components/_hooks/useAuth";
import useGetChannels from "@components/_hooks/useGetChannels";
import useStorePath from "@components/_hooks/useStorePath";
import { useQuery } from "@tanstack/react-query";
import { atom, useSetAtom } from "jotai";
import { DevTools } from "jotai-devtools";
import { atomWithReset } from "jotai/utils";
import { PropsWithChildren } from "react";
import { GetUserResponse } from "src/lib/apis/_models/AuthDto";
import { GetUserGroupsResponse } from "src/lib/apis/_models/UserDto";
import { MypageApis } from "src/lib/apis/mypageApis";
import { authInstance } from "src/lib/axios/instance";
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

export const isSettledAuthAtom = atom<boolean>(false);
isSettledAuthAtom.debugLabel = "isSettledAuthAtom";

export const enteredGroupsAtom = atom<number[]>([0]);
enteredGroupsAtom.debugLabel = "userEnteredGroupsAtom";

export const channelsAtom = atom<ChannelsObj | null>(null);
channelsAtom.debugLabel = "channelsAtom";

export default function GlobalProvider({ children }: PropsWithChildren) {
  useAuth();
  useGetChannels();
  useStorePath();

  const setEnteredGroups = useSetAtom(enteredGroupsAtom);

  useQuery(["getEnteredGroups"], {
    queryFn: async () => await MypageApis.getMyGropus(),
    onSuccess: ({ data }: { data: GetUserGroupsResponse[] }) => {
      setEnteredGroups(data.map((g) => g.id));
    },
    onError: (e) => {
      console.error(e);
    },
    enabled: !!authInstance.defaults.headers.common["Authorization"],
  });

  return (
    <>
      {process.env.NODE_ENV === "development" && <DevTools />}
      {children}
    </>
  );
}
