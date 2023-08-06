"use client";
import { userAtom } from "@app/GlobalProvider";
import ComponentWithSkeleton from "@components/ComponentWithSkeleton";
import PostCard from "@components/PostCard";
import CreatePostModal from "@components/modals/CreatePostModal";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useRef, useState } from "react";
import { GetGroupPostsResponse } from "src/lib/apis/_models/GroupsDto";
import { GroupsApis } from "src/lib/apis/groupsApis";
import { groupInfoAtom } from "./GroupProvider";
import useObserver from "./hooks/useObserver";

const PostsSection = () => {
  const { id: groupId, name } = useAtomValue(groupInfoAtom);
  const userId = useAtomValue(userAtom).id;

  const [posts, setPosts] = useState<GetGroupPostsResponse["posts"] | []>([]);
  const infiniteScrollTarget = useRef<HTMLDivElement | null>(null);

  const { fetchNextPage, isFetched } = useInfiniteQuery(
    ["getGroupPosts", { groupId }],
    {
      queryFn: async ({ pageParam = 0 }) =>
        await GroupsApis.getGroupPosts({
          groupId,
          pagination: { page: pageParam, size: 10 },
        }),
      getNextPageParam: (lastPage) => {
        if (lastPage.data.last) return undefined;
        return lastPage.data.number + 1;
      },
      onSuccess: (res) => {
        setPosts(() => res.pages.map((page) => page.data.content).flat());
      },
      onError: (e) => {
        console.error(e);
      },
      enabled: groupId !== -1,
    }
  );

  useObserver({
    target: infiniteScrollTarget,
    onIsIntersectingHandler: fetchNextPage,
  });

  return (
    <div className="flex flex-col items-center w-full gap-[25px] mt-[50px]">
      <ComponentWithSkeleton
        isSkeletonUI={!isFetched}
        Skeleton={<PostCard.Skeleton />}
      >
        <>
          {posts.length === 0 && (
            <div className="flex flex-col items-center mt-[162px]">
              <span className="mb-4 text-2xl font-medium">
                신청 가능한 글이 없어요
              </span>
              <span className="mb-[45px]">신청글을 작성 해볼까요?</span>
              <CreatePostModal.Trigger group={{ id: groupId, name }} />
            </div>
          )}
          {posts.length > 0 && (
            <>
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  {...{ post }}
                  type={post.writer?.id === userId ? "MINE" : "NORMAL"}
                />
              ))}
              <div ref={infiniteScrollTarget}></div>
            </>
          )}
        </>
      </ComponentWithSkeleton>
    </div>
  );
};

export default PostsSection;
