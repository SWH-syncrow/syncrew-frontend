import PostCard from "@components/PostCard";
import Link from "next/link";
import React, { useState } from "react";

const RequestedPostTabView = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "친구 구해요",
      content:
        "안녕하세요! SNS를 사용하는 김그루 입니다. SNS 활용에 있어 필요한 앱 서비스를 사용해보고 정보를 공유할 친구를 구합니다. ddsjhfakjsdhfkajsdhflkjasdhflkjhasdkljfhalksjdhfaskljfhaskljdskajdfhakjsdfhksajdhfkajhfaskjkajsdfhaksj",
      username: "김지현",
      profileImage: "",
      temp: 42.0,
      rejectedUsers: [],
    },
  ]);
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
      {/* {posts.length > 0 && (
        <div className="mt-[50px] flex flex-col gap-[25px]">
          {posts.map((post) => (
            <PostCard key={post.id} {...{ post }} type="REQUESTED" />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default RequestedPostTabView;
