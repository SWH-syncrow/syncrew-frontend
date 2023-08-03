"use client";

import ChannelSection from "./components/ChannelSection";
import ChatSection from "./components/ChatSection";

const Page = () => {
  return (
    <div className="w-full">
      <div className="flex flex-row min-h-screen">
        <ChannelSection />
        <ChatSection />
      </div>
    </div>
  );
};

export default Page;
