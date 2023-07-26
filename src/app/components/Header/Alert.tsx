import { Button } from "@components/Button";
import { Dialog } from "@components/Dialog";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import Link from "next/link";
import { useRef, useState } from "react";
import { db } from "src/lib/firebase/firebase";
import { firebaseUtils } from "src/lib/firebase/utils";

const mock = [
  {
    id: 1,
    friendRequestId: 1,
    friendName: "김그루",
    friendId: 2,
    status: "RECEIVED" as ALERT_STATUS,
    read: true,
  },
  {
    id: 2,
    friendRequestId: 1,
    friendName: "김그루",
    friendId: 2,
    status: "MATCHED" as ALERT_STATUS,
    read: true,
  },
];

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
  const [alertList, setAlertList] = useState(mock);
  // useQuery(["getAlert"], {
  //   queryFn: () => {
  //     return;
  //   },
  //   // refetchInterval: 10000,
  // });
  const onAcceptHandler = async (alert: Alert) => {
    //수락 api
    //채팅 생성
    const channelDoc = await addDoc(collection(db, "channel"), {
      createdAt: serverTimestamp(),
      status: "READY",
    });

    Promise.all([
      setDoc(channelDoc, {
        username: alert.friendName,
        profileImage: "",
        temp: 36.5,
      }),
      setDoc(channelDoc, {
        username: "김지현",
        profileImage: "",
        temp: 36.5,
      }),
      await firebaseUtils.createDocIfNotExists(
        doc(db, "channelsOfUser", alert.friendId.toString()),
        {
          channels: [],
        }
      ),
      await firebaseUtils.createDocIfNotExists(
        doc(db, "channelsOfUser", "test"),
        {
          channels: [],
        }
      ),
      updateDoc(doc(db, "channelsOfUser", alert.friendId.toString()), {
        channels: arrayUnion(channelDoc.id),
      }),
      updateDoc(doc(db, "channelsOfUser", "test"), {
        channels: arrayUnion(channelDoc.id),
      }),
    ]);
  };
  const getAlertElement = (alert: Alert) => {
    switch (alert.status) {
      case "RECEIVED":
        return (
          <>
            <span>{`${alert.friendName}님이 친구요청을 보냈어요`}</span>
            <div className="flex justify-between">
              <Button>거절하기</Button>
              <Button onClick={() => onAcceptHandler(alert)}>수락하기</Button>
            </div>
          </>
        );
      case "REQUESTED":
        return <span>{`${alert.friendName}님에게 친구요청을 보냈어요`}</span>;
      case "MATCHED":
        return (
          <>
            <span>{`${alert.friendName}님과 친구가 매칭되었어요`}</span>
            <Link href={"/chat"}>싱크루 채팅으로 이동하기</Link>
          </>
        );
      case "REJECTED":
        return <span>{`${alert.friendName}님이 친구요청을 거절했어요`}</span>;
    }
  };
  return (
    <div className="relative">
      <Dialog.Root
        modal={false}
        onOpenChange={() => {
          /* read */
        }}
      >
        <Dialog.Trigger ref={alertRef}>알림</Dialog.Trigger>
        <Dialog.Content
          className={
            "absolute right-0 translate-x-8 top-[100%] translate-y-4 flex flex-col bg-white shadow-lg w-[340px] rounded-2xl p-8 gap-6"
          }
        >
          {alertList.map((alert) => (
            <div
              key={alert.id}
              className="flex flex-col w-full pt-6 border-t border-gray-100 first:border-none first:pt-0"
            >
              <span className="font-medium">싱크루 알림</span>
              {getAlertElement(alert)}
            </div>
          ))}
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default Alert;
