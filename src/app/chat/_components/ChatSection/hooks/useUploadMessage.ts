import { channelsAtom, userAtom } from "@app/GlobalProvider";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAtomValue } from "jotai";
import { FormEvent } from "react";
import { db, storage } from "src/lib/firebase/firebase";

const useUploadMessage = ({
  channelId,
  messageImg,
  message,
}: {
  channelId: string;
  messageImg: File | undefined;
  message: string;
}) => {
  const userId = useAtomValue(userAtom).id;
  const channels = useAtomValue(channelsAtom);

  const uploadHandler = (e: FormEvent) => {
    e.preventDefault();
    try {
      const trimmedMessage = message.trim();
      if (!trimmedMessage && !messageImg) return;

      if (messageImg) {
        const uniqueId = messageImg.name;
        const storageRef = ref(storage, uniqueId);
        const uploadTask = uploadBytesResumable(storageRef, messageImg);

        uploadTask.on(
          "state_changed",
          () => {},
          (error) => {
            console.error(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await addDoc(collection(db, "channel", channelId, "message"), {
              text: trimmedMessage,
              createdAt: serverTimestamp(),
              userId: userId.toString(),
              photoURL: downloadURL,
            });
          }
        );
      } else {
        addDoc(collection(db, "channel", channelId, "message"), {
          text: trimmedMessage,
          createdAt: serverTimestamp(),
          userId: userId.toString(),
        });
      }

      updateDoc(doc(db, "channel", channelId), {
        lastChatAt: serverTimestamp(),
        lastChatUser: userId.toString(),
      });

      if (channels[channelId].status === "READY") {
        updateDoc(doc(db, "channel", channelId), { status: "DOING" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { uploadHandler };
};
export default useUploadMessage;
