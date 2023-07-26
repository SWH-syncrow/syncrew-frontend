import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CreatePostModal from "../../components/modal/CreatePostModal";
import PostCard from "./components/PostCard";

const PageContent = () => {
  const searchParams = useSearchParams();
  const groupId = searchParams?.get("id") || "";
  const [groupInfo, setGroupInfo] = useState({
    name: "스마트폰 활용 초급",
    memeberCount: 1,
    postCount: 1,
  });
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "친구 구해요",
      content:
        "안녕하세요! SNS를 사용하는 김그루 입니다. SNS 활용에 있어 필요한 앱 서비스를 사용해보고 정보를 공유할 친구를 구합니다. ddsjhfakjsdhfkajsdhflkjasdhflkjhasdkljfhalksjdhfaskljfhaskljdskajdfhakjsdfhksajdhfkajhfaskjkajsdfhaksj",
      username: "소미",
      profileImage: "",
      temp: 42.0,
    },
    {
      id: 2,
      title: "친구 구해요",
      content:
        "안녕하세요! SNS를 사용하는 김그루 입니다. SNS 활용에 있어 필요한 앱 서비스를 사용해보고 정보를 공유할 친구를 구합니다. ddsjhfakjsdhfkajsdhflkjasdhflkjhasdkljfhalksjdhfaskljfhaskljdskajdfhakjsdfhksajdhfkajhfaskjkajsdfhaksj",
      username: "소미",
      profileImage: "",
      temp: 42.0,
    },
  ]);

  useEffect(() => {
    //get
  }, [groupId]);

  return (
    <>
      <CreatePostModal groupId={groupId} groupName={groupInfo.name} />
      <div className="flex flex-col h-screen">
        <div className="border-b border-gray-100 flex justify-center mt-[77px]">
          <div className="w-[816px] flex flex-col gap-5">
            <span className="text-xl font-medium">
              <span className="text-2xl font-semibold">{groupInfo.name}</span>에
              입장했어요
            </span>
            <div className="flex justify-between items-center">
              <div className="flex gap-2.5 mb-[25px]">
                <div className="text-xs border border-gray-100 leading-4 py-0.5 px-2.5 rounded-3xl">
                  참여 {groupInfo.memeberCount}
                </div>
                <div className="text-xs border border-gray-100 leading-4 py-0.5 px-2.5 rounded-3xl">
                  신청글 {groupInfo.postCount}
                </div>
              </div>
              {posts.length > 0 && <CreatePostModal.Trigger />}
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
                <PostCard key={post.id} {...{ ...post }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PageContent;
