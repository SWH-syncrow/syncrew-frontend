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
    if (error.response.status === 401 || error.response.status === 403) {
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export const unAuthInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
