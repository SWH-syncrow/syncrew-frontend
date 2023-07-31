import axios from "axios";

const kakaoLogin = async (accessToken: string) => {
  try {
    const res = await axios.post("api/auth/login", { accessToken });

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
const reissueToken = async (refreshToken: string) => {
  try {
    const res = await axios.post("api/auth/reissue", { refreshToken });

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const getUser = async () => {
  try {
    const res = await axios.get("api/auth/user");

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
const kakaoLogout = async () => {
  try {
    const res = await axios.delete("api/auth/logout");

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};
export const AuthUserApis = { kakaoLogin, reissueToken, getUser, kakaoLogout };
