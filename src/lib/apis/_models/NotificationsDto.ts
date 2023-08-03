export type NOTI_STATUS =
  | "REQUESTED"
  | "ACCEPT"
  | "REFUSE"
  | "REQUEST"
  | "ACCEPTED"
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
