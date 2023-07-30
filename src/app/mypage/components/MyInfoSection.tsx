import { userAtom } from "@app/GlobalProvider";
import { Button } from "@components/Button";
import ToolTip from "@components/Tooltip";
import UserAvatar from "@components/UserAvatar";
import { useAtomValue } from "jotai";
import React from "react";
import Question from "public/assets/icons/question.svg";

const MyInfoSection = () => {
  const user = useAtomValue(userAtom);
  return (
    <div className="flex justify-between w-[900px]">
      <div className="flex items-center gap-3">
        <UserAvatar profileImage={user.profileImage} className="w-15 h-15" />
        <div className="flex flex-col font-medium">
          <div className="flex items-center gap-4">
            <span className="text-lg">
              {user.username}님, 현재 싱크루 온도는{" "}
              <span className="text-xl text-orange">{user.temp}˚C </span>
              예요!
            </span>
            <ToolTip
              tooltipContentElement={
                <ToolTip.Caption className="relative placeholder:bg-white shadow-normal py-5 rounded-xl text-sm leading-5 text-center px-6 translate-y-[calc(50%+32px)] translate-x-[calc(50%-32px)] modal-arrow-sm">
                  싱크루 한달 활동 기록으로
                  <br /> 온도가 측정되고 있어요
                </ToolTip.Caption>
              }
            >
              <Question className="" />
            </ToolTip>
          </div>
          <span className="text-grey-300">{user.email}</span>
        </div>
      </div>
      <Button className="btn-grey-border rounded-full text-sm h-9 !py-0">
        로그아웃
      </Button>
    </div>
  );
};

export default MyInfoSection;
