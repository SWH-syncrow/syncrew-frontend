import axios from "axios";

export const authInstance = axios.create({
  baseURL:
    "http://ec2-15-164-169-130.ap-northeast-2.compute.amazonaws.com:8080/api",
});
authInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.code === 401) {
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export const unAuthInstance = axios.create({
  baseURL:
    "http://ec2-15-164-169-130.ap-northeast-2.compute.amazonaws.com:8080/api",
});
