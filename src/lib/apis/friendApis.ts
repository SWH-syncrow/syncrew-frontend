import axios from "axios";

const requestFriend = async ({
  userId,
  postId,
}: {
  userId: number;
  postId: number;
}) => {
  try {
    const res = await axios.post("/api/friend/request", {
      data: { userId, postId },
    });

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const acceptFriend = async (friendRequestId: number) => {
  try {
    const res = await axios.post("/api/friend?q=accept", {
      data: { friendRequestId },
    });

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const rejectFriend = async (friendRequestId: number) => {
  try {
    const res = await axios.post("/api/friend?q=refuse", {
      data: { friendRequestId },
    });

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const FriendApis = { requestFriend, acceptFriend, rejectFriend };
