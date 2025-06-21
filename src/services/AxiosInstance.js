import axios from "axios";

import { store } from "../store/store";
import CryptoService from "../helpers/CryptoService";

const reqEncrpytion = import.meta.env.VITE_REQ_ENCRYPTION || true;
const apiUrl = import.meta.env.VITE_API_URL+'api';

export const buildQueryParams = (data) => {
  if (!data) return '';
  if (reqEncrpytion=="true") {
    const encryptedData = CryptoService.encryptForUrl(data);
    return `?baseData=${encryptedData}`;
  }
  const params = new URLSearchParams();
  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined) {
      params.append(key, data[key]);
    }
  });
  return `?${params.toString()}`;
};

const axiosInstance = axios.create({
  baseURL: apiUrl,
});
axiosInstance.interceptors.request.use(async (config) => {
  const state = store.getState();
  const token = state.token.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const fcmtoken = localStorage.getItem('fcmtoken');
  if (fcmtoken) {
    config.headers['fcm'] = fcmtoken;
  }

  return config;
});
export default axiosInstance;

