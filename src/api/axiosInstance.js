import axios from "axios";

// Get base URL from environment variable
const USER_SERVICE_BASE_URL =
  import.meta.env.VITE_USER_SERVICE_BASE_URL ||
  "http://localhost:8765/user-service/api";

const axiosInstance = axios.create({
  baseURL: USER_SERVICE_BASE_URL,
  headers: {
    "Content-Type": "application/json", // Explicitly set Content-Type for all requests
  },
  withCredentials: true, // Important for sending cookies/credentials if your backend uses them
});

// Optional: Add request interceptor for authentication tokens (JWT)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Get token from local storage or Redux state
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor for error handling (e.g., refreshing tokens, logout on 401)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: Handle 401 Unauthorized globally
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized, logging out...");
      // Dispatch logout action to Redux store
      // store.dispatch(logout()); // You'd need to import your Redux store
      // window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
