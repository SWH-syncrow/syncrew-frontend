import { GroupCategory } from "@app/_types";
import axios from "axios";
import authInstance from "../axios/instance";

const getGroups = async (category: GroupCategory) => {
  try {
    const res = await axios.get(
      category === "ALL" ? `/groups` : `/groups?category=${category}`
    );

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
const enterGroup = async (groupId: number) => {
  try {
    const res = await authInstance.post(`/group/${groupId}/enter`);

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
    const res = await authInstance.get(
      `/groups/${groupId}/posts?page=${pagination.page}&limit=${pagination.limit}`
    );

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const GroupsApis = { getGroups, enterGroup, getGroupPosts };
