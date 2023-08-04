import { authInstance } from "../axios/instance";

const getNotifications = async () => {
  try {
    const res = await authInstance.get("/notifications");

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const readNotifications = async (ids: number[]) => {
  try {
    const res = await authInstance.put(`/notifications?ids=${ids.join(",")}`);

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const NotiApis = { getNotifications, readNotifications };
