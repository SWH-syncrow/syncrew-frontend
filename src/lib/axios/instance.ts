import axios from "axios";

export const authInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

authInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response.data.status === 401)
      return window.location.replace("/login");
    return Promise.reject(error);
  }
);

export const unAuthInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
