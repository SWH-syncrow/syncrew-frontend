import { atom, useAtom, useSetAtom } from "jotai";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";
import Modal from "src/components/Modal";
import TextArea from "src/components/TextArea";

interface CreatePostModalProps {
  groupId: string;
  groupName: string;
}
const modalOpenAtom = atom<boolean>(false);
const CreatePostModal = ({ groupId, groupName }: CreatePostModalProps) => {
  const [openAtom, setOpenAtom] = useAtom(modalOpenAtom);
  return (
    <Modal open={openAtom} onOpenChange={setOpenAtom}>
      <Modal.Content className="w-[550px] h-[70%] flex flex-col">
        <Modal.Close className="absolute">{`<`}</Modal.Close>
        <Modal.Title>{groupName} 친구 신청</Modal.Title>
        <div className="flex flex-col my-[60px] flex-1">
          <Input
            type="text"
            name="title"
            placeholder="고민 제목을 입력해주세요."
            className="border-b-2 border-grey-100 pb-4 mb-4 text-xl"
          />
          <TextArea
            name="content"
            placeholder="고민 내용을 작성해주세요."
            className="h-full"
          />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              //post
              setOpenAtom(false);
            }}
          >
            기록하기
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};
const CreatePostModalTrigger = () => {
  const setOpenAtom = useSetAtom(modalOpenAtom);
  return <Button onClick={() => setOpenAtom(true)}>신청 글쓰기</Button>;
};
CreatePostModal.Trigger = CreatePostModalTrigger;
export default CreatePostModal;
