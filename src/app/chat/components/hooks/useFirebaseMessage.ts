import { userAtom } from "@app/GlobalProvider";
import { ChatUser, Message } from "@app/chat/types";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  documentId,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { db } from "src/lib/firebase/firebase";

const useFirebaseMessage = (channelID: string) => {
  const { id: userId } = useAtomValue(userAtom);
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [chatUser, setChatUser] = useState<ChatUser>();

  useQuery(["getMessages"], {
    queryFn: async () => await getMessages(),
    enabled: channelID !== "" && userId != -1,
  });
  useQuery(["getChatUser"], {
    queryFn: async () => await getChatUser(),
    onSuccess: (res: ChatUser) => {
      setChatUser(res);
    },
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

  const getChatUser = async () => {
    const fbChatUser = await getDocs(
      query(
        collection(db, "channel", channelID, "users"),
        where(documentId(), "!=", userId.toString())
      )
    );
    return fbChatUser.docs[0].data();
  };

  return { messages, chatUser };
};

export default useFirebaseMessage;
