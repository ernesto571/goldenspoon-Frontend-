import axiosLib from "axios";

const axios = axiosLib.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:5000/api"
    : "https://goldenspoon-backend.onrender.com/api",
  withCredentials: true
});

axios.interceptors.request.use(async (config) => {
  const token = await window.Clerk?.session?.getToken({
    template: "backend"
  });

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    };
  }

  return config;
});


axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ Request error:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });

    return Promise.reject(error);
  }
);

export default axios;
