import PostCard from "@components/PostCard";
import CreatePostModal from "@components/modal/CreatePostModal";
import React, { useState } from "react";

const MyPostTabView = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "친구 구해요",
      content:
        "안녕하세요! SNS를 사용하는 김그루 입니다. SNS 활용에 있어 필요한 앱 서비스를 사용해보고 정보를 공유할 친구를 구합니다. ddsjhfakjsdhfkajsdhflkjasdhflkjhasdkljfhalksjdhfaskljfhaskljdskajdfhakjsdfhksajdhfkajhfaskjkajsdfhaksj",
      username: "김지현",
      profileImage: "",
      temp: 42.0,
    },
  ]);
  return (
    <>
      {/* <CreatePostModal /> */}
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
            <PostCard key={post.id} {...{ post }} type="MINE" />
          ))}
        </div>
      )}
    </>
  );
};

export default MyPostTabView;
