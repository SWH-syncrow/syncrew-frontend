import Button from "@components/Button";
import { useGlobalModal } from "@components/modals/GlobalModal";
import { useMutation } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FriendApis } from "src/lib/apis/friendApis";
import { db } from "src/lib/firebase/firebase";

const RefuseButton = ({ friendRequestId }: { friendRequestId: number }) => {
  const channelId = useSearchParams()?.get("channel") || "";
  const router = useRouter();
  const { setModalState, resetState } = useGlobalModal();

  const refuseFriend = useMutation({
    mutationFn: async (friendRequestId: number) =>
      await FriendApis.refuseFriend({ friendRequestId }),
    onSuccess: async () => {
      resetState();
      router.push("/chat");
      await deleteDoc(doc(db, "channel", channelId));
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return (
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
              className="btn-orange rounded-none rounded-br-2xl"
              onClick={() => refuseFriend.mutate(friendRequestId)}
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
  );
};

export default RefuseButton;
