import { userAtom } from "@app/GlobalProvider";
import ToolTip from "@components/Tooltip";
import LevelTestModal from "@components/modals/LevelTestModal";
import { useAtomValue } from "jotai";
import GroupsSection from "./GroupsSection";

const PageContent = () => {
  const isLoggedIn = useAtomValue(userAtom).id !== -1;

  return (
    <>
      <LevelTestModal />
      <div className="w-[1118px] px-[100px] pb-10">
        <div className="w-full h-[237px] bg-grey-100 rounded-xl mb-[53px] overflow-hidden">
          <img src={"/assets/mockCF.png"} alt="광고" className="w-full" />
        </div>
        <div className="flex justify-between">
          <div className="text-[23px] leading-[30px] font-medium">
            디지털 정보 교환을 위해
            <br /> 친구 신청 글쓰기를 시작해볼까요?
          </div>
          {/* @todo isTestTarget 조건 */}
          {isLoggedIn && (
            <div className="relative">
              <LevelTestModal.Trigger />
              <ToolTip.Caption className="bg-white absolute top-[100%] shadow-normal py-5 rounded-xl text-sm leading-5 text-center px-6 translate-x-[calc(50%-32px)] modal-arrow-sm whitespace-nowrap">
                테스트를 통해 서비스를
                <br /> 원활히 이용할 수 있어요
              </ToolTip.Caption>
            </div>
          )}
        </div>
        <GroupsSection />
      </div>
    </>
  );
};

export default PageContent;
