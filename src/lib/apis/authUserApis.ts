const refreshToken = async () => {
  try {
    const res = { access_token: "test", refresh_token: "test2" };
    // const res = await axios.post();

    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const AuthUserApis = { refreshToken };
