import { channelsAtom, userAtom } from "@app/GlobalProvider";
import { Button } from "@components/Button";
import UserAvatar from "@components/UserAvatar";
import { useGlobalModal } from "@components/modal/GlobalModal";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useAtomValue } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { FriendApis } from "src/lib/apis/friendApis";
import { db } from "src/lib/firebase/firebase";
import ChatInput from "./ChatInput";
import useFirebaseMessage from "./hooks/useFirebaseMessage";
import { Message } from "./types";

const ChatSection = () => {
  const router = useRouter();
  const channelID = useSearchParams()?.get("channel") || "";
  const channels = useAtomValue(channelsAtom);
  const { messages } = useFirebaseMessage(channelID);
  const { id: userId } = useAtomValue(userAtom);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const { setModalState, resetState } = useGlobalModal();

  const rejectFriend = useMutation({
    mutationFn: async (friendRequestId: number) =>
      await FriendApis.rejectFriend(friendRequestId),
    onSuccess: async () => {
      resetState();
      await deleteDoc(doc(db, "channel", channelID));
      router.push("/chat");
    },
    onError: (e) => {
      console.error(e);
    },
  });

  useEffect(() => {
    return () => {
      if (channelID) {
        updateDoc(doc(db, "channel", channelID), {
          [`lastVisitedAt.${userId}`]: serverTimestamp(),
        }).catch((e) => {
          if (e.code !== "not-found") throw e;
        });
      }
    };
  }, [channelID]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className={clsx(
        channelID === "" ? "hidden" : "visible",
        "flex-1 flex flex-col pb-[50px] pt-[104px] w-full px-11"
      )}
    >
      <div className="flex justify-between bg-white pb-9">
        <div className="flex items-center gap-2">
          <UserAvatar
            profileImage={channels[channelID]?.chatUser?.profileImage}
            className="w-10 h-10 mr-2"
          />
          <span className="text-lg font-medium">
            {channels[channelID]?.chatUser?.username}
          </span>
          <span className="text-sm text-grey-300">
            {channels[channelID]?.chatUser?.temp}
          </span>
        </div>
        <Button
          onClick={() => {
            setModalState({
              contents: (
                <>
                  친구를 거절하시겠습니까?
                  <br />{" "}
                  <span className="text-sm text-red-5">
                    거절된 사용자는 동일 신청글에 재요청이 불가합니다.
                  </span>
                </>
              ),
              closeButton: "취소",
              button: (
                <Button
                  className="btn-orange rounded-none rounded-br-xl"
                  onClick={() =>
                    rejectFriend.mutate(channels[channelID].friendRequestId)
                  }
                >
                  확인
                </Button>
              ),
            });
          }}
          className="btn-grey-border rounded-full h-9 !py-0"
        >
          거절하기
        </Button>
      </div>

      <div className="flex flex-col flex-1 gap-2 overflow-y-scroll">
        {messages.map((message) => (
          <Message
            key={message.id}
            {...{ message }}
            isMine={message.userId === userId.toString()}
          />
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <ChatInput {...{ userId: userId.toString(), channelID }} />
    </div>
  );
};

interface MessageProps {
  message: Message;
  isMine: boolean;
}
const Message = ({ message, isMine }: MessageProps) => {
  return (
    <div
      className={clsx(
        isMine ? "self-end bg-orange text-white" : "self-start bg-grey-0",
        "py-2 px-4 rounded-3xl first:mt-auto leading-8 max-w-[80%]"
      )}
    >
      {message.photoURL && <img src={message.photoURL} className="" />}
      {message.text}
    </div>
  );
};
export default ChatSection;
