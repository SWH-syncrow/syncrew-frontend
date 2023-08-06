import CreatePostModal from "@components/Modal/CreatePostModal";
import { useAtomValue } from "jotai";
import { groupInfoAtom } from "./GroupProvider";
import clsx from "clsx";

const GroupInfoSection = () => {
  const { id, name, postCount, memberCount } = useAtomValue(groupInfoAtom);

  return (
    <>
      <CreatePostModal />
      <div className="border-b border-grey-50 flex justify-center mt-[77px]">
        <div className="w-[816px] flex flex-col gap-5 pb-14">
          <span className="text-xl font-medium">
            <div
              className={clsx(
                "inline-block text-2xl font-semibold text-orange-400",
                id === -1 &&
                  "bg-grey-0 h-[29px] w-56 inline-block animate-pulse rounded-md"
              )}
            >
              {name}{" "}
            </div>
            에 입장했어요
          </span>
          <div className="flex justify-between items-center">
            <div className="flex gap-2.5 mb-[25px]">
              <div className="text-xs btn-grey-border leading-4 py-0.5 px-2.5 rounded-full">
                참여 {memberCount}
              </div>
              <div className="text-xs btn-grey-border leading-4 py-0.5 px-2.5 rounded-full">
                신청글 {postCount}
              </div>
            </div>
            {postCount > 0 && (
              <CreatePostModal.Trigger
                group={{ id, name }}
                className="h-9 w-[126px] !py-0 "
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupInfoSection;
