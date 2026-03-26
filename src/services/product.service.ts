import { routes } from "@/constants/api-routes";
import { api } from "@/lib/axios";
import { Filters } from "@/types/ApiTypes";
import { ApiError } from "@/types/Error";
import { Product, ProductPageable } from "@/types/Product";
import { ProductFormOutput, UpdateProductFormOutput } from "@/types/Schemes";
import axios from "axios";

export async function createProduct(data: ProductFormOutput): Promise<void> {
  const priceInCents = Number(data.price);
  const price = priceInCents / 100;

  const productToCreate = {
    name: data.name,
    description: data.description,
    price,
    stock: data.stock,
    imageUri: data.imageUri ?? null,
  };

  try {
    await api.post(routes.users.products, productToCreate);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new ApiError(error.response.data);
    }
  }
}

export async function getProducts(params?: Filters): Promise<ProductPageable> {
    try {
        const response = await api.get(routes.users.products, {
            params
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            throw new ApiError(error.response.data);
        }

        throw error;
    }
}

export async function getProductById(id: string): Promise<Product> {
    try {
        const response = await api.get(`${routes.product.get}/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data) {
            throw new ApiError(error.response.data);
        }

        throw error;
    }
}

 export async function deleteProduct(id: string) {
    try {
      await api.delete(`${routes.product.delete}/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new ApiError(error.response.data);
      }
    }
}

export async function updateProduct(product: UpdateProductFormOutput, id: string): Promise<Product> {
    try {
       const payload = {
            ...product,
            price: product.price ? Number(product.price) / 100 : undefined
        };
        const response = await api.put(`${routes.product.update}/${id}`, payload);
        return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw new ApiError(error.response.data);
      }

      throw error;
    }
}

export async function uploadProductImage(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary não configurado corretamente.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await api.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      {
        baseURL: "", 
        withCredentials: false,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data.secure_url as string;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new ApiError(error.response.data);
    }
    throw error;
  }
}