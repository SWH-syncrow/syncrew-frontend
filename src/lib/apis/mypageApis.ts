import { authInstance } from "../axios/instance";

const getMyPosts = async () => {
  try {
    const res = await authInstance.get("/user/posts");

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getMyRequestPosts = async () => {
  try {
    const res = await authInstance.get("/user/posts?status=ACCEPTED");

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getMyGropus = async () => {
  try {
    const res = await authInstance.get("/user/groups");

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const MypageApis = { getMyPosts, getMyRequestPosts, getMyGropus };
