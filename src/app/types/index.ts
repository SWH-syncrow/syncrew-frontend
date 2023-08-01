export interface User {
  id: number;
  username: string;
  email: string;
  profileImage?: string;
  temp: number;
  isTestTarget?: boolean;
}
export type GroupCategory = "ALL" | "SMARTPHONE" | "PPT" | "VIDEO" | "PS";
export interface Group {
  id: number;
  name: string;
  memberCount: number;
  postCount: number;
}
