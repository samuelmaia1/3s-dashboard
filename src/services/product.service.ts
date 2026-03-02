import { routes } from "@/constants/api-routes";
import { api } from "@/lib/axios";
import { ApiError } from "@/types/Error";
import { ProductPageable } from "@/types/Product";
import { CreateProductFormOutput } from "@/types/Schemes";
import axios from "axios";

export async function createProduct(data: CreateProductFormOutput): Promise<void> {
    const princeInCents = Number(data.price)

    const price = princeInCents / 100

    const productToCreate = {
        name: data.name,
        description: data.description,
        price,
        stock: data.stock,
    }

    try {
        await api.post(routes.users.products, productToCreate);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            throw new ApiError(error.response.data);
        }
    }
}

export async function getProducts(): Promise<ProductPageable> {
    try {
        const response = await api.get(routes.users.products);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            throw new ApiError(error.response.data);
        }

        throw error;
    }
}