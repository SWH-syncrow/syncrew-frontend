import { GetGroupsRequest } from "src/lib/apis/_models/GroupsDto";

export type GroupCategory = "ALL" | GetGroupsRequest["query"]["category"];
export interface Group {
  id: number;
  name: string;
  memberCount: number;
  postCount: number;
}
