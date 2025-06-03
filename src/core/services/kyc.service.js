import url from "../configs/index";

export const checkKycStatus = async (stripeAccountId) => {
  const token = localStorage.getItem("Token");

  try {
    let response = await url.get(`/stripe/check-kyc/${stripeAccountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let responsebody = {
      data: response.data,
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