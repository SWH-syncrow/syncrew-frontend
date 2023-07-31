import { userAtom } from "@app/GlobalProvider";
import { Message } from "@app/chat/components/types";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { db } from "src/lib/firebase/firebase";

const useFirebaseMessage = (channelID: string) => {
  const { id: userId } = useAtomValue(userAtom);
  const [messages, setMessages] = useState<Message[] | []>([]);

  useQuery(["getMessages"], {
    queryFn: async () => await getMessages(),
    enabled: channelID !== "" && userId != -1,
  });

  const getMessages = async () => {
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

  return { messages };
};

export default useFirebaseMessage;
