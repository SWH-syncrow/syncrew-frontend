import { userAtom } from "@app/GlobalProvider";
import { Group } from "@app/types";
import PostCard from "@components/PostCard";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { GroupsApis } from "src/lib/apis/groupsApis";
import CreatePostModal from "../../../components/modal/CreatePostModal";
import useObserver from "../hooks/useObserver";
import { GetGroupPostsResponse } from "src/lib/apis/models/GroupsDto";

const PageContent = () => {
  const { id: userId } = useAtomValue(userAtom);
  const groupId = useSearchParams()?.get("id") || "";
  const [groupInfo, setGroupInfo] = useState<Group>({
    id: parseInt(groupId),
    name: "",
    memberCount: 0,
    postCount: 0,
  });
  const [posts, setPosts] = useState<GetGroupPostsResponse["posts"] | []>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const infiniteScrollTarget = useRef<HTMLDivElement | null>(null);

  useObserver({
    target: infiniteScrollTarget,
    onIsIntersectingHandler: () =>
      !isLoading && setPagination((p) => ({ ...p, page: p.page + 1 })),
  });

  const { isLoading } = useQuery(["getGroupPosts", { groupId, pagination }], {
    queryFn: async () =>
      await GroupsApis.getGroupPosts({
        groupId: parseInt(groupId),
        pagination,
      }),
    onSuccess: ({ data: { id, name, memberCount, postCount, posts } }) => {
      setGroupInfo({ id, name, memberCount, postCount });
      setPosts((p) => [...p, ...posts]);
    },
    onError: (e) => {
      console.error(e);
    },
    enabled: groupId !== "",
  });

  return (
    <>
      <CreatePostModal groupId={groupId} groupName={groupInfo.name} />
      <div className="flex flex-col">
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
              {posts.length > 0 && (
                <CreatePostModal.Trigger className="h-9 w-[126px] !py-0 " />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-full">
          {posts.length === 0 && (
            <div className="flex flex-col items-center mt-[162px]">
              <span className="mb-4 text-2xl font-medium">
                아직 글이 작성되지 않았어요
              </span>
              <span className="mb-[45px]">첫 신청글을 작성 해볼까요?</span>
              <CreatePostModal.Trigger />
            </div>
          )}
          {posts.length > 0 && (
            <div className="mt-[50px] flex flex-col gap-[25px]">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  {...{ post }}
                  type={post.writer?.id === userId ? "MINE" : "NORMAL"}
                />
              ))}
              <div ref={infiniteScrollTarget}></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PageContent;
