import { authInstance } from "../axios/instance";
import { CreatePostRequest } from "./_models/PostsDto";

const createPost = async (post: CreatePostRequest) => {
  try {
    const res = await authInstance.post("/notifications", { data: post });

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
const deletePost = async (postId: number) => {
  try {
    const res = await authInstance.delete(`/posts/${postId}`);

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const PostApis = { createPost, deletePost };
