import { channelsAtom, userAtom } from "@app/GlobalProvider";
import { Channel, ChannelsObj, ChatUser } from "@app/chat/components/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Unsubscribe,
  addDoc,
  arrayUnion,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
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
import { useEffect, useState } from "react";

export const useGetChannels = () => {
  const [channelsUnsb, setChannelsUnsb] = useState<Unsubscribe | null>(null);
  const [channelsOfUserUnsb, setChannelsOfUserUnsb] =
    useState<Unsubscribe | null>(null);
  const [channels, setChannels] = useAtom(channelsAtom);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (user.id !== -1) getChannels();
  }, [user.id]);

  useEffect(() => {
    return () => {
      channelsUnsb && channelsUnsb();
      channelsOfUserUnsb && channelsOfUserUnsb();
    };
  }, []);

  const getChannels = async () => {
    const unsb = onSnapshot(
      doc(db, "channelsOfUser", user.id.toString()),
      async (querySnapshot) => {
        const channelsOfUser = querySnapshot.data()?.channels;
        const channelsQuery = query(
          collection(db, "channel"),
          where(documentId(), "in", channelsOfUser)
        );

        const chUnsb = onSnapshot(channelsQuery, async (querySnapshot) => {
          const resPromises = querySnapshot.docs
            .sort((a, b) => b.data().createdAt - a.data().createdAt)
            .map(async (channel) => {
              const notMe = await getDocs(
                query(
                  collection(channel.ref, "users"),
                  where(documentId(), "!=", user.id.toString())
                )
              );
              const chatUser = {
                ...notMe.docs[0].data(),
                id: notMe.docs[0].id,
              };
              return {
                ...channel.data(),
                id: channel.id,
                chatUser,
                isUnread:
                  channel.data().lastChatAt >
                  channel.data()?.lastVisitedAt?.[user.id],
              };
            });
          const res = (await Promise.all(resPromises)) as Channel[];
          setChannels(
            res.reduce(
              (channels: ChannelsObj, curr) => (
                (channels[curr.id] = { ...curr }), channels
              ),
              {}
            )
          );
        });
        setChannelsUnsb(() => chUnsb);
      }
    );
    setChannelsOfUserUnsb(() => unsb);
  };

  return {
    channels,
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
