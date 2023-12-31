export interface Channel {
  id: string;
  friendRequestId: number;
  status: "READY" | "DOING";
  chatUser: ChatUser;
  isUnread: boolean;
}

export interface ChannelsObj {
  [key: string]: Channel;
}

export interface ChatUser {
  id: string;
  username: string;
  profileImage: string | null;
  temp: number;
}

export interface Message {
  id: string;
  text: string;
  username: string;
  userId: string;
  photoURL?: string;
}
