export interface Post {
  id: number;
  title: string;
  content: string;
  writer: {
    id: number;
    username: string;
    profileImage?: string;
    temp: number;
  };
  rejectedUsers: number[];
}
