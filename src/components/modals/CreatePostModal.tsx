import { enteredGroupsAtom } from "@app/GlobalProvider";
import AuthCheckButton from "@components/Button/AuthCheckButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import Prev from "public/assets/icons/left.svg";
import { FormEvent, useState } from "react";
import { Input } from "src/components/Input";
import Modal from "@components/modals";
import TextArea from "src/components/TextArea";
import { PostApis } from "src/lib/apis/postApis";
import Button from "@components/Button";
import { useGlobalModal } from "./GlobalModal";

interface GroupInfo {
  id: number;
  name: string;
}
const modalOpenAtom = atom<boolean>(false);
modalOpenAtom.debugLabel = "createPostModalAtom";

const modalGroupAtom = atom<GroupInfo>({
  id: 0,
  name: "",
});
modalGroupAtom.debugLabel = "createPostModalGroupAtom";

const CreatePostModal = () => {
  const queryClient = useQueryClient();
  const [openAtom, setOpenAtom] = useAtom(modalOpenAtom);
  const { id, name } = useAtomValue(modalGroupAtom);
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const createPost = useMutation({
    mutationFn: async (post: { title: string; content: string }) =>
      await PostApis.createPost({ ...post, groupId: id }),
    onSuccess: () => {
      setOpenAtom(false);
      setPost({
        title: "",
        content: "",
      });
      queryClient.invalidateQueries(["getGroupPosts"]);
      queryClient.invalidateQueries(["getMyPosts"]);
      queryClient.invalidateQueries(["getGroupInfo"]);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      if (post.title.trim() === "") throw new Error("제목을 입력해주세요!");
      if (post.content.trim() === "") throw new Error("내용을 입력해주세요!");

      createPost.mutate(post);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Modal
      open={openAtom}
      onOpenChange={(open) => {
        setOpenAtom(open);
        setPost({
          title: "",
          content: "",
        });
      }}
    >
      <Modal.Content
        onPointerDownOutside={(e) => {
          if (
            (post.title.trim() !== "" || post.content.trim() !== "") &&
            !confirm(
              "작성하신 내용은 저장되지 않습니다. 작성을 취소하시겠습니까?"
            )
          )
            e.preventDefault();
        }}
        className="w-[550px] h-[70%] flex flex-col py-10"
      >
        <Modal.Close className="absolute z-10 cursor-pointer">
          <Prev />
        </Modal.Close>
        <Modal.Title>
          <div className="text-center">{name} 친구 신청</div>
        </Modal.Title>
        <form onSubmit={onSubmit} className="flex flex-col mt-[60px] flex-1">
          <div className="flex flex-col mb-3 flex-1">
            <Input
              type="text"
              name="title"
              value={post.title}
              onChange={(e) =>
                setPost((p) => ({ ...post, title: e.target.value }))
              }
              placeholder="고민 제목을 입력해주세요."
              required
              className="border-b-2 border-grey-50 py-3 px-4 text-xl leading-8 font-medium rounded-t-xl rounded-b-none mb-[1px]"
            />
            <TextArea
              name="content"
              placeholder="고민 내용을 작성해주세요."
              value={post.content}
              required
              onChange={(e) =>
                setPost((p) => ({ ...post, content: e.target.value }))
              }
              className="h-full py-3 px-4 leading-8 rounded-t-none rounded-b-xl outline-1"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="btn-orange rounded-full h-[34px] !py-0"
            >
              기록하기
            </Button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
};
const CreatePostModalTrigger = ({
  className,
  group,
}: {
  className?: string;
  group: {
    id: number;
    name: string;
  };
}) => {
  const enteredGroups = useAtomValue(enteredGroupsAtom);
  const { setModalState } = useGlobalModal();
  const setOpenAtom = useSetAtom(modalOpenAtom);
  const setGroupAtom = useSetAtom(modalGroupAtom);
  return (
    <AuthCheckButton
      onClick={() => {
        if (!enteredGroups.includes(group.id))
          return setModalState({
            contents: "참여 중인 그룹만 신청 글쓰기가 가능해요!",
          });

        setGroupAtom(group);
        setOpenAtom(true);
      }}
      className={clsx("btn-orange", className)}
    >
      신청 글쓰기
    </AuthCheckButton>
  );
};
CreatePostModal.Trigger = CreatePostModalTrigger;
export default CreatePostModal;
