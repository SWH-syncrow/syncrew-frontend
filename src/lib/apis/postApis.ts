import { CreatePost } from "@components/modal/types";
import axios from "axios";

const createPost = async (post: CreatePost) => {
  try {
    const res = await axios.post("/api/notifications", { data: post });

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
const deletePost = async (postId: number) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const PostApis = { createPost, deletePost };
