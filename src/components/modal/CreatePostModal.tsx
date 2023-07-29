import clsx from "clsx";
import { atom, useAtom, useSetAtom } from "jotai";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";
import Modal from "src/components/Modal";
import TextArea from "src/components/TextArea";
import Prev from "public/assets/icons/left.svg";

interface CreatePostModalProps {
  groupId: string;
  groupName: string;
}
const modalOpenAtom = atom<boolean>(false);
const CreatePostModal = ({ groupId, groupName }: CreatePostModalProps) => {
  const [openAtom, setOpenAtom] = useAtom(modalOpenAtom);
  return (
    <Modal open={openAtom} onOpenChange={setOpenAtom}>
      <Modal.Content className="w-[550px] h-[70%] flex flex-col py-10">
        <Modal.Close className="absolute z-10 cursor-pointer">
          <Prev />
        </Modal.Close>
        <Modal.Title>
          <div className="text-center">{groupName} 친구 신청</div>
        </Modal.Title>
        <div className="flex flex-col mt-[60px] mb-3 flex-1">
          <Input
            type="text"
            name="title"
            placeholder="고민 제목을 입력해주세요."
            className="border-b-2 border-grey-50 py-3 px-4 text-xl leading-8 font-medium rounded-t-xl rounded-b-none mb-[1px]"
          />
          <TextArea
            name="content"
            placeholder="고민 내용을 작성해주세요."
            className="h-full py-3 px-4 leading-8 rounded-t-none rounded-b-xl outline-1"
          />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              //post
              setOpenAtom(false);
            }}
            className="btn-orange rounded-full h-[34px] !py-0"
          >
            기록하기
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};
const CreatePostModalTrigger = ({ className }: { className?: string }) => {
  const setOpenAtom = useSetAtom(modalOpenAtom);
  return (
    <Button
      onClick={() => setOpenAtom(true)}
      className={clsx("btn-orange", className)}
    >
      신청 글쓰기
    </Button>
  );
};
CreatePostModal.Trigger = CreatePostModalTrigger;
export default CreatePostModal;
