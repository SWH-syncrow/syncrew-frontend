import { Channel, ChatUser } from "@app/chat/types";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "src/lib/firebase";

const useFirebaseChannel = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const userId = "test";

  const getChannels = async () => {
    const querySnapshot = await getDoc(doc(db, "channelsOfUser", "userId"));
    const channels = querySnapshot.data()?.channels;

    const channelsSnapshot = await getDocs(
      query(
        collection(db, "channel"),
        where(documentId(), "in", channels),
        orderBy(documentId())
        // orderBy("created_at")
      )
    );

    channelsSnapshot.forEach(async (doc) => {
      const users = await getDocs(collection(db, "channel", doc.id, "users"));
      const chatUser = users.docs
        .filter((user) => user.id !== userId)
        .map((user) => ({ ...user.data(), id: user.id }))[0] as ChatUser;
      const channel = { ...doc.data(), id: doc.id, chatUser } as Channel;

      setChannels((p) => [...p, channel]);
    });
  };

  useEffect(() => {
    getChannels();
  }, []);

  return { channels };
};

export default useFirebaseChannel;
