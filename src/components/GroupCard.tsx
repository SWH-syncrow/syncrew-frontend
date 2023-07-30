import CreatePostModal from "@components/modal/CreatePostModal";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AuthCheckButton from "./AuthCheckButton";

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
      <div className=" h-[293px] border border-grey-50 flex flex-col rounded-xl overflow-hidden">
        <div className="flex-1 flex items-center justify-center bg-grey-0">
          <Image
            src={`/assets/illusts/${name.replaceAll(" ", "_")}.svg`}
            alt="home"
            width={0}
            height={0}
            className="w-auto h-[110px]"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between py-4 px-3">
          <span className="text-lg leading-6 font-medium">{name}</span>
          <div className="flex gap-2.5 mb-[25px]">
            <div className="text-xs bg-grey-0 leading-4 py-0.5 px-2.5 rounded-3xl text-grey-800">
              참여 {memberCount}
            </div>
            <div className="text-xs bg-grey-0 leading-4 py-0.5 px-2.5 rounded-3xl text-grey-800">
              신청글 {postCount}
            </div>
          </div>
          <div className="flex justify-between gap-1.5">
            <AuthCheckButton
              onClick={() => {}}
              className="text-center text-sm btn-orange-border flex-1"
            >
              입장
            </AuthCheckButton>

            <CreatePostModal.Trigger className="flex-1" />
          </div>
        </div>
      </div>
    </>
  );
};
export default GroupCard;
