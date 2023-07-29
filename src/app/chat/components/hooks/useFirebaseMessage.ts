import { userAtom } from "@app/GlobalProvider";
import { ChatUser, Message } from "@app/chat/types";
import {
  collection,
  documentId,
  getDoc,
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

  const getChatUser = async () => {
    const fbChatUser = await getDocs(
      query(
        collection(db, "channel", channelID, "users"),
        where(documentId(), "!=", userId.toString())
      )
    );
    setChatUser(fbChatUser.docs[0].data() as ChatUser);
  };

  useEffect(() => {
    if (channelID && userId != -1) {
      getChat();
      getChatUser();
    }
  }, [channelID, userId]);

  return { messages, chatUser };
};

export default useFirebaseMessage;
