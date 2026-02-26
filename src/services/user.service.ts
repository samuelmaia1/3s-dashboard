import { routes } from "@/constants/api-routes";
import { api } from "@/lib/axios";
import { ApiError } from "@/types/Error";
import { CreateUser } from "@/types/User";
import axios from "axios";

export async function createUser(userData: CreateUser) {
  try {
    return await api.post(routes.users.create, userData);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new ApiError(error.response.data);
    }
    throw error;
  }
}