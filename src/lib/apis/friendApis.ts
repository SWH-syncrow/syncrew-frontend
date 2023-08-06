import { authInstance } from "../axios/instance";

const requestFriend = async ({ userId, postId }: RequestFriendRequest) => {
  try {
    const res = await authInstance.post("/friend/request", {
      userId,
      postId,
    });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const acceptFriend = async ({
  friendRequestId,
  notificationId,
}: PostFriendRequest) => {
  try {
    const res = await authInstance.post("/friend/accept", {
      friendRequestId,
      notificationId,
    });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const refuseFriend = async ({
  friendRequestId,
  notificationId,
}: PostFriendRequest) => {
  try {
    const res = await authInstance.post("/friend/refuse", {
      friendRequestId,
      notificationId,
    });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const FriendApis = { requestFriend, acceptFriend, refuseFriend };
