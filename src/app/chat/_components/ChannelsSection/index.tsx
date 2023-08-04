import { channelsAtom } from "@app/GlobalProvider";
import Ping from "@components/Ping";
import UserAvatar from "@components/UserAvatar";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Right from "public/assets/icons/right.svg";
import Logo_XL from "public/assets/logos/XL_01.svg";
import { Channel } from "../types";

const Channel = ({
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
const ChannelsSection = () => {
  const channels = useAtomValue(channelsAtom);

  return (
    <div className="w-[400px] flex flex-col border-r border-grey-50">
      <div className="pt-[107px] pb-[27px] pl-8 text-lg border-b-4 border-grey-50">
        전체 대화
      </div>
      {Object.keys(channels).length === 0 && (
        <div className="flex w-full flex-1 justify-center flex-col items-center gap-[50px] -translate-y-10">
          <Logo_XL />
          <span className="text-grey-300 text-lg">
            아직 나의 매칭 친구가 없어요
          </span>
        </div>
      )}
      {Object.keys(channels).map((channelId) => (
        <Channel key={channelId} {...{ channel: channels[channelId] }} />
      ))}
    </div>
  );
};

export default ChannelsSection;
