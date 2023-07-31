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

export const GroupsApis = { getGroups };
