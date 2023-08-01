import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "" : "",
});
instance.interceptors.response.use(
  (response) => {
    /*
        http status가 200인 경우
        응답 성공 직전 호출됩니다.
        .then() 으로 이어집니다.
    */

    return response;
  },

  (error) => {
    if(error.code === 401){
      
    }
    return Promise.reject(error);
  }
);

export default instance;
