import url from "../configs/index";
export const GetUserAmount = async () => {
  const token = localStorage.getItem("Token");

  try {
      let response = await url.get(`/payment/totalRecievedAmount`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Sending token as Bearer token
      },
    });
    let responsebody = {
      data: response.data.data,
      status: response.status,
    };
    return responsebody;
  } catch (error) {
    let responsebody = {
      data: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    };
    throw responsebody;
  }
};
