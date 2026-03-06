import { routes } from "@/constants/api-routes";
import { api } from "@/lib/axios";
import { CostumerPageable } from "@/types/Costumer";
import { ApiError } from "@/types/Error";
import axios from "axios";

interface Filters {
  page: number;
  size: number;
  sort: string;
  name?: string;
}

export async function getCostumers(filters: Filters): Promise<CostumerPageable> {
    try {
        const response = await api.get(routes.users.costumers, {
            params: filters
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            throw new ApiError(error.response.data);
        }

        throw error;
    }
}