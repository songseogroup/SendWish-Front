import url from "../configs/index";

export const EventGifts = async (id) => {
  try {
    let response = await url.get(`/events/${id}/list-payments`);

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


export const GiftDetails = async (id) => {
  try {
    let response = await url.get(`/payment/${id}/event-details`);

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