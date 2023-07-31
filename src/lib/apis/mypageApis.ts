import axios from "axios";

const getMyPosts = async () => {
  try {
    const res = await axios.get("/api/users/posts");

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
// const getMyGropus = async () => {
//   try {
//     const res = await axios.get("/api/users/groups");

//     return res;
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// };
const getMyGropus = async () => {
  try {
    const res = await axios.get("/api/users/groups");

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const MypageApis = { getMyPosts, getMyGropus };
