interface RequestFriendRequest {
  userId: number;
  postId: number;
}

interface PostFriendRequest {
  friendRequestId: number;
  notificationId?: number;
}
