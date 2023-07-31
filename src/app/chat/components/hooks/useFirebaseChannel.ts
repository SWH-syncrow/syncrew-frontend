import { userAtom } from "@app/GlobalProvider";
import { Channel, ChatUser } from "@app/chat/types";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { db } from "src/lib/firebase/firebase";
import { firebaseUtils } from "src/lib/firebase/utils";

const useFirebaseChannel = ({
  getCahnnelsMode = true,
}: {
  getCahnnelsMode?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [channels, setChannels] = useState<Channel[]>([]);
  const { id: userId, username } = useAtomValue(userAtom);

  const getChannels = async () => {
    const querySnapshot = await getDoc(
      doc(db, "channelsOfUser", userId.toString())
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
        .filter((user) => user.id !== userId.toString())
        .map((user) => ({ ...user.data(), id: user.id }))[0] as ChatUser;
      const channel = { ...doc.data(), id: doc.id, chatUser } as Channel;

      setChannels((p) => [...p, channel]);
    });
  };

  const createChannel = async (friend: ChatUser) => {
    const channelDoc = await addDoc(collection(db, "channel"), {
      createdAt: serverTimestamp(),
      status: "READY",
    });

    Promise.all([
      setDoc(doc(channelDoc, "users", friend.id.toString()), {
        username: friend.username,
        profileImage: "",
        temp: 36.5,
      }),
      setDoc(doc(channelDoc, "users", userId.toString()), {
        username,
        profileImage: "",
        temp: 36.5,
      }),
      await firebaseUtils.createDocIfNotExists(
        doc(db, "channelsOfUser", friend.id.toString()),
        {
          channels: [],
        }
      ),
      await firebaseUtils.createDocIfNotExists(doc(db, "channelsOfUser", "1"), {
        channels: [],
      }),
      updateDoc(doc(db, "channelsOfUser", friend.id.toString()), {
        channels: arrayUnion(channelDoc.id),
      }),
      updateDoc(doc(db, "channelsOfUser", userId.toString()), {
        channels: arrayUnion(channelDoc.id),
      }),
    ]);
  };

  useEffect(() => {
    if (!getCahnnelsMode) return;
    userId != -1 && getChannels().then(() => setIsLoading(false));
  }, [userId, getCahnnelsMode]);

  return { channels, isLoading, createChannel };
};

export default useFirebaseChannel;
