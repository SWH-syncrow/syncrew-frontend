import { userAtom } from "@app/GlobalProvider";
import { Message } from "@app/chat/_components/types";
import {
  Unsubscribe,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { db } from "src/lib/firebase/firebase";

const useChat = (channelId: string) => {
  const userId = useAtomValue(userAtom).id;
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [unsubscribe, setUnsubscribe] = useState<Unsubscribe | null>(null);

  const getMessages = async () => {
    try {
      const getMSGQuery = query(
        collection(db, "channel", channelId, "message"),
        orderBy("createdAt")
      );
      const uns = onSnapshot(getMSGQuery, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMessages(data as Message[] | []);
      });
      setUnsubscribe(() => uns);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (channelId !== "" && userId != -1) getMessages();
  }, [channelId, userId]);

  useEffect(() => {
    return () => {
      unsubscribe && unsubscribe();
      if (channelId !== "") {
        updateDoc(doc(db, "channel", channelId), {
          [`lastVisitedAt.${userId}`]: serverTimestamp(),
        }).catch((e) => {
          if (e.code !== "not-found") throw e;
        });
      }
    };
  }, [channelId]);

  return { messages };
};
export default useChat;
