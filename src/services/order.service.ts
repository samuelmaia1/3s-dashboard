import { routes } from "@/constants/api-routes";
import { api } from "@/lib/axios";
import { ApiError } from "@/types/Error";
import { CreateOrder } from "@/types/Order";
import axios from "axios";

export async function createOrder(data: CreateOrder) {
    try {
        const response = await api.post(routes.users.orders, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            throw new ApiError(error.response.data);
        }
    }
}