import { routes } from "@/constants/api-routes";
import { api } from "@/lib/axios";
import { EntityPageable, Filters } from "@/types/ApiTypes";
import { ApiError } from "@/types/Error";
import { CreateRent, Rent, RentStatus } from "@/types/Rent";
import axios from "axios";

export async function createRent(data: CreateRent) {
    try {
        const response = await api.post(routes.users.rents, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            console.log(error.response.data);
            throw new ApiError(error.response.data);
        }

        throw error;
    }
}

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

export async function updateRentStatus(rentId: string, status: string): Promise<void> {
    const actionKey = Object.keys(RentStatus).find(
        (key) => RentStatus[key as keyof typeof RentStatus] === status
    );

    try {
        const response = await api.put(routes.rents.updateStatus(rentId), { action: actionKey });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            throw new ApiError(error.response.data);
        }

        throw error;
    }
}
