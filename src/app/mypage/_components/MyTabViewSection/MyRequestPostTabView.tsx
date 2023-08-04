import PostCard from "@components/PostCard";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { GetUserRequestsResponse } from "src/lib/apis/_models/UserDto";
import { MypageApis } from "src/lib/apis/mypageApis";

const MyRequestPostTabView = () => {
  const [posts, setPosts] = useState<GetUserRequestsResponse["posts"]>([]);

  useQuery(["getMyRequestPosts"], {
    queryFn: async () => await MypageApis.getMyRequestPosts(),
    onSuccess: ({ data }) => {
      setPosts(data.content);
    },
    onError: (e) => {
      console.error(e);
    },
  });
  return (
    <div>
      {posts.length === 0 && (
        <div className="flex flex-col items-center mt-[162px]">
          <span className="mb-4 text-2xl font-medium">
            아직 친구 신청 기록이 없어요
          </span>
          <span className="mb-[45px]">첫 싱크루 친구를 탐색 해볼까요?</span>
          <Link href={"/"} className="btn-orange">
            싱크루 탐색 이동
          </Link>
        </div>
      )}
      {posts.length > 0 && (
        <div className="mt-[50px] flex flex-col gap-[25px]">
          {posts.map((post) => (
            <PostCard key={post.id} {...{ post }} type="REQUESTED" />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequestPostTabView;
