"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LOGO from "public/assets/logo.svg";
const GNB = () => {
  const pathname = usePathname();
  return (
    pathname !== "/login" && (
      <div className="flex flex-col items-center gap-[51px] h-screen min-w-[248px] py-8 border-r border-gray-100">
        <Link href={"/"}>
          <LOGO />
        </Link>
        <div className="flex flex-col gap-3 px-8">
          <Link
            href={"/"}
            className="w-full flex items-center justify-center py-2 "
          >
            싱크루 탐색
          </Link>
          <Link
            href={"/chat"}
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
    )
  );
};

export default GNB;
