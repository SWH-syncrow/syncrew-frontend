"use client";

import GroupInfoSection from "./_components/GroupInfoSection";
import PostsSection from "./_components/PostsSection";

const Page = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <GroupInfoSection />
        <PostsSection />
      </div>
    </div>
  );
};

export default Page;
