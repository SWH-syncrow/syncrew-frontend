import React, { useState } from "react";
import { Post } from "../app/group/types";
import { Button } from "src/components/Button";
import clsx from "clsx";
import Modal from "src/components/Modal";
import Vector from "public/assets/icons/Vector.svg";
import Request from "public/assets/icons/친구신청.svg";
import Requested from "public/assets/icons/친구_신청_완료.svg";
import Delete from "public/assets/icons/Delete.svg";
import Down from "public/assets/icons/down_sm.svg";

interface PostCardProps {
  post: Post;
  type?: "MINE" | "REQUESTED" | "NORMAL";
}
const PostCard = ({
  post: { id, username, temp, title, content },
  type = "NORMAL",
}: PostCardProps) => {
  const [isFullView, setIsFullView] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const ButtonByType = () => {
    switch (type) {
      case "MINE":
        return (
          <Button className="mr-9 !p-0">
            <Delete />
          </Button>
        );
      case "REQUESTED":
        return (
          <div className="btn-orange flex items-center gap-1 font-medium h-9 mr-9 cursor-default">
            <Requested />
            친구 신청 완료
          </div>
        );
      case "NORMAL":
        return (
          <Button
            onClick={() => setOpenModal(true)}
            className="btn-orange flex items-center gap-1 font-medium h-9 w-[126px] mr-9"
          >
            <Request />
            친구 신청
          </Button>
        );
    }
  };
  return (
    <>
      <Modal open={openModal} onOpenChange={setOpenModal}>
        <Modal.Content className="flex flex-col">
          친구 신청이 완료되었어요
          <Modal.Close>
            <Button>확인</Button>
          </Modal.Close>
        </Modal.Content>
      </Modal>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="text-lg font-semibold flex justify-center gap-2.5 items-center bg-orange-50 py-1 w-[170px] rounded-lg leading-7">
            {username}
            <Vector />
            <span className="text-sm font-normal text-orange-400">
              {temp}˚C
            </span>
          </div>
          <ButtonByType />
        </div>
        <div className="relative flex gap-12 justify-between w-[816px] py-9 px-10 shadow-normal rounded-2xl bg-white">
          <div className="flex flex-col gap-[15px] min-w-0">
            <div className="leading-7 text-grey-300">{title}</div>
            <p
              className={clsx(
                !isFullView &&
                  "text-ellipsis line-clamp-2 h-[48px] text-grey-500",
                "leading-6 break-words"
              )}
            >
              {content}
            </p>
          </div>
          <Button
            className="text-xs flex gap-1 items-center h-[33px] px-3 flex-shrink-0 translate-y-[calc(91px/2-50%)] btn-grey-border rounded-full"
            onClick={() => setIsFullView((p) => !p)}
          >
            글 더보기
            <Down
              className={clsx(
                "[&_path]:stoke-grey-400 duration-300",
                isFullView ? "rotate-180" : "rotate-0"
              )}
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default PostCard;
