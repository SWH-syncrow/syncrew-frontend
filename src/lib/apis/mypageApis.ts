import { authInstance } from "../axios/instance";

const getMyPosts = async () => {
  try {
    const res = await authInstance.get("/users/posts");

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
// const getMyGropus = async () => {
//   try {
//     const res = await authInstance.get("/users/groups");

//     return res;
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// };
const getMyGropus = async () => {
  try {
    const res = await authInstance.get("/users/groups");

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const MypageApis = { getMyPosts, getMyGropus };
