import url from "../configs/index";

export const UserSignin = async (data) => {
  try {
    let response = await url.post("/auth/login/", data);
    let responsebody={
      data:response.data,
      status:response.status
    }
    return responsebody;
   
  } catch (error) {
    let responsebody={
      data:error.response.data,
      status:error.response.status
    }
    throw responsebody;
  }
};
export const UserSignup = async (data) => {
    try {
      let response = await url.post("/auth/sign-up", data);
      let responsebody={
        data:response.data,
        status:response.status
      }
      return responsebody;
    } catch (error) {
      throw error;
    }
  };

  export const ForgetPassword = async (data) => {
    try {
      let response = await url.post("/auth/forgot-password", data);
      let responsebody={
        data:response.data,
        status:response.status
      }
      return responsebody;
    } catch (error) {
      throw error;
    }
  };

  export const UpdatePasswords = async (data) => {
    const token = localStorage.getItem("Token");

    try {
      let response = await url.post("/auth/update-password", data, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      let responsebody={
        data:response.data,
        status:response.status
      }
      return responsebody;
    } catch (error) {
      throw error;
    }
  };

  export const UserSignupVerify = async (token) => {
    try {
      let response = await url.get("/auth/sign-up/confirm", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      let responsebody={
        data:response.data,
        status:response.status
      }
      return responsebody;
    } catch (error) {
      throw error;
    }
  };
