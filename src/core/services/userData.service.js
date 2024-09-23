import url from "../configs/index";
export const GetUserAmount = async (token) => {
  try {
    let response = await url.get(`/payment/totalRecievedAmount`);

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
