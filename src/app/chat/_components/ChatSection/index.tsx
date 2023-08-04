import { channelsAtom, userAtom } from "@app/GlobalProvider";
import UserAvatar from "@components/UserAvatar";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import MessageForm from "./MessageForm";
import RefuseButton from "./RefuseButton";
import useChat from "./hooks/useChat";
import Message from "./Message";

const ChatSection = () => {
  const router = useRouter();
  const channelId = useSearchParams()?.get("channel") || "";

  const channels = useAtomValue(channelsAtom);
  const userId = useAtomValue(userAtom).id;

  const { messages } = useChat(channelId);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      channelId !== "" &&
      Object.keys(channels).length !== 0 &&
      !channels[channelId]
    )
      router.replace("/404");
  }, [channelId, channels]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!channels[channelId]) return <></>;
  return (
    <div
      className={clsx(
        channelId === "" ? "hidden" : "visible",
        "flex-1 flex flex-col pb-[50px] pt-[104px] w-full max-h-screen"
      )}
    >
      <div className="flex justify-between bg-white pb-9  px-11">
        <div className="flex items-center gap-2">
          <UserAvatar
            profileImage={channels[channelId].chatUser?.profileImage}
            className="w-10 h-10 mr-2"
          />
          <span className="text-lg font-medium">
            {channels[channelId]?.chatUser?.username}
          </span>
          <span className="text-sm text-grey-300">
            {channels[channelId]?.chatUser?.temp}
          </span>
        </div>
        <RefuseButton
          {...{ friendRequestId: channels[channelId].friendRequestId }}
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
      <MessageForm />
    </div>
  );
};

export default ChatSection;
