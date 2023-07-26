import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { db, storage } from "src/lib/firebase/firebase";

interface ChatInput {
  userId: string;
  channelID: string;
}

const ChatInput = ({ userId, channelID }: ChatInput) => {
  const [newMessage, setNewMessage] = useState("");
  const [imgSrc, setImgSrc] = useState<ArrayBuffer | string>();
  const [img, setImg] = useState<File>();
  const inputRef = useRef<HTMLInputElement | null>(null);

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
  };
  return (
    <div className="relative px-8">
      {imgSrc && (
        <div className="w-[400px] absolute bottom-[100%] bg-gray-100">
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
      <form onSubmit={handleOnSubmit} className="flex flex-row py-3 gap-2">
        <input
          type="file"
          id="file"
          name="file"
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
        <label htmlFor="file">
          <span>이미지</span>
        </label>
        <input
          ref={inputRef}
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력해봐요."
          className="flex-1 bg-transparent bg-gray-200 rounded-md px-4 py-2"
        />
        <button
          type="submit"
          disabled={!newMessage}
          className="uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          전송
        </button>
      </form>
    </div>
  );
};
export default ChatInput;
