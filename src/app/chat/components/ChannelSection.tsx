import { useRouter } from "next/navigation";
import useFirebaseChannel from "./hooks/useFirebaseChannel";
import Right from "public/assets/icons/right.svg";
import Logo from "public/assets/logos/XS_01.svg";
import Logo_XL from "public/assets/logos/XL_01.svg";
import { Channel } from "../types";
import UserAvatar from "@components/UserAvatar";
import { useSetAtom } from "jotai";

const ChannelSection = () => {
  const { channels, isLoading } = useFirebaseChannel();

  return (
    <div className="w-[400px] flex flex-col border-r border-grey-50">
      <div className="pt-[107px] pb-[27px] pl-8 text-lg border-b-4 border-grey-50">
        전체 대화
      </div>
      {channels.length === 0 && (
        <div className="flex w-full flex-1 justify-center flex-col items-center gap-[50px] -translate-y-10">
          <Logo_XL />
          <span className="text-grey-300 text-lg">
            아직 나의 매칭 친구가 없어요
          </span>
        </div>
      )}
      {channels.map((channel) => (
        <Channel key={channel.id} {...{ channel }} />
      ))}
    </div>
  );
};

const Channel = ({
  channel: { id, chatUser, status },
}: {
  channel: Channel;
}) => {
  const router = useRouter();
  return (
    <div
      className="flex py-8 px-7 gap-6 justify-between items-center border-b border-grey-50 cursor-pointer"
      onClick={() => {
        router.push(`/chat?channel=${id}`);
      }}
    >
      <UserAvatar profileImage={chatUser.profileImage} />
      <div className="flex flex-col flex-1 text-lg font-medium leading-8">
        {chatUser.username}
        <span className="text-sm text-grey-200 font-normal">
          {status === "READY" &&
            `${chatUser.username}님에게 첫 대화를 보내볼까요?`}
          {status === "DOING" && `${chatUser.username}님과 친구 매칭 중이에요`}
        </span>
      </div>
      <Right />
    </div>
  );
};
export default ChannelSection;
