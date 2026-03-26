import { routes } from "@/constants/api-routes";
import { api } from "@/lib/axios";
import { Filters } from "@/types/ApiTypes";
import { CostumerPageable, CreateCostumer } from "@/types/Costumer";
import { ApiError } from "@/types/Error";
import axios from "axios";

export async function getCostumers(filters?: Filters): Promise<CostumerPageable> {
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

export async function createCostumer(data: CreateCostumer) {
    try {
        const response = await api.post(routes.costumers.create, data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            throw new ApiError(error.response.data);
        } else {
            throw error;
        }
    }
}

export async function getCostumerById(id: string) {
    try {
        const url = `${routes.costumers.getById}/${id}`;
        console.log("URL para buscar cliente por ID:", url);
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            console.error("Erro ao buscar cliente por ID:", error.response.data);
            const message = error.response?.data?.message || "Erro desconhecido na API";
            throw new Error(message);
        } else {
            throw error;
        }
    }
}