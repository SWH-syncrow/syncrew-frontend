import UserAvatar from "@components/UserAvatar";
import { useRouter } from "next/navigation";
import Right from "public/assets/icons/right.svg";
import Logo_XL from "public/assets/logos/XL_01.svg";
import { useGetChannels } from "./hooks/useFirebaseChannel";
import { Channel } from "./types";
import LoadingUI from "@components/LoadingUI";
import { useMemo } from "react";

const ChannelSection = () => {
  const { channels, isFetchChannelLoading } = useGetChannels();

  return (
    <div className="w-[400px] flex flex-col border-r border-grey-50">
      <div className="pt-[107px] pb-[27px] pl-8 text-lg border-b-4 border-grey-50">
        전체 대화
      </div>
      {isFetchChannelLoading ? (
        <div className="flex w-full flex-1 justify-center flex-col items-center gap-[50px] -translate-y-10">
          <div className="flex flex-col items-center gap-6">
            <LoadingUI className="w-10 h-10" />
            <span className="text-grey-200">loading ...</span>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

const Channel = ({
  channel: { id, chatUser, status },
}: {
  channel: Channel;
}) => {
  const router = useRouter();

  const guideMent = useMemo(() => {
    switch (status) {
      case "READY":
        return `${chatUser.username}님에게 첫 대화를 보내볼까요?`;
      case "DOING":
        return `${chatUser.username}님과 친구 매칭 중이에요`;
    }
  }, [status]);

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
        <span className="text-sm text-grey-200 font-normal">{guideMent}</span>
      </div>
      <Right />
    </div>
  );
};
export default ChannelSection;
