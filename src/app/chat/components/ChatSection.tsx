import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import ChatInput from "./ChatInput";
import useFirebaseMessage from "./hooks/useFirebaseMessage";
import { Message } from "../types";
import { useEffect, useRef } from "react";

interface MessageProps {
  message: Message;
  isMine: boolean;
}
const Message = ({ message, isMine }: MessageProps) => {
  return (
    <div
      className={clsx(
        isMine ? "self-end bg-gray-200" : "self-start border border-gray-200",
        "py-2 px-4 rounded-3xl first:mt-auto"
      )}
    >
      {message.photoURL && <img src={message.photoURL} className="" />}
      {message.text}
    </div>
  );
};
const ChatSection = () => {
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const channelID = searchParams?.get("channel") || "";

  const userId = "test";
  const { messages } = useFirebaseMessage(channelID);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={clsx(
        channelID === "" ? "hidden" : "visible",
        "flex-1 flex flex-col py-4"
      )}
    >
      <div className="flex flex-col flex-1 gap-2 overflow-y-scroll px-4">
        {messages.map((message) => (
          <Message
            key={message.id}
            {...{ message }}
            isMine={message.userId === userId}
          />
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <ChatInput {...{ userId, channelID }} />
    </div>
  );
};

export default ChatSection;
