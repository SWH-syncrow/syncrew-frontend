import { channelsAtom, userAtom } from "@app/GlobalProvider";
import UserAvatar from "@components/UserAvatar";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import ChatForm from "./ChatForm";
import RefuseButton from "./RefuseButton";
import useFirebaseChat from "./hooks/chat/useFirebaseChat";
import { Message } from "./types";

interface MessageProps {
  message: Message;
  isMine: boolean;
}
const Message = ({ message, isMine }: MessageProps) => {
  return (
    <div
      className={clsx(
        isMine ? "self-end" : "self-start items-start",
        "flex flex-col max-w-[80%]"
      )}
    >
      {message.photoURL && (
        <div className="relative max-w-[400px] w-fit rounded-3xl overflow-hidden">
          <img
            src={message.photoURL}
            alt="첨부 이미지"
            className="relative object-contain max-h-[50vh] !z-0"
          />
          <div className="absolute top-0 w-full h-full bg-grey-50 !-z-10"></div>
        </div>
      )}
      {message.text && (
        <div
          className={clsx(
            isMine
              ? "self-end bg-orange text-white text-right"
              : "self-start bg-grey-0",
            "py-2 px-4 rounded-3xl first:mt-auto leading-8 "
          )}
        >
          {message.text.split("\n").map((line) => (
            <>
              {line}
              <br />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

const ChatSection = () => {
  const router = useRouter();
  const channelID = useSearchParams()?.get("channel") || "";
  const isEnteredChannel = channelID !== "";

  const channels = useAtomValue(channelsAtom);
  const { id: userId } = useAtomValue(userAtom);

  const { messages } = useFirebaseChat(channelID);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      isEnteredChannel &&
      Object.keys(channels).length !== 0 &&
      !channels[channelID]
    )
      router.replace("/404");
  }, [channelID, channels]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!channels[channelID]) return <></>;
  return (
    <div
      className={clsx(
        channelID === "" ? "hidden" : "visible",
        "flex-1 flex flex-col pb-[50px] pt-[104px] w-full max-h-screen"
      )}
    >
      <div className="flex justify-between bg-white pb-9  px-11">
        <div className="flex items-center gap-2">
          <UserAvatar
            profileImage={channels[channelID].chatUser?.profileImage}
            className="w-10 h-10 mr-2"
          />
          <span className="text-lg font-medium">
            {channels[channelID]?.chatUser?.username}
          </span>
          <span className="text-sm text-grey-300">
            {channels[channelID]?.chatUser?.temp}
          </span>
        </div>
        <RefuseButton
          {...{ friendRequestId: channels[channelID].friendRequestId }}
        />
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
