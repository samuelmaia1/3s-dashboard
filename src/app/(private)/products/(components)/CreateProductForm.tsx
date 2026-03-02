'use client';

import { CreateProductFormInput, CreateProductFormOutput, createProductSchema } from "@/types/Schemes";
import { MultiStepForm } from "@components/MultStepForm/MultStepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DataStep } from "./DataStep";
import { createProduct } from "@/services/product.service";
import { ApiError } from "@/types/Error";
import { useFlashMessage } from "@contexts/FlashMessageContext";

interface CreateProductFormProps {
    closeModal: () => void
}

export function CreateProductForm({closeModal}: CreateProductFormProps) {
    const { showMessage } = useFlashMessage();

    const methods = useForm<CreateProductFormInput, any, CreateProductFormOutput>({
        resolver: zodResolver(createProductSchema),
        mode: "onChange",
    });

    const steps = [DataStep]

    async function onSubmit(data: CreateProductFormOutput) {
        const isValid = await methods.trigger();

        if (!isValid) 
            return 

        try {
            await createProduct(data);
            showMessage("Produto criado com sucesso!", "success");
            closeModal();
        } catch (error) {
            if (error instanceof ApiError) {
                showMessage(`Erro ao criar produto: ${error.message}`, "error");
            }
        }
    }

    return (
        <MultiStepForm methods={methods} steps={steps} onSubmit={onSubmit}/>
    )
}