import { channelsAtom, userAtom } from "@app/GlobalProvider";
import { Channel, ChannelsObj } from "@app/chat/_components/types";
import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
  Unsubscribe,
  collection,
  doc,
  documentId,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { db } from "src/lib/firebase/firebase";

const useGetChannels = () => {
  const [channelsUnsb, setChannelsUnsb] = useState<Unsubscribe | null>(null);
  const [channelsOfUserUnsb, setChannelsOfUserUnsb] =
    useState<Unsubscribe | null>(null);
  const setChannels = useSetAtom(channelsAtom);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (user.id !== -1) subscribeChannels();
    return () => {
      channelsUnsb && channelsUnsb();
      channelsOfUserUnsb && channelsOfUserUnsb();
    };
  }, [user.id]);

  const subscribeChannels = async () => {
    const userId = user.id.toString();
    const unsb = onSnapshot(
      doc(db, "channelsOfUser", userId),
      channelsOfUserOnNext
    );
    setChannelsOfUserUnsb(() => unsb);
  };

  const channelsOfUserOnNext = async (
    querySnapshot: DocumentSnapshot<DocumentData, DocumentData>
  ) => {
    const channelsOfUser = querySnapshot.data()?.channels;
    if (!channelsOfUser || channelsOfUser.length === 0) return;

    const channelsQuery = query(
      collection(db, "channel"),
      where(documentId(), "in", channelsOfUser)
    );
    const chUnsb = onSnapshot(channelsQuery, channelsOnNext);
    setChannelsUnsb(() => chUnsb);
  };

  const channelsOnNext = async (
    querySnapshot: QuerySnapshot<DocumentData, DocumentData>
  ) => {
    const userId = user.id.toString();
    const channelsPrimise = querySnapshot.docs
      .sort((a, b) => b.data()?.createdAt - a.data()?.createdAt)
      .map(async (channel) => {
        const chatUser = await getDocs(
          query(
            collection(channel.ref, "users"),
            where(documentId(), "!=", userId)
          )
        );
        if (!chatUser.docs[0]) return;

        const { lastChatAt, lastChatUser, lastVisitedAt } = channel.data();
        return {
          ...channel.data(),
          id: channel.id,
          chatUser: {
            ...chatUser.docs[0]?.data(),
            id: chatUser.docs[0]?.id,
          },
          isUnread:
            lastChatUser != userId && lastChatAt > lastVisitedAt?.[user.id],
        };
      });
    const channels = (await Promise.all(channelsPrimise)) as Channel[];
    setChannels(
      channels.reduce(
        (channels: ChannelsObj, curr) => (
          (channels[curr.id] = { ...curr }), channels
        ),
        {}
      )
    );
  };

  return;
};
export default useGetChannels;
