import axios from "axios";

const adminApi = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/admin`,
});

// Attach token automatically
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminApi;
