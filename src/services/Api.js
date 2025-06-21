import axiosInstance, { buildQueryParams } from "./AxiosInstance";
import Swal from "sweetalert2";

export const handleError = (error, context = "") => {
  const mode = import.meta.env.VITE_MODE == "development" ? true : false;
  const errorMessage =
    error?.response?.data?.message || error.message || "Something went wrong.";
  const statusCode = error?.response?.status || "Unknown Status";
  Swal.fire({
    icon: "error",
    title: `Error ${statusCode}`,
    text: errorMessage,
    footer: mode ? `Context: ${context}` : "",
  });
  console.error(`API Error in ${context}:`, JSON.stringify(error));
  throw error;
};
const get = async (controller, req) => {
  try {
    let url = `${controller}/Get/${req}`;
    url = url.replace(/&$/, "");
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    return handleError(error, `get-${controller}`);
  }
};
const getAll = async (controller, req = null, endPoint="GetAll",payload = {}) => {
  try {
    let url = `${controller}/${endPoint}`;
    url += buildQueryParams(req);
    url = url.replace(/&$/, "");
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    return handleError(error, "getAll");
  }
};
const add = async (controller, req = null,endPoint="Add", payload = {}) => {
  try {
    let url = `${controller}/${endPoint}`;
    url += buildQueryParams(req);
    url = url.replace(/&$/, "");
    const response = await axiosInstance.post(url,payload);
    return response.data;
  } catch (error) {
    return handleError(error, "update");
  }
};
const update = async (controller, req = null,endPoint="Add", payload = {}) => {
  try {
    let url = `${controller}/${endPoint}`;
    url += buildQueryParams(req);
    url = url.replace(/&$/, "");
    const response = await axiosInstance.put(url, payload);
    return response.data;
  } catch (error) {
    return handleError(error, "update");
  }
};
const remove = async (controller, req = null, payload = {}) => {
  try {
    let url = `${controller}/Delete?`;
    url += buildQueryParams(req);
    url = url.replace(/&$/, "");
    const response = await axiosInstance.delete(url, { data: payload });
    return response.data;
  } catch (error) {
    return handleError(error, "remove");
  }
};

const api = {
  get,
  getAll,
  update,
  add,
  remove,
};

export default api;
