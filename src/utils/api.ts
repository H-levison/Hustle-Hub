//api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Flask backend port
  headers: {
    "Content-Type": "application/json"
  }
});

// Add auth interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;