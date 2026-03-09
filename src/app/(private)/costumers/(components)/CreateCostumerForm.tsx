import { MultiStepForm } from "@components/MultStepForm/MultStepForm";
import { useForm } from "react-hook-form";
import { CreateCostumerFormData, createCostumerSchema } from "@/types/Schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalStep } from "./PersonalStep";
import { AddressStep } from "./AddressStep";
import { createCostumer } from "@/services/costumer.service";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { ApiError } from "@/types/Error";

interface CreateCostumerFormProps {
    closeModal: () => void;
}

export function CreateCostumerForm({ closeModal }: CreateCostumerFormProps) {

    const { showMessage } = useFlashMessage();

    const methods = useForm<CreateCostumerFormData>({
        resolver: zodResolver(createCostumerSchema),
    });

    async function onSubmit(data: CreateCostumerFormData) {
        try {
            await createCostumer(data);
            showMessage("Cliente criado com sucesso!", "success");
            closeModal();
        } catch (error) {
            console.log(error);
            if (error instanceof ApiError) {
                showMessage(`Erro ao criar cliente: ${error.message}`, "error");
            } else {
                showMessage("Erro ao criar cliente", "error");
            }
        }
    }

    const steps = [PersonalStep, AddressStep];

    return (
        <MultiStepForm steps={steps} onSubmit={onSubmit} methods={methods}/>
    )
}