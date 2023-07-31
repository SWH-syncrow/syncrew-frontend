"use client";

import PageContent from "./PageContent";
import ChatProvider from "./components/ChatProvider";

const Page = () => {
  return (
    <ChatProvider>
      <div className="w-full">
        <PageContent />
      </div>
    </ChatProvider>
  );
};

export default Page;
