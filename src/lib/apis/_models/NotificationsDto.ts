export type NOTI_STATUS =
  | "REQUESTED"
  | "ACCEPT"
  | "ACCEPTED"
  | "REFUSE"
  | "REQUEST"
  | "REFUSED";

export interface GetNotificationsResponse {
  notifications: {
    id: number;
    friendRequestId: number;
    friendName: string;
    status: NOTI_STATUS;
    read: boolean;
  }[];
}
