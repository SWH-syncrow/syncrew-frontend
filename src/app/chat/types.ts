export interface Channel {
  id: string;
  status: "READY" | "DOING";
  chatUser: ChatUser;
}

export interface ChatUser {
  id: string;
  userName: string;
  profileURL?: string;
  temp: number;
}

export interface Message {
  id: string;
  text: string;
  userName: string;
  userId: string;
  photoURL?: string;
}
