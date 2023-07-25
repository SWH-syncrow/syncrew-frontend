import Link from "next/link";
import React from "react";
import LOGO from "public/assets/logo.svg";
const GNB = () => {
  return (
    <div className="flex flex-col items-center gap-[51px] h-screen min-w-[248px] py-8 border-r border-gray-100">
      <Link href={"/search"}>
        <LOGO />
      </Link>
      <div className="flex flex-col gap-3 px-8">
        <Link
          href={"/search"}
          className="w-full flex items-center justify-center py-2 "
        >
          싱크루 탐색
        </Link>
        <Link
          href={"/search/chat"}
          className="w-full flex items-center justify-center py-2 "
        >
          싱크루 채팅
        </Link>

        <Link
          href={"/"}
          className="w-full flex items-center justify-center py-2 "
        >
          마이페이지
        </Link>
      </div>
    </div>
  );
};

export default GNB;
