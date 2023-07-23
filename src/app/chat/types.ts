export interface Channel {
  id: string;
  status: "READY" | "DOING";
  chatUser: ChatUser;
}

export interface ChatUser {
  id: string;
  userName: string;
}

export interface Message {
  id: string;
  text: string;
  userName: string;
  userId: string;
}
