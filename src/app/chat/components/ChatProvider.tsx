import { atom } from "jotai";
import { PropsWithChildren } from "react";
import { ChannelsObj } from "./types";

export const channelsAtom = atom<ChannelsObj>({});
const ChatProvider = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default ChatProvider;
