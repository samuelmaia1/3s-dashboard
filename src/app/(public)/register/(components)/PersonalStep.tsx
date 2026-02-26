import { RHFInput } from "@components/RHFInput/RHFInput";
import { useFormContext } from "react-hook-form";
import { ButtonContainer } from "./style";
import { Button } from "@components/Button/Button";
import { maskCpf } from "@/formatter";
import { useState } from "react";

export function PersonalStep({ onNext }: { onNext: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const { trigger } = useFormContext();

  async function handleNext() {
    const valid = await trigger([
      "name",
      "lastName",
      "email",
      "cpf",
      "password",
    ]);

    if (valid) onNext();
  }

  return (
    <>
      <RHFInput name="name" label="Nome" />
      <RHFInput name="lastName" label="Sobrenome" />
      <RHFInput name="email" label="E-mail" type="email" />
      <RHFInput name="cpf" label="CPF" mask={maskCpf}/>
      <RHFInput 
        name="password" 
        label="Senha" 
        type={showPassword ? "text" : "password"}
        secure 
        endIcon={showPassword ? "eye-off" : "eye"} 
        onEndIconClick={() => setShowPassword(!showPassword)}
      />

      <ButtonContainer>
        <Button onClick={handleNext} variant="filled" color="primary" shape="square" icon="arrow-right" />
      </ButtonContainer>
    </>
  );
}