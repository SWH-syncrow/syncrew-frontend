import { userAtom } from "@app/GlobalProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import Delete from "public/assets/icons/Delete.svg";
import Vector from "public/assets/icons/Vector.svg";
import Down from "public/assets/icons/down_sm.svg";
import Requested from "public/assets/icons/친구_신청_완료.svg";
import Request from "public/assets/icons/친구신청.svg";
import { useState } from "react";
import { Button } from "src/components/Button";
import { FriendApis } from "src/lib/apis/friendApis";
import { GetGroupPostsResponse } from "src/lib/apis/models/GroupsDto";
import { PostApis } from "src/lib/apis/postApis";
import { useGlobalModal } from "./modal/GlobalModal";

interface PostCardProps {
  post: GetGroupPostsResponse["posts"][0];
  type?: "MINE" | "REQUESTED" | "NORMAL";
}
const PostCard = ({
  post: { id, title, content, writer, rejectedUsers },
  type = "NORMAL",
}: PostCardProps) => {
  const [isFullView, setIsFullView] = useState(false);

  const ButtonByType = () => {
    switch (type) {
      case "MINE":
        return <PostCard.DeleteButton postId={id} />;
      case "REQUESTED":
        return (
          <div className="btn-orange flex items-center gap-1 font-medium h-9 mr-9 cursor-default">
            <Requested />
            친구 신청 완료
          </div>
        );
      case "NORMAL":
        return (
          <PostCard.AcceptButton
            {...{ id, title, content, writer, rejectedUsers }}
          />
        );
    }
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="text-lg font-semibold flex justify-center gap-2.5 items-center bg-orange-50 py-1 w-[170px] rounded-lg leading-7">
            {writer.username}
            <Vector />
            <span className="text-sm font-normal text-orange-400">
              {writer.temp}˚C
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
                "leading-6 break-words min-h-[48px]"
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

const DeleteButton = ({ postId }: { postId: number }) => {
  const { setModalState, resetState } = useGlobalModal();
  const queryClient = useQueryClient();
  const deletePost = useMutation({
    mutationFn: async (postId: number) => await PostApis.deletePost(postId),
    onSuccess: () => {
      resetState();
      queryClient.invalidateQueries(["getGroupPosts"]);
    },
    onError: (e) => {
      console.error(e);
    },
  });
  return (
    <Button
      onClick={() => {
        setModalState({
          contents: "신청글을 삭제하시겠습니까?",
          closeButton: "취소",
          button: (
            <Button
              className="btn-orange rounded-none rounded-br-xl"
              onClick={() => deletePost.mutate(postId)}
            >
              확인
            </Button>
          ),
        });
      }}
      className="mr-9 !p-0"
    >
      <Delete />
    </Button>
  );
};
DeleteButton.displayName = "deleteButton";
PostCard.DeleteButton = DeleteButton;

const AcceptButton = ({
  id,
  rejectedUsers,
}: GetGroupPostsResponse["posts"][0]) => {
  const { id: userId } = useAtomValue(userAtom);
  const { setModalState } = useGlobalModal();
  const queryClient = useQueryClient();

  const requestFriend = useMutation({
    mutationFn: async ({
      userId,
      postId,
    }: {
      userId: number;
      postId: number;
    }) => await FriendApis.requestFriend({ userId, postId }),
    onSuccess: () => {
      setModalState({ contents: "친구 신청이 완료되었어요" });
      queryClient.invalidateQueries(["getGroupPosts"]);
    },
    onError: (e) => {
      alert("친구 신청이 실패했어요");
      console.error(e);
    },
  });
  return (
    <Button
      onClick={() => {
        if (rejectedUsers?.includes(userId))
          return setModalState({
            contents: "아쉽지만 거절된 친구 신청글이에요.",
          });
        requestFriend.mutate({ userId, postId: id });
      }}
      className="btn-orange flex items-center gap-1 font-medium h-9 w-[126px] mr-9"
    >
      <Request />
      친구 신청
    </Button>
  );
};
AcceptButton.displayName = "acceptButton";
PostCard.AcceptButton = AcceptButton;

export default PostCard;
