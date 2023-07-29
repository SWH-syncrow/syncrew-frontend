import { userAtom } from "@app/GlobalProvider";
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
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { db } from "src/lib/firebase/firebase";

const useFirebaseChannel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [channels, setChannels] = useState<Channel[]>([]);
  const userAtomValue = useAtomValue(userAtom);

  const getChannels = async () => {
    const querySnapshot = await getDoc(
      doc(db, "channelsOfUser", userAtomValue.id.toString())
    );
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
        .filter((user) => user.id !== userAtomValue.id.toString())
        .map((user) => ({ ...user.data(), id: user.id }))[0] as ChatUser;
      const channel = { ...doc.data(), id: doc.id, chatUser } as Channel;

      setChannels((p) => [...p, channel]);
    });
  };

  useEffect(() => {
    userAtomValue.id != -1 && getChannels().then(() => setIsLoading(false));
  }, [userAtomValue.id]);

  return { channels, isLoading };
};

export default useFirebaseChannel;
