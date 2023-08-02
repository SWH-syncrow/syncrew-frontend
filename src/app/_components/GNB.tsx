"use client";
import clsx from "clsx";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Menu from "public/assets/icons/menu.svg";
import Search from "public/assets/icons/search_inactive.svg";
import Chat from "public/assets/icons/chat_inactive.svg";
import Mypage from "public/assets/icons/my_page_inactive-1.svg";
import LOGO from "public/assets/logos/XS_03.svg";
import AuthCheckButton from "@components/AuthCheckButton";
import { useAtomValue } from "jotai";
import { channelsAtom } from "@app/GlobalProvider";
import { useMemo } from "react";
import Ping from "@components/Ping";
const GNB = () => {
  const pathname = usePathname();
  const router = useRouter();
  const channelID = useSearchParams()?.get("channel") || "";
  const channels = useAtomValue(channelsAtom);

  const isChannelsNoti = useMemo(() => {
    return (
      Object.values(channels).filter(
        (ch) => (channelID !== ch.id && ch.isUnread) || ch.status === "READY"
      ).length > 0
    );
  }, [channels]);
  return (
    pathname !== "/login" && (
      <div className="flex flex-col justify-between items-center h-screen min-w-[248px] py-8 border-r border-grey-50 sticky top-0 left-0 bg-white z-10">
        <div className="flex flex-col gap-5 px-8 w-full">
          <Menu className="mb-3" />
          <Link
            href={"/"}
            className={clsx(
              "w-full flex items-center gap-1 justify-center py-1 rounded-full duration-300",
              pathname === "/" || pathname === "/group"
                ? "bg-orange-50 text-orange-400 [&_path]:fill-orange-400"
                : "text-grey-300"
            )}
          >
            <Search />
            싱크루 탐색
          </Link>
          <AuthCheckButton
            className={clsx(
              "w-full flex items-center gap-1 justify-center py-1 rounded-full duration-300",
              pathname === "/chat"
                ? "bg-orange-50 text-orange-400 [&_path]:fill-orange-400"
                : "text-grey-300"
            )}
            onClick={() => router.push("/chat")}
          >
            <Ping condition={isChannelsNoti} className="-right-6">
              <Chat />
              싱크루 채팅
            </Ping>
          </AuthCheckButton>
          <AuthCheckButton
            className={clsx(
              "w-full flex items-center gap-1 justify-center py-1 rounded-full duration-300",
              pathname === "/mypage"
                ? "bg-orange-50 text-orange-400 [&_path]:fill-orange-400"
                : "text-grey-300"
            )}
            onClick={() => router.push("/mypage")}
          >
            <Mypage />
            마이페이지
          </AuthCheckButton>
        </div>
        <Link href={"/"}>
          <LOGO />
        </Link>
      </div>
    )
  );
};

export default GNB;