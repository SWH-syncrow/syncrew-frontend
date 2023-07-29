import { Input } from "@components/Input";
import TextArea from "@components/TextArea";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { db, storage } from "src/lib/firebase/firebase";
import Photo from "public/assets/icons/image.svg";
import Send from "public/assets/icons/send.svg";
import { Button } from "@components/Button";

interface ChatInput {
  userId: string;
  channelID: string;
}

const ChatInput = ({ userId, channelID }: ChatInput) => {
  const [newMessage, setNewMessage] = useState("");
  const [imgSrc, setImgSrc] = useState<ArrayBuffer | string>();
  const [img, setImg] = useState<File>();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImg(file);

    if (file) {
      const fileReader = new FileReader();

      fileReader.onloadend = (e) => {
        setImgSrc(e.target?.result || "");
      };
      fileReader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();

    if (img) {
      const uniqueId = img.name;
      const storageRef = ref(storage, uniqueId);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.error(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, "channel", channelID, "message"), {
            text: trimmedMessage,
            createdAt: serverTimestamp(),
            userId,
            photoURL: downloadURL,
          });
        }
      );
    } else if (trimmedMessage) {
      addDoc(collection(db, "channel", channelID, "message"), {
        text: trimmedMessage,
        createdAt: serverTimestamp(),
        userId,
      });
    }
    setNewMessage("");
    setImgSrc("");
    setImg(undefined);
  };
  return (
    <div className="relative">
      {imgSrc && (
        <div className="w-[400px] absolute bottom-[100%] bg-grey-100">
          <button
            onClick={() => {
              setImg(undefined);
              setImgSrc("");
            }}
          >
            삭제
          </button>
          <img src={imgSrc + ""} alt="첨부 이미지" />
        </div>
      )}
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-row items-center pt-8 gap-4 w-full"
      >
        <div className="relative flex-1 flex">
          <TextArea
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력해봐요."
            className="bg-transparent bg-grey-0 px-8 py-2 flex-1 h-[46px] !rounded-full text-base"
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
          disabled={!newMessage}
          className="btn-orange w-[46px] h-[46px] rounded-full !p-0 flex items-center justify-center"
        >
          <Send />
        </Button>
      </form>
    </div>
  );
};
export default ChatInput;
