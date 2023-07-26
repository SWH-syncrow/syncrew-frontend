import React, { useState } from "react";
import { Post } from "../types";
import { Button } from "src/components/Button";
import clsx from "clsx";
import Modal from "src/components/Modal";

const PostCard = ({ id, username, temp, title, content }: Post) => {
  const [isFullView, setIsFullView] = useState(false);
  const [openModal, setOpenModal] = useState(false);
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
      <div>
        <div className="flex justify-between">
          <div className="text-lg font-semibold flex gap-1.5 items-center">
            {username}
            <span className="text-sm font-normal">{temp}˚C</span>
          </div>
          <button onClick={() => setOpenModal(true)}>친구 신청</button>
        </div>
        <div className="relative flex gap-12 justify-between w-[780px] py-9 px-10 shadow-md rounded-2xl">
          <div className="flex flex-col gap-[15px] min-w-0">
            <div className="leading-7">{title}</div>
            <p
              className={clsx(
                !isFullView && "text-ellipsis line-clamp-2 h-[48px]",
                "leading-6 break-words"
              )}
            >
              {content}
            </p>
          </div>
          <Button
            className="text-xs h-[33px] px-3 flex-shrink-0 translate-y-[calc(91px/2-50%)] "
            onClick={() => setIsFullView((p) => !p)}
          >
            글 더보기
          </Button>
        </div>
      </div>
    </>
  );
};

export default PostCard;
