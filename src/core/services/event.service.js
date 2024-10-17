import url from "../configs/index";

export const CreateEvent = async (data) => {
  const token = localStorage.getItem("Token");

  try {
    let response = await url.post("/events", data, {
      headers: {
        Authorization: ` ${token}`, 
      },
    });
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
export const UpdateEvent = async (data,id) => {
  const token = localStorage.getItem("Token");
  console.log("moieeen",data)
  try {
    let response = await url.patch(`/events/${id}`, data, {
      headers: {
        Authorization: ` ${token}`, 
      },
    });
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
  const token = localStorage.getItem("Token");

  try {
    let response = await url.get("/events/myevents", {
      headers: {
        Authorization: ` ${token}`,  // Sending token as  token
      },
    });
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
  const token = localStorage.getItem("Token");

  try {
    let response = await url.get(`/events/${id}`, {
      headers: {
        Authorization: ` ${token}`,  // Sending token as  token
      },
    });
   
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
export const DeleteEvent = async (id) => {
  const token = localStorage.getItem("Token");

  try {
    let response = await url.delete(`/events/${id}`, {
      headers: {
        Authorization: `${token}`,  // Sending token as  token
      },
    });
    let responsebody = {
      data: response.data,
      status: response.status,
    };
    return responsebody;
  } catch (error) {
    let responsebody = {
      data: error,
    };
    throw responsebody;
  }
};
export const createPaymentIntent = async (id,data) => {
  const token = localStorage.getItem("Token");

  try {
    let response = await url.put(`/events/createPaymentIntent/${id}`, data, {
      headers: {
        Authorization: ` ${token}`, 
      },
    });
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
  const token = localStorage.getItem("Token");

  try {
    let response = await url.post("/payment", data, {
      headers: {
        Authorization: ` ${token}`, 
      },
    });
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