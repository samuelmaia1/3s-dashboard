import { MultiStepForm } from "@components/MultStepForm/MultStepForm";
import { useForm } from "react-hook-form";
import { CreateCostumerFormData, createCostumerSchema } from "@/types/Schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalStep } from "./PersonalStep";
import { AddressStep } from "./AddressStep";
import { createCostumer } from "@/services/costumer.service";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import { ApiError } from "@/types/Error";
import { useState } from "react";

interface CreateCostumerFormProps {
    closeModal: () => void;
}

const fieldStep: Partial<Record<keyof CreateCostumerFormData, number>> = {
    email: 0,
    cpf: 0
};

export function CreateCostumerForm({ closeModal }: CreateCostumerFormProps) {
    const [step, setStep] = useState(0);

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
            if (error instanceof ApiError) {
                if (error.fields) {
                    let earliestStep = Infinity;

                    Object.entries(error.fields).forEach(([field, message]) => {
                        methods.setError(field as any, { message });

                        const stepIndex = fieldStep[field as keyof CreateCostumerFormData];

                        if (stepIndex !== undefined && stepIndex < earliestStep) {
                            earliestStep = stepIndex;
                        }
                    });

                    if (earliestStep !== Infinity) {
                        setStep(earliestStep);
                    }
                }
            } 

            showMessage("Erro ao criar cliente", "error");
        }
    }

    const steps = [PersonalStep, AddressStep];

    return (
        <MultiStepForm steps={steps} onSubmit={onSubmit} methods={methods} currentStep={step} setCurrentStep={setStep}/>
    )
}