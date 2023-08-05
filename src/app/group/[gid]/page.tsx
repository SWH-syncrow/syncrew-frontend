"use client";
import GroupInfoSection from "./_components/GroupInfoSection";
import GroupProvider from "./_components/GroupProvider";
import PostsSection from "./_components/PostsSection";

export default function Page({ params: { gid } }: { params: { gid: string } }) {
  return (
    <div className="w-full">
      <div className="flex flex-col">
        <GroupProvider gid={gid}>
          <GroupInfoSection />
          <PostsSection />
        </GroupProvider>
      </div>
    </div>
  );
}
