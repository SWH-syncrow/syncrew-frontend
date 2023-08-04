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

const useFirebaseChat = (channelID: string) => {
  const isEnteredChannel = channelID !== "";
  const { id: userId } = useAtomValue(userAtom);
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [unsubscribe, setUnsubscribe] = useState<Unsubscribe | null>(null);

  const getMessages = async () => {
    const getMSGQuery = query(
      collection(db, "channel", channelID, "message"),
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
  };

  useEffect(() => {
    if (isEnteredChannel && userId != -1) getMessages();
  }, [channelID, userId]);

  useEffect(() => {
    return () => {
      unsubscribe && unsubscribe();
      if (isEnteredChannel) {
        updateDoc(doc(db, "channel", channelID), {
          [`lastVisitedAt.${userId}`]: serverTimestamp(),
        }).catch((e) => {
          if (e.code !== "not-found") throw e;
        });
      }
    };
  }, [channelID]);

  return { messages };
};
export default useFirebaseChat;
