import axios from "axios";

const getToken = async (queryString: string) => {
  try {
    const res = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      queryString,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    return res;
  } catch (error) {
    console.error(error);
    return { attributes: undefined };
  }
};

export const KakaoAuth = { getToken };
