"use client";

import { CreateUserFormData, createUserSchema } from "@/types/Schemes";
import { ProgressBar } from "@components/ProgressBar/ProgressBar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PersonalStep } from "./PersonalStep";
import { AddressStep } from "./AddressStep";
import { CompanyStep } from "./CompanyStep";
import { ApiError } from "@/types/Error";
import { api } from "@/lib/axios";
import { routes } from "@/constants/api-routes";
import { Text } from "@components/Text/Text";
import { createUser } from "@/services/user.service";

export default function RegisterForm() {
    const [step, setStep] = useState(1);
    const [error, setError] = useState<string | null>(null);

    const methods = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserSchema),
        mode: "onChange",
    })
  
    async function onSubmit(data: CreateUserFormData) {
        try {
            const response = await createUser(data);
            console.log(response);
            if (response.status === 201) {
                setError(null);
            }
        } catch (error) {
            if (error instanceof ApiError) {
                setError(error.message);
            }
            console.error(error);
        }
    }

  return (
    <>
        <ProgressBar progress={(step / 3) * 100} color="success"/>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {step === 1 && <PersonalStep onNext={() => setStep(2)} />}
                {step === 2 && <AddressStep onNext={() => setStep(3)} onBack={() => setStep(1)} />}
                {step === 3 && <CompanyStep onBack={() => setStep(2)} />}
            </form>
        </FormProvider>
        {error && 
            <Text 
                variant="body2" 
                color="error.main" 
                style={{textAlign: 'center', marginTop: 24}}
            >
                {error}
            </Text>
        }
    </>
  );
}