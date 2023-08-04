import { userAtom } from "@app/GlobalProvider";
import PostCard from "@components/PostCard";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { GetGroupPostsResponse } from "src/lib/apis/_models/GroupsDto";
import { GroupsApis } from "src/lib/apis/groupsApis";
import CreatePostModal from "../../../components/modal/CreatePostModal";
import useObserver from "../hooks/useObserver";

const PostsSection = () => {
  const userId = useAtomValue(userAtom).id;
  const groupId = useSearchParams()?.get("id") || "";
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
    onSuccess: ({ data }) => {
      setPosts((p) => [...p, ...data.posts]);
    },
    onError: (e) => {
      console.error(e);
    },
    enabled: groupId !== "",
  });

  return (
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
  );
};

export default PostsSection;
