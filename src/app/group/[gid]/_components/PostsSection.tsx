"use client";
import { userAtom } from "@app/GlobalProvider";
import PostCard from "@components/PostCard";
import CreatePostModal from "@components/modal/CreatePostModal";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useMemo, useRef, useState } from "react";
import { GetGroupPostsResponse } from "src/lib/apis/_models/GroupsDto";
import { GroupsApis } from "src/lib/apis/groupsApis";
import useObserver from "./hooks/useObserver";
import { groupInfoAtom } from "./GroupProvider";

const PostsSection = () => {
  const { id, name } = useAtomValue(groupInfoAtom);
  const userId = useAtomValue(userAtom).id;

  const [posts, setPosts] = useState<GetGroupPostsResponse["posts"] | []>([]);
  const infiniteScrollTarget = useRef<HTMLDivElement | null>(null);

  const { fetchNextPage, isFetching } = useInfiniteQuery(
    ["getGroupPosts", { id }],
    {
      queryFn: async ({ pageParam = 0 }) =>
        await GroupsApis.getGroupPosts({
          groupId: id,
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
      enabled: id !== -1,
    }
  );

  useObserver({
    target: infiniteScrollTarget,
    onIsIntersectingHandler: fetchNextPage,
  });

  const isLoading = useMemo(() => isFetching || id === -1, [isFetching, id]);

  return (
    <div className="flex flex-col items-center w-full">
      {isLoading && (
        <div className="mt-[50px] flex flex-col gap-[25px]">
          {Array.from({ length: 5 }, (_, i) => i + 1).map((p) => (
            <PostCard.Skeleton key={p} />
          ))}
        </div>
      )}
      {!isLoading && (
        <>
          {posts.length === 0 && (
            <div className="flex flex-col items-center mt-[162px]">
              <span className="mb-4 text-2xl font-medium">
                신청 가능한 글이 없어요
              </span>
              <span className="mb-[45px]">신청글을 작성 해볼까요?</span>
              <CreatePostModal.Trigger group={{ id, name }} />
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
        </>
      )}
    </div>
  );
};

export default PostsSection;
