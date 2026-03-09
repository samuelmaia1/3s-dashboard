'use client';

import { UpdateProductFormInput, UpdateProductFormOutput, updateProductSchema } from "@/types/Schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DataStep } from "../../(components)/DataStep";
import { MultiStepForm } from "@components/MultStepForm/MultStepForm";
import { updateProduct } from "@/services/product.service";
import { Product } from "@/types/Product";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { ApiError } from "@/types/Error";

interface EditProductFormProps {
    id: string;
    onUpdated: (data: Product) => void
}

export function EditProductForm({ id, onUpdated }: EditProductFormProps) {
    const { showMessage } = useFlashMessage();

    const methods = useForm<UpdateProductFormInput, any, UpdateProductFormOutput>({
        resolver: zodResolver(updateProductSchema),
        mode: "onChange",
    })

    const steps = [DataStep];

    async function onSubmit(data: UpdateProductFormOutput) {
        try {
            const response = await updateProduct(data, id);
            onUpdated(response);
        } catch (error) {
            if (error instanceof ApiError) {
                showMessage(`Erro ao atualizar produto: ${error.message}`, "error");
            } else {
                showMessage("Erro ao atualizar produto", "error");
            }
        }
    }

    return (
        <MultiStepForm
            methods={methods}
            steps={steps}
            onSubmit={onSubmit}
        />
    )
}