import { userAtom } from "@app/GlobalProvider";
import { ChatUser } from "@app/chat/components/types";
import { useMutation } from "@tanstack/react-query";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useAtomValue } from "jotai";
import { db } from "src/lib/firebase/firebase";
import { firebaseUtils } from "src/lib/firebase/utils";

const useGenerateChannel = () => {
  const user = useAtomValue(userAtom);

  const genrateChannel = useMutation({
    mutationFn: async ({
      friend,
      friendRequestId,
    }: {
      friend: ChatUser;
      friendRequestId: number;
    }) => await generateFBChannel({ friend, friendRequestId }),
    onError: (e) => console.error(e),
  });

  const generateFBChannel = async ({
    friend,
    friendRequestId,
  }: {
    friend: ChatUser;
    friendRequestId: number;
  }) => {
    const channelDoc = await addDoc(collection(db, "channel"), {
      friendRequestId,
      createdAt: serverTimestamp(),
      status: "READY",
    });

    Promise.all([
      setDoc(doc(channelDoc, "users", friend.id.toString()), friend),
      setDoc(doc(channelDoc, "users", user.id.toString()), user),
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
      updateDoc(doc(db, "channelsOfUser", user.id.toString()), {
        channels: arrayUnion(channelDoc.id),
      }),
    ]);
  };

  return {
    genrateChannel,
  };
};

export default useGenerateChannel;
