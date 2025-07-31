// src/api/propertyAxios.js
import axios from "axios";

const PROPERTY_SERVICE_BASE_URL =
  import.meta.env.VITE_PROPERTY_SERVICE_BASE_URL || "http://localhost:8081/api";

const propertyAxios = axios.create({
  baseURL: PROPERTY_SERVICE_BASE_URL,

  withCredentials: true,
});

propertyAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

propertyAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized – maybe redirect to login");
    }
    return Promise.reject(error);
  }
);

export default propertyAxios;
