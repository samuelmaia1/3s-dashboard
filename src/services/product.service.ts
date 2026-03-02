import { routes } from "@/constants/api-routes";
import { api } from "@/lib/axios";
import { ApiError } from "@/types/Error";
import { CreateProductFormOutput } from "@/types/Schemes";
import axios from "axios";

export async function createProduct(data: CreateProductFormOutput) {
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