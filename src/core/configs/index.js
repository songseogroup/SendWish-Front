import axios from "axios";
export const FrontendUrl = import.meta.env.VITE_APP_FRONTEND_URL;
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});
export const setAuthToken = (accessToken, refreshToken) => {
  try {
    let Accesstoken = accessToken || localStorage.getItem("Token");
    let Refreshtoken = refreshToken || localStorage.getItem("RefreshToken");


    if (accessToken !== null && accessToken !== undefined) {
      Accesstoken = accessToken;
      console.log("moin undefined ha")
    } else {
      Accesstoken = localStorage.getItem("Token");
    }
    if (refreshToken !== null && refreshToken !== undefined) {
      
      console.log("moin refresh token ha")
      Refreshtoken = refreshToken;
    } else {
      Refreshtoken = localStorage.getItem("RefreshToken");
      
      console.log("moin refresh uthaya ha")
    }

    if (Accesstoken) {
      instance.defaults.headers.common["Authorization"] = ` ${Accesstoken}`;
      instance.defaults.headers.common["refresh"] = `${Refreshtoken}`;
    } else {
      delete instance.defaults.headers.common["Authorization"];
      delete instance.defaults.headers.common["refresh"];
    }
  } catch (e) {}
};

setAuthToken();

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401)
    ) {
      const token = localStorage.getItem("Token");

      // if (token) {
      //   localStorage.clear();
      //   window.location.href = "/signin";
      // }
    }
    return Promise.reject(error);
  }
);

export default instance;
