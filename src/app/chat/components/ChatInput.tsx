import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FormEvent, useEffect, useRef, useState } from "react";
import { db } from "src/lib/firebase";

interface ChatInput {
  userId: string;
  channelID: string;
}

const ChatInput = ({ userId, channelID }: ChatInput) => {
  const [newMessage, setNewMessage] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      addDoc(collection(db, "channel", channelID, "message"), {
        text: trimmedMessage,
        createdAt: serverTimestamp(),
        userId,
      });
      setNewMessage("");
    }
  };
  return (
    <div>
      <form onSubmit={handleOnSubmit} className="flex flex-row py-3 gap-2">
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
