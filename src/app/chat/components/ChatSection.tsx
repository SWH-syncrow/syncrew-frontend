import { channelsAtom, userAtom } from "@app/GlobalProvider";
import UserAvatar from "@components/UserAvatar";
import { useGlobalModal } from "@components/modal/GlobalModal";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import RefuseButton from "./RefuseButton";
import useFirebaseChat from "./hooks/chat/useFirebaseChat";
import { Message } from "./types";
import ChatForm from "./ChatForm";

interface MessageProps {
  message: Message;
  isMine: boolean;
}
const Message = ({ message, isMine }: MessageProps) => {
  return (
    <div
      className={clsx(
        isMine ? "self-end bg-orange text-white" : "self-start bg-grey-0",
        "py-2 px-4 rounded-3xl first:mt-auto leading-8 max-w-[80%]"
      )}
    >
      {message.photoURL && <img src={message.photoURL} className="" />}
      {message.text}
    </div>
  );
};

const ChatSection = () => {
  const router = useRouter();
  const channelID = useSearchParams()?.get("channel") || "";
  const isEnteredChannel = channelID !== "";
  const channels = useAtomValue(channelsAtom);
  const { id, chatUser, friendRequestId } = channels[channelID];
  const { id: userId } = useAtomValue(userAtom);

  const { messages } = useFirebaseChat(channelID);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      isEnteredChannel &&
      Object.keys(channels).length !== 0 &&
      !Object.keys(channels).includes(channelID)
    )
      router.replace("/404");
  }, [channelID, channels]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={clsx(
        channelID === "" ? "hidden" : "visible",
        "flex-1 flex flex-col pb-[50px] pt-[104px] w-full"
      )}
    >
      <div className="flex justify-between bg-white pb-9  px-11">
        <div className="flex items-center gap-2">
          <UserAvatar
            profileImage={chatUser?.profileImage}
            className="w-10 h-10 mr-2"
          />
          <span className="text-lg font-medium">{chatUser?.username}</span>
          <span className="text-sm text-grey-300">{chatUser?.temp}</span>
        </div>
        <RefuseButton {...{ friendRequestId }} />
      </div>

      <div className="flex flex-col flex-1 gap-2 px-11 overflow-auto">
        {messages.map((message) => (
          <Message
            key={message.id}
            {...{ message }}
            isMine={message.userId === userId.toString()}
          />
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <ChatForm />
    </div>
  );
};

export default ChatSection;
