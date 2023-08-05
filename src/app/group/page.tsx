"use client";

import { useAtomValue } from "jotai";
import GroupInfoSection from "./_components/GroupInfoSection";
import PostsSection from "./_components/PostsSection";
import { userAtom } from "@app/GlobalProvider";

const Page = () => {
  const isLoading = useAtomValue(userAtom).id === -1;

  if (isLoading) return;
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
