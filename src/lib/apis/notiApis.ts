import axios from "axios";

const getNotifications = async () => {
  try {
    const res = await axios.get("/api/notifications");

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const NotiApis = { getNotifications };
