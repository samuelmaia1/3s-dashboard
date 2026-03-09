import { RHFInput } from "@components/RHFInput/RHFInput";
import { useFormContext } from "react-hook-form";
import { ButtonContainer } from "./style";
import { maskCpf } from "@/formatter";
import { Fab } from "@components/Fab/Fab";

export function PersonalStep({ onNext }: { onNext: () => void }) {
  const { trigger } = useFormContext();

  async function handleNext() {
    const valid = await trigger([
      "name",
      "lastName",
      "email",
      "cpf",
    ]);

    if (valid) onNext();
  }

  return (
    <>
      <RHFInput name="name" label="Nome" />
      <RHFInput name="lastName" label="Sobrenome" />
      <RHFInput name="email" label="E-mail" type="email" />
      <RHFInput name="cpf" label="CPF" mask={maskCpf}/>

      <ButtonContainer>
        <Fab icon="arrow-right" onClick={handleNext} />
      </ButtonContainer>
    </>
  );
}