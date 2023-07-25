import { Message } from "@app/search/chat/types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "src/lib/firebase";

const useFirebaseMessage = (channelID: string) => {
  const [messages, setMessages] = useState<Message[] | []>([]);

  const getChat = async () => {
    const getMSGQuery = query(
      collection(db, "channel", channelID, "message"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(getMSGQuery, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(data as Message[] | []);
    });
    return unsubscribe;
  };

  useEffect(() => {
    channelID !== "" && getChat();
  }, [channelID]);

  return { messages };
};

export default useFirebaseMessage;
