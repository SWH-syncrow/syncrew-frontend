type category = "SMARTPHONE" | "PPT" | "VIDEO" | "PS";
export interface GetGroupsRequest {
  query: {
    category: category;
  };
}

export interface GetGroupsResponse {
  groups: {
    id: number;
    name: string;
    category: category;
    memberCount: number;
    postCount: number;
  }[];
}

export interface GetGroupPostsResponse {
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
    rejectedUsers?: number[];
  }[];
}
