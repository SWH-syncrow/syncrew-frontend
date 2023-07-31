import { userAtom } from "@app/GlobalProvider";
import { Message } from "@app/chat/components/types";
import {
  Unsubscribe,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { db } from "src/lib/firebase/firebase";

const useFirebaseMessage = (channelID: string) => {
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
    if (channelID !== "" && userId != -1) getMessages();
  }, [channelID, userId]);

  useEffect(() => {
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [channelID]);

  return { messages };
};

export default useFirebaseMessage;
