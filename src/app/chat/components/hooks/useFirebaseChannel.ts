import { userAtom } from "@app/GlobalProvider";
import { Channel, ChannelsObj, ChatUser } from "@app/chat/components/types";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { useAtom, useAtomValue } from "jotai";
import { db } from "src/lib/firebase/firebase";
import { firebaseUtils } from "src/lib/firebase/utils";
import { channelsAtom } from "../ChatProvider";

export const useGetChannels = () => {
  const [channels, setChannels] = useAtom(channelsAtom);
  const user = useAtomValue(userAtom);

  const { isLoading: isFetchChannelLoading } = useQuery(["getChannels"], {
    queryFn: async () => await getChannels(),
    onSuccess: (res: Channel[]) => {
      setChannels(
        res.reduce(
          (channels: ChannelsObj, curr) => (
            (channels[curr.id] = { ...curr }), channels
          ),
          {}
        )
      );
    },
    onError: (e) => console.error(e),
    enabled: user.id != -1,
  });

  const getChannels = async () => {
    const querySnapshot = await getDoc(
      doc(db, "channelsOfUser", user.id.toString())
    );
    const channelsOfUser = querySnapshot.data()?.channels;
    const channelsSnapshot = await getDocs(
      query(
        collection(db, "channel"),
        where(documentId(), "in", channelsOfUser),
        orderBy(documentId())
        // orderBy("created_at")
      )
    );
    const resPromises = channelsSnapshot.docs.map(async (doc) => {
      const users = await getDocs(
        query(
          collection(db, "channel", doc.id, "users"),
          where(documentId(), "!=", user.id.toString())
        )
      );
      const chatUser = { ...users.docs[0].data(), id: users.docs[0].id };
      return { ...doc.data(), id: doc.id, chatUser };
    });

    const res = await Promise.all(resPromises);
    return res;
  };

  return {
    channels,
    isFetchChannelLoading: isFetchChannelLoading || user.id == -1,
  };
};

export const useGenerateChannel = () => {
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
