import { authInstance } from "../axios/instance";

const requestFriend = async ({ userId, postId }: RequestFriendRequest) => {
  try {
    const res = await authInstance.post("/friend/request", {
      data: { userId, postId },
    });

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const acceptFriend = async ({
  friendRequestId,
  notificationId,
}: PostFriendRequest) => {
  try {
    const res = await authInstance.post("/friend?q=accept", {
      data: { friendRequestId, notificationId },
    });

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const refuseFriend = async ({
  friendRequestId,
  notificationId,
}: PostFriendRequest) => {
  try {
    const res = await authInstance.post("/friend?q=refuse", {
      data: { friendRequestId, notificationId },
    });

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const FriendApis = { requestFriend, acceptFriend, refuseFriend };
