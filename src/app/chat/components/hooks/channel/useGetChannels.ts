import { channelsAtom, userAtom } from "@app/GlobalProvider";
import { Channel, ChannelsObj } from "@app/chat/components/types";
import {
  Unsubscribe,
  collection,
  doc,
  documentId,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { db } from "src/lib/firebase/firebase";

const useGetChannels = () => {
  const [channelsUnsb, setChannelsUnsb] = useState<Unsubscribe | null>(null);
  const [channelsOfUserUnsb, setChannelsOfUserUnsb] =
    useState<Unsubscribe | null>(null);
  const [channels, setChannels] = useAtom(channelsAtom);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (user.id !== -1) getChannels();
    return () => {
      channelsUnsb && channelsUnsb();
      channelsOfUserUnsb && channelsOfUserUnsb();
    };
  }, [user.id]);

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
              const { lastChatAt, lastChatUser, lastVisitedAt, ...chProps } =
                channel.data();
              return {
                ...chProps,
                id: channel.id,
                chatUser,
                isUnread:
                  lastChatUser != user.id.toString() &&
                  lastChatAt > lastVisitedAt?.[user.id],
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
export default useGetChannels;
