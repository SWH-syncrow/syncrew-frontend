import ComponentWithSkeleton from "@components/ComponentWithSkeleton";
import PostCard from "@components/PostCard";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { GetUserPostsResponse } from "src/lib/apis/_models/UserDto";
import { MypageApis } from "src/lib/apis/mypageApis";

const MyPostTabView = () => {
  const [posts, setPosts] = useState<GetUserPostsResponse["posts"]>([]);

  const { isFetched } = useQuery(["getMyPosts"], {
    queryFn: async () => await MypageApis.getMyPosts(),
    onSuccess: ({ data }) => {
      setPosts(data.content);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return (
    <div className={"mt-[50px] flex flex-col gap-[25px]"}>
      <ComponentWithSkeleton
        isSkeletonUI={!isFetched}
        Skeleton={<PostCard.Skeleton />}
      >
        <>
          {posts.length === 0 && (
            <div className="flex flex-col items-center mt-s[112px]">
              <span className="mb-4 text-2xl font-medium">
                아직 글이 작성되지 않았어요
              </span>
              <span className="mb-[45px]">첫 신청글을 작성하러 가볼까요?</span>
              <Link href={"/"} className="btn-orange">
                싱크루 탐색 이동
              </Link>
            </div>
          )}
          {posts.length > 0 &&
            posts.map((post) => (
              <PostCard key={post.id} {...{ post }} type="MINE" />
            ))}
        </>
      </ComponentWithSkeleton>
    </div>
  );
};

export default MyPostTabView;
