import { Group } from "@app/_types";
import CreatePostModal from "@components/modal/CreatePostModal";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { GroupsApis } from "src/lib/apis/groupsApis";

const GroupInfoSection = () => {
  const groupId = useSearchParams()?.get("id") || "";
  const [groupInfo, setGroupInfo] = useState<Group>({
    id: parseInt(groupId),
    name: "",
    memberCount: 0,
    postCount: 0,
  });
  /**
   * @todo 참여된 사용자가 아닐 경우에 처리
   */
  useQuery(["getGroupInfo", { groupId }], {
    queryFn: async () => await GroupsApis.getGroupInfo(parseInt(groupId)),
    onSuccess: ({ data }) => {
      setGroupInfo(data);
    },
    onError: (e) => {
      console.error(e);
    },
    enabled: groupId !== "",
  });

  return (
    <>
      <CreatePostModal groupId={groupId} groupName={groupInfo.name} />
      <div className="border-b border-grey-50 flex justify-center mt-[77px]">
        <div className="w-[816px] flex flex-col gap-5 pb-14">
          <span className="text-xl font-medium">
            <span className="text-2xl font-semibold text-orange-400">
              {groupInfo.name}{" "}
            </span>
            에 입장했어요
          </span>
          <div className="flex justify-between items-center">
            <div className="flex gap-2.5 mb-[25px]">
              <div className="text-xs btn-grey-border leading-4 py-0.5 px-2.5 rounded-full">
                참여 {groupInfo.memberCount}
              </div>
              <div className="text-xs btn-grey-border leading-4 py-0.5 px-2.5 rounded-full">
                신청글 {groupInfo.postCount}
              </div>
            </div>
            {groupInfo.postCount > 0 && (
              <CreatePostModal.Trigger className="h-9 w-[126px] !py-0 " />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupInfoSection;
