import CreatePostModal from "@components/modal/CreatePostModal";
import Link from "next/link";
import React from "react";

interface CardProps {
  id: number;
  name: string;
  memberCount: number;
  postCount: number;
}
const GroupCard = ({ id, name, memberCount, postCount }: CardProps) => {
  return (
    <>
      <CreatePostModal groupId={id.toString()} groupName={name} />
      <div className=" h-[293px] border flex flex-col rounded-xl overflow-hidden">
        <div className="flex-1 bg-grey-100"></div>
        <div className="flex-1 flex flex-col justify-between py-4 px-3">
          <span className="text-lg leading-6 font-medium">{name}</span>
          <div className="flex gap-2.5 mb-[25px]">
            <div className="text-xs bg-grey-100 leading-4 py-0.5 px-2.5 rounded-3xl">
              참여 {memberCount}
            </div>
            <div className="text-xs bg-grey-100 leading-4 py-0.5 px-2.5 rounded-3xl">
              신청글 {postCount}
            </div>
          </div>
          <div className="flex justify-between gap-1.5">
            <Link
              href={`/group?id=${id}`}
              className="text-center flex-1 text-sm"
            >
              입장
            </Link>
            <CreatePostModal.Trigger />
          </div>
        </div>
      </div>
    </>
  );
};
export default GroupCard;
