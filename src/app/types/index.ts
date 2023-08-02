import { GetGroupsRequest } from "src/lib/apis/models/GroupsDto";

export type GroupCategory = "ALL" | GetGroupsRequest["query"]["category"];
export interface Group {
  id: number;
  name: string;
  memberCount: number;
  postCount: number;
}
