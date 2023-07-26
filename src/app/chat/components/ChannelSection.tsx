import { useRouter } from "next/navigation";
import useFirebaseChannel from "./hooks/useFirebaseChannel";

const ChannelSection = () => {
  const router = useRouter();
  const { channels } = useFirebaseChannel();

  return (
    <div className="w-[400px] border-x border-gray-300">
      <div className="pt-[107px] pb-[27px] pl-8 text-lg border-b-4">
        전체 대화
      </div>
      {channels.length === 0 && (
        <div className="flex w-full flex-col items-center">
          <span>아직 나의 매칭 친구가 없어요</span>
        </div>
      )}
      {channels.map((channel) => (
        <div
          key={channel.id}
          className="flex flex-col py-8 px-7"
          onClick={() => {
            router.push(`/chat?channel=${channel.id}`);
          }}
        >
          {channel.chatUser.userName}
          <span>
            {channel.status === "READY" &&
              `${channel.chatUser.userName}에게 첫 대화를 보내볼까요?`}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChannelSection;
