"use client";

import { useAtomValue } from "jotai";
import ChannelSection from "./_components/ChannelsSection";
import ChatSection from "./_components/ChatSection";
import { isSettledAuthAtom, userAtom } from "@app/GlobalProvider";
import { redirect } from "next/navigation";

const Page = () => {
  const isSettledAuth = useAtomValue(isSettledAuthAtom);
  const userId = useAtomValue(userAtom).id;

  if (isSettledAuth && userId === -1) return redirect("/login");
  return (
    <div className="w-full">
      <div className="flex flex-row h-screen">
        <ChannelSection />
        <ChatSection />
      </div>
    </div>
  );
};

export default Page;
