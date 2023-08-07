import { channelsAtom } from "@app/GlobalProvider";
import ComponentWithSkeleton from "@components/ComponentWithSkeleton";
import { useAtomValue } from "jotai";
import Logo_XL from "public/assets/logos/XL_01.svg";
import ChannelBox from "./ChannelBox";

const ChannelsSection = () => {
  const channels = useAtomValue(channelsAtom);

  return (
    <div className="w-[400px] flex flex-col border-r border-grey-50">
      <div className="pt-[107px] pb-[27px] pl-8 text-lg border-b-4 border-grey-50">
        전체 대화
      </div>
      <div className="flex flex-col overflow-auto">
        <ComponentWithSkeleton
          isSkeletonUI={!channels}
          Skeleton={<ChannelBox.Skeleton />}
        >
          {channels && (
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
                <ChannelBox
                  key={channelId}
                  {...{ channel: channels?.[channelId] }}
                />
              ))}
            </>
          )}
        </ComponentWithSkeleton>
      </div>
    </div>
  );
};

export default ChannelsSection;
