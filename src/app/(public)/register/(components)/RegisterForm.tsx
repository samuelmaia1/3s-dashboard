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
import { Text } from "@components/Text/Text";
import { createUser } from "@/services/user.service";
import { AlertProps, Snackbar } from "@mui/material";
import { Button } from "@components/Button/Button";
import { FlashMessage } from "@components/FlashMessage/FlashMessage";
import { useAuth } from "@hooks/useAuth";
import { useFlashMessage } from "@contexts/FlashMessageContext";

interface FlashMessage {
  open: boolean;
  message: string;
  severity?: AlertProps["severity"];
}

export default function RegisterForm() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { showMessage } = useFlashMessage();

  const { login } = useAuth();

  const methods = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    mode: "onChange",
  });

  async function onSubmit(data: CreateUserFormData) {
    try {
      const response = await createUser(data);

      if (response.status === 201) {
        setError(null);

        showMessage("Usuário criado com sucesso!", "success");

        await login(data.email, data.password);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.message);
        showMessage(`Erro ao criar usuário: ${error.message}`, "error");
      }
    }
  }

  return (
    <>
      <ProgressBar progress={(step / 3) * 100} color="inherit" />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {step === 0 && <PersonalStep onNext={() => setStep(1)} />}
          {step === 1 && (
            <AddressStep onNext={() => setStep(2)} onBack={() => setStep(0)} />
          )}
          {(step === 2 || step === 3) && (
            <CompanyStep
              onBack={() => setStep(1)}
              onCreate={() => setStep(3)}
            />
          )}
        </form>
      </FormProvider>
      {error && (
        <Text
          variant="body2"
          color="error.main"
          style={{ textAlign: "center", marginTop: 24 }}
        >
          {error}
        </Text>
      )}
    </>
  );
}
