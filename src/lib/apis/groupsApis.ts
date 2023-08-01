import { GroupCategory } from "@app/types";
import axios from "axios";

const getGroups = async (category: GroupCategory) => {
  try {
    const res = await axios.get(
      category === "ALL" ? `/api/groups` : `/api/groups?category=${category}`
    );

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
const enterGroup = async (groupId: number) => {
  try {
    const res = await axios.post(`/api/group/${groupId}/enter`);

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getGroupPosts = async ({
  groupId,
  pagination,
}: {
  groupId: number;
  pagination: { page: number; limit: number };
}) => {
  try {
    const res = await axios.get(
      `/api/groups/${groupId}/posts?page=${pagination.page}&limit=${pagination.limit}`
    );

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const GroupsApis = { getGroups, enterGroup, getGroupPosts };
