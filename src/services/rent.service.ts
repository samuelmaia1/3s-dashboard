import { routes } from "@/constants/api-routes";
import { api } from "@/lib/axios";
import { EntityPageable, Filters } from "@/types/ApiTypes";
import { ApiError } from "@/types/Error";
import { Rent } from "@/types/Rent";
import axios from "axios";

export async function getRents(params?: Filters): Promise<EntityPageable<Rent>> {
    try {
        const response = await api.get(routes.users.rents, {params});
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            throw new ApiError(error.response.data);
        }

        throw error;
    }
}