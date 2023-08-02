import { Button } from "@components/Button";
import TextArea from "@components/TextArea";
import { useSearchParams } from "next/navigation";
import Delete from "public/assets/icons/Delete.svg";
import Photo from "public/assets/icons/image.svg";
import Send from "public/assets/icons/send.svg";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import useUploadMessage from "./hooks/chat/useUploadMessage";

const ChatForm = () => {
  const channelID = useSearchParams()?.get("channel") || "";
  const [newMessage, setNewMessage] = useState("");
  const [chatImgSrc, setChatImgSrc] = useState<ArrayBuffer | string>();
  const [chatImg, setChatImg] = useState<File>();

  const { uploadHandler } = useUploadMessage({
    channelID,
    message: newMessage,
    chatImg,
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [channelID]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setChatImg(file);
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = (e) => {
        setChatImgSrc(e.target?.result || "");
      };
      fileReader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    uploadHandler(e);
    setNewMessage("");
    setChatImgSrc("");
    setChatImg(undefined);
  };

  return (
    <div className="relative  px-11">
      {chatImgSrc && (
        <div className="absolute bottom-[100%]">
          <div className="relative max-w-[400px] max-h-[50vh] w-fit rounded-3xl overflow-hidden">
            <Button
              onClick={() => {
                setChatImg(undefined);
                setChatImgSrc("");
              }}
              className="absolute m-1 !p-2 duration-300 hover:bg-orange-50 rounded-full z-20"
            >
              <Delete />
            </Button>
            <img
              src={chatImgSrc + ""}
              alt="첨부 이미지"
              className="relative z-10 object-contain max-h-[50vh]"
            />
            <div className="absolute top-0 w-full h-full bg-grey-500 opacity-50"></div>
          </div>
        </div>
      )}
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-row items-center pt-8 gap-4 w-full"
      >
        <div className="relative flex-1 flex">
          <TextArea
            ref={textareaRef}
            value={newMessage}
            name="text"
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력해봐요."
            className="bg-grey-0 px-8 py-2 flex-1 h-[46px] !rounded-full !text-base !leading-7"
          />
          <label
            htmlFor="file"
            className="absolute right-4 top-[50%] -translate-y-[50%] cursor-pointer"
          >
            <Photo className="[&_path]:fill-grey-200" />
          </label>
          <input
            type="file"
            id="file"
            name="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <Button
          type="submit"
          disabled={!newMessage && !chatImgSrc}
          className="btn-orange w-[46px] h-[46px] rounded-full !p-0 flex items-center justify-center"
        >
          <Send />
        </Button>
      </form>
    </div>
  );
};
export default ChatForm;
