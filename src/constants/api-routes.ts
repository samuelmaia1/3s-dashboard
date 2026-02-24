import { get } from "http";

export const routes = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  users: {
    list: "/users",
    create: "/users/create", 
    get: "/users",       
  },
  dashboard: {
    summary: "/dashboard/summary",
  }
}