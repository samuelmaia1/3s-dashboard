import { routes } from "@/constants/api-routes";
import { api } from "@/lib/axios";
import { EntityPageable, RentFilters } from "@/types/ApiTypes";
import { ApiError } from "@/types/Error";
import { CreateRent, Rent, RentStatus } from "@/types/Rent";
import axios from "axios";

export async function createRent(data: CreateRent) {
    try {
        const response = await api.post(routes.users.rents, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            throw new ApiError(error.response.data);
        }

        throw error;
    }
}

export async function getRents(params?: RentFilters): Promise<EntityPageable<Rent>> {
    try {
        const response = await api.get(routes.users.rents, {
            params: normalizeRentFilters(params),
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            throw new ApiError(error.response.data);
        }

        throw error;
    }
}

function normalizeRentFilters(filters?: RentFilters) {
    if (!filters) return filters;

    const { deliveryDate, returnDate, status, ...rest } = filters;

    return {
        ...rest,
        status: toRentStatusKey(status),
        deliveryDateFrom: toStartOfDayIso(deliveryDate),
        deliveryDateTo: toEndOfDayIso(deliveryDate),
        returnDateFrom: toStartOfDayIso(returnDate),
        returnDateTo: toEndOfDayIso(returnDate),
    };
}

function toRentStatusKey(status?: string) {
    if (!status) return undefined;

    return Object.keys(RentStatus).find(
        (key) => RentStatus[key as keyof typeof RentStatus] === status
    );
}

function toStartOfDayIso(value?: string) {
    if (!value) return undefined;

    return new Date(`${value}T00:00:00`).toISOString();
}

function toEndOfDayIso(value?: string) {
    if (!value) return undefined;

    return new Date(`${value}T23:59:59.999`).toISOString();
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
