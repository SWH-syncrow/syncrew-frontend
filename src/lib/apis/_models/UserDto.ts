export interface GetUserPostsResponse {
  posts: {
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
  posts: {
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

export interface GetUserGroupsResponse {
  id: number;
  name: string;
  category: "SMARTPHONE" | "PPT" | "VIDEO" | "PS";
  memberCount: number;
  postCount: number;
}
[];
