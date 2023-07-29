import { userAtom } from "@app/GlobalProvider";
import { Button } from "@components/Button";
import GroupCard from "@components/GroupCard";
import PostCard from "@components/PostCard";
import UserAvatar from "@components/UserAvatar";
import CreatePostModal from "@components/modal/CreatePostModal";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { useState } from "react";

type MYPATE_TAB = "MY_POST" | "REQUEST_POST" | "GROUP";
const TAB_TEXT = [
  {
    key: "MY_POST",
    value: "신청글 기록",
  },
  { key: "REQUEST_POST", value: "신청 완료 기록" },
  { key: "GROUP", value: "참여 그룹" },
];
const PageContent = () => {
  const user = useAtomValue(userAtom);
  const [selectedTab, setSelectedTab] = useState<MYPATE_TAB>("MY_POST");

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
    {
      id: 2,
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
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "스마트폰 초급 활용",
      memberCount: 5,
      postCount: 8,
    },
  ]);

  return (
    <>
      <div className="flex flex-col items-center py-[77px] gap-11">
        <div className="flex justify-between w-[900px]">
          <div className="flex items-center gap-3">
            <UserAvatar
              profileImage={user.profileImage}
              className="w-15 h-15"
            />
            <div className="flex flex-col font-medium">
              <span className="text-lg">
                {user.username}님, 현재 싱크루 온도는{" "}
                <span className="text-xl text-orange">{user.temp}˚C </span>
                예요!
              </span>
              <span className="text-grey-300">{user.email}</span>
            </div>
          </div>
          <Button className="btn-grey-border rounded-full text-sm h-9 !py-0">
            로그아웃
          </Button>
        </div>
        <div className="w-[900px]">
          <div className="flex w-full justify-between">
            {TAB_TEXT.map((tab) => (
              <div
                key={tab.key}
                className={clsx(
                  "py-8 border-b-4 flex-1 text-center text-lg duration-300 cursor-pointer",
                  selectedTab === tab.key
                    ? "border-orange"
                    : "border-grey-50 text-grey-300 hover:border-orange-100"
                )}
                onClick={() => setSelectedTab(tab.key as MYPATE_TAB)}
              >
                {tab.value}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center w-full">
            <div
              className={clsx(selectedTab === "MY_POST" ? "visible" : "hidden")}
            >
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
            </div>
            <div
              className={clsx(
                selectedTab === "REQUEST_POST" ? "visible" : "hidden"
              )}
            >
              {posts.length === 0 && (
                <div className="flex flex-col items-center mt-[162px]">
                  <span className="mb-4 text-2xl font-medium">
                    아직 친구 신청 기록이 없어요
                  </span>
                  <span className="mb-[45px]">
                    첫 싱크루 친구를 탐색 해볼까요?
                  </span>
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
            <div
              className={clsx(
                selectedTab === "GROUP" ? "visible w-full" : "hidden"
              )}
            >
              {posts.length === 0 && (
                <div className="flex flex-col items-center mt-[162px]">
                  <span className="mb-4 text-2xl font-medium">
                    아직 참여 중인 탐색이 없어요
                  </span>
                  <span className="mb-[45px]">
                    첫 싱크루 그룹을 탐색 해볼까요?
                  </span>
                  <Link href={"/"} className="btn-orange">
                    싱크루 탐색 이동
                  </Link>
                </div>
              )}
              <div className="grid grid-cols-3 gap-8 mt-[50px] ">
                {groups.map((group) => (
                  <GroupCard key={group.id} {...{ ...group }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageContent;
