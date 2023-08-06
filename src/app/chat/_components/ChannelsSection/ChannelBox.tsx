import React from "react";
import { Channel } from "../types";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import UserAvatar from "@components/UserAvatar";
import Ping from "@components/Ping";
import Right from "public/assets/icons/right.svg";

const ChannelBox = ({
  channel: { id, chatUser, status, isUnread },
}: {
  channel: Channel;
}) => {
  const channelId = useSearchParams()?.get("channel") || "";
  return (
    <Link
      className="flex py-8 px-7 gap-6 justify-between items-center border-b border-grey-50 cursor-pointer bg-white hover:brightness-95 duration-300 active:brightness-90"
      href={`/chat?channel=${id}`}
    >
      <UserAvatar profileImage={chatUser.profileImage} />
      <div className="flex flex-col flex-1 text-lg font-medium leading-8">
        <Ping className="right-0" condition={isUnread && channelId !== id}>
          {chatUser.username}
        </Ping>
        <span className="text-sm text-grey-200 font-normal">
          {
            {
              READY: `${chatUser.username}님에게 첫 대화를 보내볼까요?`,
              DOING: `${chatUser.username}님과 친구 매칭 중이에요`,
            }[status]
          }
        </span>
      </div>
      <Right />
    </Link>
  );
};

const ChannelBoxSkelton = () => {
  return (
    <div className="animate-pulse flex py-8 px-7 gap-6 justify-between items-center border-b border-grey-100 cursor-pointer bg-grey-0 hover:brightness-95 duration-300 active:brightness-90">
      <div
        className={
          "w-[54px] h-[54px] flex items-center justify-center bg-grey-50 border border-grey-100 rounded-full overflow-hidden"
        }
      />
      <div className="flex flex-col flex-1 gap-1">
        <div className="h-5 bg-grey-50 rounded-md" />
        <div className="h-5 bg-grey-50 rounded-md" />
      </div>
      <Right className="[&_path]:stroke-grey-100" />
    </div>
  );
};
ChannelBox.Skeleton = ChannelBoxSkelton;
export default ChannelBox;
