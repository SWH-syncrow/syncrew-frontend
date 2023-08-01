import { useGenerateChannel } from "@app/chat/components/hooks/useFirebaseChannel";
import { Button } from "@components/Button";
import { Dialog } from "@components/Dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Bell from "public/assets/icons/알림_inactive.svg";
import { useCallback, useRef, useState } from "react";
import { FriendApis } from "src/lib/apis/friendApis";
import { NotiApis } from "src/lib/apis/notiApis";

type ALERT_STATUS = "RECEIVED" | "REQUESTED" | "MATCHED" | "REJECTED";
interface Alert {
  id: number;
  friendRequestId: number;
  friendName: string;
  friendId: number;
  status: ALERT_STATUS;
  read: boolean;
}
const Alert = () => {
  const alertRef = useRef<HTMLButtonElement | null>(null);
  const [alertList, setAlertList] = useState<Alert[] | []>([]);
  const { genrateChannel } = useGenerateChannel();

  const { refetch } = useQuery(["getNotifications"], {
    queryFn: async () => await NotiApis.getNotifications(),
    onSuccess: ({ data: { notifications } }) => {
      setAlertList(notifications);
    },
    onError: (e) => {
      console.error(e);
    },
    refetchInterval: 10000,
  });

  const acceptFriend = useMutation({
    mutationFn: async (friendRequestId: number) =>
      await FriendApis.acceptFriend(friendRequestId),
    onSuccess: (res: any) => {
      const friendRequestId = JSON.parse(res.config.data).data.friendRequestId;
      genrateChannel.mutate({ friend: res.data, friendRequestId });
      refetch();
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const rejectFriend = useMutation({
    mutationFn: async (friendRequestId: number) =>
      await FriendApis.rejectFriend(friendRequestId),
    onSuccess: () => {
      refetch();
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const getAlertElement = useCallback(
    (alert: Alert) => {
      switch (alert.status) {
        case "RECEIVED":
          return (
            <>
              <span className="text-grey-300 leading-8 mb-[14px]">{`${alert.friendName}님이 친구요청을 보냈어요`}</span>
              <div className="flex justify-between gap-3">
                <Button
                  onClick={() => rejectFriend.mutate(alert.friendRequestId)}
                  className="btn-orange-border flex-1 text-xs py-2 !rounded-xl"
                  disabled={acceptFriend.isLoading || rejectFriend.isLoading}
                >
                  거절하기
                </Button>
                <Button
                  onClick={() => acceptFriend.mutate(alert.friendRequestId)}
                  className="btn-orange flex-1 text-xs py-2 !rounded-xl"
                  disabled={acceptFriend.isLoading || rejectFriend.isLoading}
                >
                  수락하기
                </Button>
              </div>
            </>
          );
        case "REQUESTED":
          return (
            <span className="text-grey-300 leading-8">{`${alert.friendName}님에게 친구요청을 보냈어요`}</span>
          );
        case "MATCHED":
          return (
            <>
              <span className="text-grey-300 leading-8 mb-[14px]">{`${alert.friendName}님과 친구가 매칭되었어요`}</span>
              <Link
                className="btn-orange text-xs !rounded-xl text-center"
                href={"/chat"}
              >
                싱크루 채팅으로 이동하기
              </Link>
            </>
          );
        case "REJECTED":
          return (
            <span className="text-grey-300 leading-8">{`${alert.friendName}님이 친구요청을 거절했어요`}</span>
          );
      }
    },
    [acceptFriend, rejectFriend]
  );

  return (
    <div className="relative">
      <Dialog.Root
        modal={false}
        onOpenChange={(open) => {
          /* read */
          if (open) {
            alertRef.current?.classList.add("bg-orange");
            alertRef.current?.classList.add("[&_svg_path]:fill-white");
          } else {
            alertRef.current?.classList.remove("bg-orange");
            alertRef.current?.classList.remove("[&_svg_path]:fill-white");
          }
        }}
      >
        <Dialog.Trigger
          ref={alertRef}
          className="duration-300 rounded-full p-1"
        >
          <Bell className="[&_path]:duration-300" />
        </Dialog.Trigger>
        <Dialog.Content
          className={
            "absolute right-0 translate-x-8 top-[100%] translate-y-4  bg-white shadow-normal w-[340px] rounded-2xl py-8 modal-arrow-sm after:!left-[calc(100%-40px)] after:-translate-x-full"
          }
        >
          <div className="max-h-[500px] overflow-auto flex flex-col gap-6 px-8">
            {alertList.map((alert) => (
              <div
                key={alert.id}
                className="flex flex-col w-full pt-6 border-t border-grey-100 first:border-none first:pt-0"
              >
                <span className="font-medium">싱크루 알림</span>
                {getAlertElement(alert)}
              </div>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default Alert;
