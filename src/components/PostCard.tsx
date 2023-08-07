import { userAtom } from "@app/GlobalProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import Delete from "public/assets/icons/Delete.svg";
import Vector from "public/assets/icons/Vector.svg";
import Down from "public/assets/icons/down_sm.svg";
import Requested from "public/assets/icons/친구_신청_완료.svg";
import Request from "public/assets/icons/친구신청.svg";
import { useEffect, useRef, useState } from "react";
import Button from "@components/Button";
import { GetGroupPostsResponse } from "src/lib/apis/_models/GroupsDto";
import { FriendApis } from "src/lib/apis/friendApis";
import { PostApis } from "src/lib/apis/postApis";
import { useGlobalModal } from "./modals/GlobalModal";
import { AxiosError } from "axios";

interface PostCardProps {
  post: GetGroupPostsResponse["posts"][0];
  type?: "MINE" | "REQUESTED" | "NORMAL";
}
const PostCard = ({
  post: { id, title, content, writer, rejectedUsers },
  type = "NORMAL",
}: PostCardProps) => {
  const [isFullView, setIsFullView] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const contentRef = useRef<HTMLParagraphElement | null>(null);
  useEffect(() => {
    setIsOverflow(
      (contentRef.current?.clientHeight as number) <
        (contentRef.current?.scrollHeight as number)
    );
  }, [contentRef.current]);

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
          <div
            className={clsx(
              "text-lg font-semibold flex justify-center gap-2.5 items-center py-1 w-[170px] rounded-lg leading-7",
              type === "MINE"
                ? "bg-grey-50 [&>span]:text-grey-300 [&>svg>path]:stroke-grey-100"
                : "bg-orange-50 [&>span]:text-orange-400"
            )}
          >
            {writer.username}
            <Vector />
            <span className="text-sm font-norma">{writer.temp}˚C</span>
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
                "leading-6 break-words min-h-[48px] text-lg"
              )}
              dangerouslySetInnerHTML={{
                __html: content.replace(/\n/g, "<br />"),
              }}
              ref={contentRef}
            />
          </div>

          <Button
            className={clsx(
              "text-xs flex gap-1 items-center h-[33px] px-3 flex-shrink-0 translate-y-[calc(91px/2-50%)] btn-grey-border rounded-full",
              isOverflow ? "visible" : "hidden"
            )}
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
      queryClient.invalidateQueries(["getMyPosts"]);
    },
    onError: (e: AxiosError) => {
      return setModalState({
        contents: (
          <>
            친구 매칭 중인 신청글은
            <br /> 삭제가 불가합니다
          </>
        ),
      });
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
      className="btn-grey mr-9 flex items-center justify-center h-9 w-[126px] gap-2 font-medium"
    >
      <Delete />글 삭제
    </Button>
  );
};
DeleteButton.displayName = "deleteButton";
PostCard.DeleteButton = DeleteButton;

const AcceptButton = ({
  id,
  rejectedUsers,
}: GetGroupPostsResponse["posts"][0]) => {
  const userId = useAtomValue(userAtom).id;
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
        requestFriend.mutate({ userId: 5, postId: id });
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

const PostCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="flex justify-between">
        <div
          className={
            "flex justify-center gap-2.5 items-center py-1 w-[170px] h-8 rounded-lg bg-grey-0"
          }
        >
          <div className="bg-grey-50 h-4 w-12 rounded-md"></div>
          <Vector className="[&>path]:stroke-grey-50" />
          <div className="bg-grey-50 h-4 w-12 rounded-md"></div>
        </div>
        <div className="btn-orange bg-grey-50 h-9 mr-9 w-[126px]"></div>
      </div>
      <div className="bg-grey-0 flex gap-12 justify-between w-[816px] py-9 px-10 shadow-normal rounded-2xl">
        <div className="flex flex-col gap-[15px] min-w-0">
          <div className="h-7 bg-grey-50 w-1/2"></div>
          <div className={"h-[48px] bg-grey-50 w-full"} />
        </div>
      </div>
    </div>
  );
};
PostCardSkeleton.displayName = "PostCardSkeleton";
PostCard.Skeleton = PostCardSkeleton;

export default PostCard;
