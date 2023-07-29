import { userAtom } from "@app/GlobalProvider";
import { Button } from "@components/Button";
import UserAvatar from "@components/UserAvatar";
import { useAtomValue } from "jotai";
import React from "react";

const MyInfoSection = () => {
  const user = useAtomValue(userAtom);
  return (
    <div className="flex justify-between w-[900px]">
      <div className="flex items-center gap-3">
        <UserAvatar profileImage={user.profileImage} className="w-15 h-15" />
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
  );
};

export default MyInfoSection;
