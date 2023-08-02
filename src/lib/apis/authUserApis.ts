import axios from "axios";
import authInstance from "../axios/instance";

const kakaoLogin = async (accessToken: string) => {
  try {
    const res = await axios.post("/auth/login", { accessToken });

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
const reissueToken = async (refreshToken: string) => {
  try {
    const res = await axios.post("/auth/reissue", { refreshToken });

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getUser = async () => {
  try {
    const res = await axios.get("/auth/user");

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
const kakaoLogout = async () => {
  try {
    const res = await authInstance.delete("/auth/logout");

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const AuthUserApis = { kakaoLogin, reissueToken, getUser, kakaoLogout };
