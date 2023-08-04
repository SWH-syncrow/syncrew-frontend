import { authInstance, unAuthInstance } from "../axios/instance";

const kakaoLogin = async (accessToken: string) => {
  try {
    const res = await unAuthInstance.post("/auth/login", { accessToken });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const reissueToken = async (refreshToken: string) => {
  try {
    const res = await unAuthInstance.post("/auth/reissue", {
      refreshToken,
    });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUser = async () => {
  try {
    const res = await authInstance.get("/auth/user", { withCredentials: true });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const kakaoLogout = async () => {
  try {
    const res = await authInstance.delete("/auth/logout");

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const AuthUserApis = { kakaoLogin, reissueToken, getUser, kakaoLogout };
