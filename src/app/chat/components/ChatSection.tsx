import { userAtom } from "@app/GlobalProvider";
import { Button } from "@components/Button";
import UserAvatar from "@components/UserAvatar";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Message } from "../types";
import ChatInput from "./ChatInput";
import useFirebaseMessage from "./hooks/useFirebaseMessage";

const ChatSection = () => {
  const { id: userId } = useAtomValue(userAtom);

  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const channelID = searchParams?.get("channel") || "";

  const { messages, chatUser } = useFirebaseMessage(channelID);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={clsx(
        channelID === "" ? "hidden" : "visible",
        "flex-1 flex flex-col pb-[50px] pt-[104px] w-full px-11"
      )}
    >
      <div className="flex justify-between bg-white pb-9">
        <div className="flex items-center gap-2">
          <UserAvatar
            profileImage={chatUser?.profileImage}
            className="w-10 h-10 mr-2"
          />
          <span className="text-lg font-medium">{chatUser?.username}</span>
          <span className="text-sm text-grey-300">{chatUser?.temp}</span>
        </div>
        <Button className="btn-grey-border rounded-full h-9 !py-0">
          거절하기
        </Button>
      </div>

      <div className="flex flex-col flex-1 gap-2 overflow-y-scroll">
        {messages.map((message) => (
          <Message
            key={message.id}
            {...{ message }}
            isMine={message.userId === userId.toString()}
          />
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <ChatInput {...{ userId: userId.toString(), channelID }} />
    </div>
  );
};

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
export default ChatSection;
