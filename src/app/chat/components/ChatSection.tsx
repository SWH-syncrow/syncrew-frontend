import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import ChatInput from "./ChatInput";
import useFirebaseMessage from "./hooks/useFirebaseMessage";
import { Message } from "../types";

interface MessageProps {
  message: Message;
  isMine: boolean;
}
const Message = ({ message, isMine }: MessageProps) => {
  return (
    <div
      className={clsx(
        isMine ? "self-end bg-gray-200" : "self-start border border-gray-200",
        "py-2 px-4 rounded-3xl"
      )}
    >
      {message.text}
    </div>
  );
};
const ChatSection = () => {
  const searchParams = useSearchParams();
  const channelID = searchParams?.get("channel") || "";

  const userId = "test";
  const { messages } = useFirebaseMessage(channelID);

  return (
    <div
      className={clsx(
        channelID === "" ? "hidden" : "visible",
        "flex-1 flex flex-col gap-8 p-4"
      )}
    >
      <div className="flex flex-col justify-end flex-1 gap-2">
        {messages.map((message) => (
          <Message
            key={message.id}
            {...{ message }}
            isMine={message.userId === userId}
          />
        ))}
      </div>
      <ChatInput {...{ userId, channelID }} />
    </div>
  );
};

export default ChatSection;
