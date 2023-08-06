import { enteredGroupsAtom } from "@app/GlobalProvider";
import { Group } from "@app/_types";
import CreatePostModal from "@components/Modal/CreatePostModal";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GroupsApis } from "src/lib/apis/groupsApis";
import AuthCheckButton from "./Button/AuthCheckButton";

const GroupCard = ({ id, name, memberCount, postCount }: Group) => {
  const router = useRouter();
  const enteredGroups = useAtomValue(enteredGroupsAtom);

  const enterGroup = useMutation({
    mutationFn: async (groupdId: number) =>
      await GroupsApis.enterGroup(groupdId),
    onSuccess: () => {
      router.push(`/group/${id}`);
    },
    onError: (e: AxiosError) => {
      console.error(e);
    },
    retry: false,
  });

  return (
    <>
      <CreatePostModal />
      <div className=" h-[293px] border border-grey-50 flex flex-col rounded-xl overflow-hidden">
        <div className="flex-1 flex items-center justify-center bg-grey-0">
          <Image
            src={`/assets/illusts/group_${id}.svg`}
            alt="home"
            width={0}
            height={0}
            className="w-auto h-[110px]"
            loading="eager"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between py-4 px-3">
          <span className="text-lg leading-6 font-medium">{name}</span>
          <div className="flex gap-2.5 mb-[25px]">
            <div className="text-xs bg-grey-0 leading-4 py-0.5 px-2.5 rounded-3xl text-grey-800">
              참여 {memberCount}
            </div>
            <div className="text-xs bg-grey-0 leading-4 py-0.5 px-2.5 rounded-3xl text-grey-800">
              신청글 {postCount}
            </div>
          </div>
          <div className="flex justify-between gap-1.5">
            <AuthCheckButton
              onClick={() => {
                enteredGroups.includes(id)
                  ? router.push(`/group/${id}`)
                  : enterGroup.mutate(id);
              }}
              className="text-center text-sm btn-orange-border flex-1"
            >
              입장
            </AuthCheckButton>

            <CreatePostModal.Trigger className="flex-1" group={{ id, name }} />
          </div>
        </div>
      </div>
    </>
  );
};

const GroupCardSkeleton = () => {
  return (
    <div className="border border-grey-50 h-[293px] animate-pulse rounded-xl overflow-hidden">
      <div className="h-[50%] flex items-center justify-center bg-grey-0"></div>
      <div className="h-[50%] flex flex-col justify-between py-4 px-3 ">
        <div className="bg-grey-50 h-6 rounded-md"></div>
        <div className="flex gap-2.5 mb-[25px]">
          <div className="text-xs h-4 py-0.5 px-2.5 rounded-3xl bg-grey-50"></div>
          <div className="text-xs h-4 py-0.5 px-2.5 rounded-3xl bg-grey-50"></div>
        </div>
        <div className="flex justify-between gap-1.5">
          <div className="text-center text-sm bg-grey-50 flex-1 h-9 rounded-xl"></div>
          <div className="text-center text-sm bg-grey-50 flex-1 h-9 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};
GroupCard.Skeleton = GroupCardSkeleton;
export default GroupCard;
