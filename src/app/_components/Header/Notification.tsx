import Button from "@components/Button";
import { Dialog } from "@components/Dialog";
import Ping from "@components/Ping";
import useGenerateChannel from "@components/_hooks/useGenerateChannel";
import { useGlobalModal } from "@components/modals/GlobalModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import Bell from "public/assets/icons/알림_inactive.svg";
import Logo_LG from "public/assets/logos/LG_01.svg";
import { useMemo, useState } from "react";
import { GetNotificationsResponse } from "src/lib/apis/_models/NotificationsDto";
import { FriendApis } from "src/lib/apis/friendApis";
import { NotiApis } from "src/lib/apis/notiApis";

const Notification = () => {
  const [open, setOpen] = useState(false);
  const [notiList, setNotiList] = useState<GetNotificationsResponse | []>([]);

  const unReadNotiIds = useMemo(
    () => notiList.filter((noti) => !noti.read).map((noti) => noti.id),
    [notiList]
  );

  const { refetch } = useQuery(["getNotifications"], {
    queryFn: async () => await NotiApis.getNotifications(),
    onSuccess: ({ data }) => {
      setNotiList(data);
    },
    onError: (e) => {
      console.error(e);
    },
    refetchInterval: 10000,
  });

  const readNotifications = useMutation(["readNotifications"], {
    mutationFn: async (ids: number[]) => await NotiApis.readNotifications(ids),
    onSuccess: () => {
      refetch();
    },
    onError: (e) => {
      console.error(e);
    },
  });

  const onOpenChangeHandler = (open: boolean) => {
    setOpen(open);
    if (open) refetch();
    else if (unReadNotiIds.length > 0) readNotifications.mutate(unReadNotiIds);
  };

  return (
    <div className="relative">
      <Dialog.Root modal={false} open={open} onOpenChange={onOpenChangeHandler}>
        <Dialog.Trigger
          className={clsx(
            "duration-300 rounded-full p-1",
            open && "bg-orange [&_svg_path]:fill-white"
          )}
        >
          <Ping
            className="!-top-2 -right-2"
            condition={!open && unReadNotiIds.length > 0}
          >
            <Bell className="[&_path]:duration-300" />
          </Ping>
        </Dialog.Trigger>
        <Dialog.Content
          className={
            "absolute right-0 translate-x-8 top-[100%] translate-y-4 bg-white shadow-normal w-[340px] rounded-2xl py-8 modal-arrow-sm after:!left-[calc(100%-40px)] after:-translate-x-full"
          }
          onInteractOutside={(e) => {
            if (e.type === "dismissableLayer.focusOutside") e.preventDefault();
          }}
        >
          <div className="max-h-[500px] overflow-auto flex flex-col gap-6 px-8">
            {notiList.length === 0 && (
              <div className="flex w-full justify-center flex-col items-center gap-8 p-10">
                <Logo_LG />
                <span className="text-grey-300 text-lg">
                  알림 내역이 없어요
                </span>
              </div>
            )}
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
                {
                  {
                    REQUESTED: <Notification.REQUESTED {...{ noti }} />,
                    REQUEST: (
                      <span className="text-grey-300 leading-8">{`${noti.friendName}님에게 친구요청을 보냈어요`}</span>
                    ),
                    ACCEPT: <Notification.MATCHED {...{ noti }} />,
                    ACCEPTED: <Notification.MATCHED {...{ noti }} />,
                    REFUSE: (
                      <span className="text-grey-300 leading-8">{`${noti.friendName}님의 친구요청을 거절했어요`}</span>
                    ),
                    REFUSED: (
                      <span className="text-grey-300 leading-8">{`${noti.friendName}님이 친구요청을 거절했어요`}</span>
                    ),
                  }[noti.status]
                }
              </div>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

const RequestedContent = ({ noti }: { noti: GetNotificationsResponse[0] }) => {
  const { setModalState } = useGlobalModal();
  const { genrateChannel } = useGenerateChannel();
  const queryClinet = useQueryClient();
  const acceptFriend = useMutation({
    mutationFn: async ({
      friendRequestId,
      notificationId,
    }: PostFriendRequest) =>
      await FriendApis.acceptFriend({ friendRequestId, notificationId }),
    onSuccess: (res: any) => {
      setModalState({ contents: "친구 수락이 완료 되었어요" });
      const friendRequestId = JSON.parse(res.config.data).friendRequestId;
      genrateChannel.mutate({ friend: res.data, friendRequestId });
      queryClinet.invalidateQueries(["getNotifications"]);
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
      queryClinet.invalidateQueries(["getNotifications"]);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return (
    <>
      <span className="text-grey-300 leading-8 mb-[14px]">{`${noti.friendName}님이 친구요청을 보냈어요`}</span>
      <div className="flex justify-between gap-3">
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
                  onClick={() =>
                    refuseFriend.mutate({
                      friendRequestId: noti.friendRequestId,
                      notificationId: noti.id,
                    })
                  }
                >
                  확인
                </Button>
              ),
            });
          }}
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
};
Notification.REQUESTED = RequestedContent;

const MatchedContent = ({ noti }: { noti: GetNotificationsResponse[0] }) => {
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
};
Notification.MATCHED = MatchedContent;

export default Notification;
