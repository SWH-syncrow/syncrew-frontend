import { Button } from "@components/Button";
import { Dialog } from "@components/Dialog";
import Ping from "@components/Ping";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Bell from "public/assets/icons/알림_inactive.svg";
import { useCallback, useRef, useState } from "react";
import { FriendApis } from "src/lib/apis/friendApis";
import { GetNotificationsResponse } from "src/lib/apis/_models/NotificationsDto";
import { NotiApis } from "src/lib/apis/notiApis";
import useGenerateChannel from "@app/chat/components/hooks/channel/useGenerateChannel";

const Notification = () => {
  const [open, setOpen] = useState(false);
  const notiRef = useRef<HTMLButtonElement | null>(null);
  const [notiList, setNotiList] = useState<
    GetNotificationsResponse["notifications"] | []
  >([]);
  const { genrateChannel } = useGenerateChannel();

  const { refetch } = useQuery(["getNotifications"], {
    queryFn: async () => await NotiApis.getNotifications(),
    onSuccess: ({ data: { notifications } }) => {
      setNotiList(notifications);
    },
    onError: (e) => {
      console.error(e);
    },
    refetchInterval: 10000,
  });

  const readNotis = useMutation({
    mutationFn: async (ids: number[]) => await NotiApis.readNotifications(ids),
    onSuccess: (res: any) => {
      setNotiList((p) => p.map((noti) => ({ ...noti, read: true })));
    },
    onError: (e) => {
      console.error(e);
    },
  });
  const acceptFriend = useMutation({
    mutationFn: async ({
      friendRequestId,
      notificationId,
    }: PostFriendRequest) =>
      await FriendApis.acceptFriend({ friendRequestId, notificationId }),
    onSuccess: (res: any) => {
      const friendRequestId = JSON.parse(res.config.data).data.friendRequestId;
      genrateChannel.mutate({ friend: res.data, friendRequestId });
      refetch();
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const refuseFriend = useMutation({
    mutationFn: async ({
      friendRequestId,
      notificationId,
    }: PostFriendRequest) =>
      await FriendApis.refuseFriend({ friendRequestId, notificationId }),
    onSuccess: () => {
      refetch();
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const getNotiElement = useCallback(
    (noti: GetNotificationsResponse["notifications"][0]) => {
      switch (noti.status) {
        case "REQUESTED":
          return (
            <>
              <span className="text-grey-300 leading-8 mb-[14px]">{`${noti.friendName}님이 친구요청을 보냈어요`}</span>
              <div className="flex justify-between gap-3">
                <Button
                  onClick={() =>
                    refuseFriend.mutate({
                      friendRequestId: noti.friendRequestId,
                      notificationId: noti.id,
                    })
                  }
                  className="btn-orange-border flex-1 text-xs py-2 !rounded-xl"
                  disabled={acceptFriend.isLoading || refuseFriend.isLoading}
                >
                  거절하기
                </Button>
                <Button
                  onClick={() =>
                    acceptFriend.mutate({
                      friendRequestId: noti.friendRequestId,
                      notificationId: noti.id,
                    })
                  }
                  className="btn-orange flex-1 text-xs py-2 !rounded-xl"
                  disabled={acceptFriend.isLoading || refuseFriend.isLoading}
                >
                  수락하기
                </Button>
              </div>
            </>
          );
        case "REQUEST":
          return (
            <span className="text-grey-300 leading-8">{`${noti.friendName}님에게 친구요청을 보냈어요`}</span>
          );
        case "ACCEPT":
        case "ACCEPTED":
          return (
            <>
              <span className="text-grey-300 leading-8 mb-[14px]">{`${noti.friendName}님과 친구가 매칭되었어요`}</span>
              <Link
                className="btn-orange text-xs !rounded-xl text-center"
                href={"/chat"}
              >
                싱크루 채팅으로 이동하기
              </Link>
            </>
          );
        case "REFUSE":
          return (
            <span className="text-grey-300 leading-8">{`${noti.friendName}님의 친구요청을 거절했어요`}</span>
          );
        case "REFUSED":
          return (
            <span className="text-grey-300 leading-8">{`${noti.friendName}님이 친구요청을 거절했어요`}</span>
          );
      }
    },
    [acceptFriend, refuseFriend]
  );

  return (
    <div className="relative">
      <Dialog.Root
        modal={false}
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (open) {
            notiRef.current?.classList.add("bg-orange");
            notiRef.current?.classList.add("[&_svg_path]:fill-white");
          } else {
            readNotis.mutate(
              notiList.filter((noti) => !noti.read).map((noti) => noti.id)
            );
            notiRef.current?.classList.remove("bg-orange");
            notiRef.current?.classList.remove("[&_svg_path]:fill-white");
          }
        }}
      >
        <Dialog.Trigger ref={notiRef} className="duration-300 rounded-full p-1">
          <Ping
            className="!-top-2 -right-2"
            condition={
              notiList.filter((noti) => !noti.read).length > 0 && !open
            }
          >
            <Bell className="[&_path]:duration-300" />
          </Ping>
        </Dialog.Trigger>
        <Dialog.Content
          className={
            "absolute right-0 translate-x-8 top-[100%] translate-y-4 bg-white shadow-normal w-[340px] rounded-2xl py-8 modal-arrow-sm after:!left-[calc(100%-40px)] after:-translate-x-full"
          }
        >
          <div className="max-h-[500px] overflow-auto flex flex-col gap-6 px-8">
            {notiList.map((noti) => (
              <div
                key={noti.id}
                className="flex flex-col w-full pt-6 border-t border-grey-100 first:border-none first:pt-0"
              >
                <div className="flex justify-between">
                  <span className="font-medium">싱크루 알림</span>
                  {!noti.read && (
                    <div className="w-2 h-2 rounded-full bg-orange" />
                  )}
                </div>
                {getNotiElement(noti)}
              </div>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default Notification;
