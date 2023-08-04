"use client";
import { channelsAtom } from "@app/GlobalProvider";
import AuthCheckButton from "@components/AuthCheckButton";
import Ping from "@components/Ping";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Chat from "public/assets/icons/chat_inactive.svg";
import MenuIcon from "public/assets/icons/menu.svg";
import Mypage from "public/assets/icons/my_page_inactive-1.svg";
import Search from "public/assets/icons/search_inactive.svg";
import LOGO from "public/assets/logos/XS_03.svg";
import { useMemo } from "react";
import { styled } from "styled-components";

const GNB = () => {
  const pathname = usePathname();
  const router = useRouter();
  const channelId = useSearchParams()?.get("channel") || "";
  const channels = useAtomValue(channelsAtom);

  const isChannelsNoti = useMemo(() => {
    return (
      Object.values(channels).filter(
        (ch) => (channelId !== ch.id && ch.isUnread) || ch.status === "READY"
      ).length > 0
    );
  }, [channels]);

  if (pathname === "/login") return;

  return (
    <div className="flex flex-col justify-between items-center h-screen min-w-[248px] py-8 border-r border-grey-50 sticky top-0 left-0 bg-white z-10">
      <div className="flex flex-col gap-5 px-8 w-full">
        <MenuIcon className="mb-3" />
        <StyledLink
          href={"/"}
          isvisit={["/", "/group"].includes(pathname).toString()}
        >
          <Search className="duration-300" />
          싱크루 탐색
        </StyledLink>
        <StyledAuthCheckButton
          isvisit={(pathname === "/chat").toString()}
          onClick={() => router.push("/chat")}
        >
          <Ping condition={isChannelsNoti} className="-right-6">
            <Chat />
            싱크루 채팅
          </Ping>
        </StyledAuthCheckButton>
        <StyledAuthCheckButton
          isvisit={(pathname === "/mypage").toString()}
          onClick={() => router.push("/mypage")}
        >
          <Mypage />
          마이페이지
        </StyledAuthCheckButton>
      </div>
      <Link href={"/"}>
        <LOGO />
      </Link>
    </div>
  );
};

export default GNB;
const StyledLink = styled(Link)<{ isvisit: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-radius: 9999px;
  transition-duration: 300ms;
  & path {
    transition-duration: 300ms;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.orange[50]};
    color: ${({ theme }) => theme.colors.orange[200]};
    & path {
      fill: ${({ theme }) => theme.colors.orange[200]};
    }
  }
  ${({ isvisit, theme }) =>
    isvisit === "true"
      ? `
    background-color: ${theme.colors.orange[50]};
    color: ${theme.colors.orange[400]} !important;
    & path {
      fill: ${theme.colors.orange[400]} !important; 
    }`
      : `color: ${theme.colors.grey[300]};`}
`;

const StyledAuthCheckButton = styled(AuthCheckButton)<{
  isvisit: string;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-radius: 9999px;
  transition-duration: 300ms;
  & path {
    transition-duration: 300ms;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.orange[50]};
    color: ${({ theme }) => theme.colors.orange[200]};
    & path {
      fill: ${({ theme }) => theme.colors.orange[200]};
    }
  }
  ${({ isvisit, theme }) =>
    isvisit === "true"
      ? `
  background-color: ${theme.colors.orange[50]};
  color: ${theme.colors.orange[400]} !important;
  & path {
    fill: ${theme.colors.orange[400]} !important; 
  }`
      : `color: ${theme.colors.grey[300]};`}
`;
