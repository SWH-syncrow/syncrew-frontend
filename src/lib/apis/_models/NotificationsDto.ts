export type NOTI_STATUS =
  | "REQUESTED"
  | "ACCEPT"
  | "ACCEPTED"
  | "REFUSE"
  | "REQUEST"
  | "REFUSED";

export type GetNotificationsResponse = {
  id: number;
  friendRequestId: number;
  friendName: string;
  status: NOTI_STATUS;
  read: boolean;
}[];
