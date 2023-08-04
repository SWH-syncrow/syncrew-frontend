import clsx from "clsx";
import { atom, useAtom, useAtomValue } from "jotai";
import MyGroupTabView from "./MyGroupTabView";
import MyInfoSection from "./MyInfoSection";
import MyPostTabView from "./MyPostTabView";

const selectedTabAtom = atom<MYPATE_TAB>("MY_POST");
selectedTabAtom.debugLabel = "selectedTabAtom";
const PageContent = () => {
  const selectedTab = useAtomValue(selectedTabAtom);

  return (
    <>
      <div className="flex flex-col items-center py-[77px] gap-11">
        <MyInfoSection />
        <div className="w-[900px]">
          <MyTab />

          <div className="flex flex-col items-center w-full">
            <div
              className={clsx(selectedTab === "MY_POST" ? "visible" : "hidden")}
            >
              <MyPostTabView />
            </div>
            <div
              className={clsx(
                selectedTab === "REQUESTED_POST" ? "visible" : "hidden"
              )}
            >
              {/* <RequestedPostTabView /> */}
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
      </div>
    </>
  );
};

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
  const [selectedTab, setSelectedTab] = useAtom(selectedTabAtom);
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
          onClick={() => setSelectedTab(tab.key as MYPATE_TAB)}
        >
          {tab.value}
        </div>
      ))}
    </div>
  );
};
export default PageContent;
