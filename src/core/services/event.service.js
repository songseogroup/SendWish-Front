import url from "../configs/index";

export const CreateEvent = async (data) => {
  try {
    let response = await url.post("/events", data);
    let responsebody = {
      data: response.data,
      status: response.status,
    };
    return responsebody;
  } catch (error) {
    let responsebody = {
      data: error.response.data,
      status: error.response.status,
    };
    throw responsebody;
  }
};
export const UpdateEvent = async ({data,id}) => {
  try {
    let response = await url.patch(`/events/${id}`, data);
    let responsebody = {
      data: response.data,
      status: response.status,
    };
    return responsebody;
  } catch (error) {
    let responsebody = {
      data: error.response.data,
      status: error.response.status,
    };
    throw responsebody;
  }
};
export const GetUserEvent = async () => {
  try {
    let response = await url.get("/events/myevents");
    let responsebody = {
      data: response.data,
      status: response.status,
    };
    return responsebody;
  } catch (error) {
    let responsebody = {
      data: error.response.data,
      status: error.response.status,
    };
    throw responsebody;
  }
};
export const GetEventById = async (id) => {
  try {
    let response = await url.get(`/events/${id}`);
   
    let responsebody = {
      data: response.data.data,
      status: response.status,
    };
    return responsebody;
  } catch (error) {
    let responsebody = {
      data: error.response.data,
      status: error.response.status,
    };
    throw responsebody;
  }
};
export const DeletEvent = async (id) => {
  try {
    let response = await url.defaults(`/events/${id}`);
    let responsebody = {
      data: response.data,
      status: response.status,
    };
    return responsebody;
  } catch (error) {
    let responsebody = {
      data: error.response.data,
      status: error.response.status,
    };
    throw responsebody;
  }
};
export const createPaymentIntent = async (id,data) => {
  try {
    let response = await url.put(`/events/createPaymentIntent/${id}`, data);
    let responsebody = {
      data: response.data,
      status: response.status,
    };
    return responsebody;
  } catch (error) {
    let responsebody = {
      data: error.response.data,
      status: error.response.status,
    };
    throw responsebody;
  }
}

export const PaymentComplete = async (data) => {
  try {
    let response = await url.post("/payment", data);
    let responsebody = {
      data: response.data,
      status: response.status,
    };
    return responsebody;
  } catch (error) {
    let responsebody = {
      data: error.response.data,
      status: error.response.status,
    };
    throw responsebody;
  }
};