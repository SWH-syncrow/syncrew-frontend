"use client";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import MyGroupTabView from "./MyGroupTabView";
import MyPostTabView from "./MyPostTabView";
import MyRequestPostTabView from "./MyRequestPostTabView";

type MYPATE_TAB = "MY_POST" | "REQUESTED_POST" | "GROUP";

const MY_TABS = [
  {
    key: "MY_POST",
    value: "신청글 기록",
  },
  { key: "REQUESTED_POST", value: "신청 완료 기록" },
  { key: "GROUP", value: "참여 그룹" },
];
const MyTab = () => {
  const selectedTab = (useSearchParams().get("tab") || "MY_POST") as MYPATE_TAB;
  const router = useRouter();
  return (
    <div className="flex w-full justify-between">
      {MY_TABS.map((tab) => (
        <div
          key={tab.key}
          className={clsx(
            "py-8 border-b-4 flex-1 text-center text-lg duration-300 cursor-pointer",
            selectedTab === tab.key
              ? "border-orange"
              : "border-grey-50 text-grey-300 hover:border-orange-100"
          )}
          onClick={() => router.push(`/mypage?tab=${tab.key}`)}
        >
          {tab.value}
        </div>
      ))}
    </div>
  );
};

const MyTabViewSection = () => {
  const selectedTab = (useSearchParams().get("tab") || "MY_POST") as MYPATE_TAB;

  return (
    <div className="w-[900px]">
      <MyTab />
      <div className="flex flex-col items-center w-full">
        <div className={clsx(selectedTab === "MY_POST" ? "visible" : "hidden")}>
          <MyPostTabView />
        </div>
        <div
          className={clsx(
            selectedTab === "REQUESTED_POST" ? "visible" : "hidden"
          )}
        >
          <MyRequestPostTabView />
        </div>
        <div
          className={clsx(
            selectedTab === "GROUP" ? "visible w-full" : "hidden"
          )}
        >
          <MyGroupTabView />
        </div>
      </div>
    </div>
  );
};

export default MyTabViewSection;
