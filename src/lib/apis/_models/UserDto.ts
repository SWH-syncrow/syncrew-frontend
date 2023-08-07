export interface GetUserPostsResponse {
  content: {
    id: number;
    title: string;
    content: string;
    writer: {
      id: number;
      username: string;
      profileImage: null | string;
      temp: number;
    };
  }[];
}

export interface GetUserRequestsResponse {
  content: {
    id: number;
    title: string;
    content: string;
    writer: {
      id: number;
      username: string;
      profileImage: null | string;
      temp: number;
    };
  }[];
}

export type GetUserGroupsResponse = {
  id: number;
  name: string;
  category: "SMARTPHONE" | "PPT" | "VIDEO" | "PS";
  memberCount: number;
  postCount: number;
}[];
