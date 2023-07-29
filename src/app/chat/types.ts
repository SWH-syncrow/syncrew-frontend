export interface Channel {
  id: string;
  status: "READY" | "DOING";
  chatUser: ChatUser;
}

export interface ChatUser {
  id: string;
  username: string;
  profileImage?: string;
  temp: number;
}

export interface Message {
  id: string;
  text: string;
  username: string;
  userId: string;
  photoURL?: string;
}
