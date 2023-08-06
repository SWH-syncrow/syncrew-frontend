import Button from "@components/button";
import TextArea from "@components/TextArea";
import { useSearchParams } from "next/navigation";
import Delete from "public/assets/icons/Delete.svg";
import Photo from "public/assets/icons/image.svg";
import Send from "public/assets/icons/send.svg";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import useUploadMessage from "./hooks/useUploadMessage";

const MessageForm = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const channelId = useSearchParams()?.get("channel") || "";
  const [newMessage, setNewMessage] = useState("");
  const [messageImgSrc, setMessageImgSrc] = useState<ArrayBuffer | string>();
  const [messageImg, setMessageImg] = useState<File>();

  const { uploadHandler } = useUploadMessage({
    channelId,
    message: newMessage,
    messageImg,
  });

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    uploadHandler(e);
    setNewMessage("");
    setMessageImgSrc("");
    setMessageImg(undefined);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setMessageImg(file);
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = (e) => {
        setMessageImgSrc(e.target?.result || "");
      };
      fileReader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [channelId]);

  return (
    <div className="relative px-11">
      {messageImgSrc && (
        <div className="absolute bottom-[100%]">
          <div className="relative max-w-[400px] max-h-[50vh] w-fit rounded-3xl overflow-hidden">
            <Button
              onClick={() => {
                setMessageImg(undefined);
                setMessageImgSrc("");
              }}
              className="absolute m-1 !p-2 duration-300 bg-orange opacity-50 hover:opacity-100 rounded-full z-20"
            >
              <Delete />
            </Button>
            <img
              src={messageImgSrc + ""}
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
          disabled={!newMessage && !messageImgSrc}
          className="btn-orange w-[46px] h-[46px] rounded-full !p-0 flex items-center justify-center"
        >
          <Send />
        </Button>
      </form>
    </div>
  );
};
export default MessageForm;
