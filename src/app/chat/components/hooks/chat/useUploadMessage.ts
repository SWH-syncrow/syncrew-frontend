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
  channelID,
  chatImg,
  message,
}: {
  channelID: string;
  chatImg: File | undefined;
  message: string;
}) => {
  const { id: userId } = useAtomValue(userAtom);
  const channels = useAtomValue(channelsAtom);

  const uploadHandler = (e: FormEvent) => {
    e.preventDefault();
    try {
      const trimmedMessage = message.trim();

      if (chatImg) {
        const uniqueId = chatImg.name;
        const storageRef = ref(storage, uniqueId);
        const uploadTask = uploadBytesResumable(storageRef, chatImg);

        uploadTask.on(
          "state_changed",
          () => {},
          (error) => {
            console.error(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await addDoc(collection(db, "channel", channelID, "message"), {
              text: trimmedMessage,
              createdAt: serverTimestamp(),
              userId: userId.toString(),
              photoURL: downloadURL,
            });
          }
        );
      } else if (trimmedMessage) {
        addDoc(collection(db, "channel", channelID, "message"), {
          text: trimmedMessage,
          createdAt: serverTimestamp(),
          userId: userId.toString(),
        });
      }
      updateDoc(doc(db, "channel", channelID), {
        lastChatAt: serverTimestamp(),
        lastChatUser: userId,
      });

      if (channels[channelID].status === "READY") {
        updateDoc(doc(db, "channel", channelID), { status: "DOING" });
      }
    } catch (error) {}
  };

  return { uploadHandler };
};
export default useUploadMessage;
