import { useRouter } from "next/navigation";
import useFirebaseChannel from "./hooks/useFirebaseChannel";

const ChannelSection = () => {
  const router = useRouter();
  const { channels } = useFirebaseChannel();

  return (
    <div className="w-[400px] border-x border-gray-300">
      {channels.map((channel) => (
        <div
          key={channel.id}
          className="flex flex-col"
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
