import { routes } from "@/constants/api-routes";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 403 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes(routes.auth.refresh)
    ) {
      originalRequest._retry = true;

      try {
        await api.post(routes.auth.refresh);
        return api(originalRequest);
      } catch(error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);