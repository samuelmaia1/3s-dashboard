'use client';

import { RHFInput } from "@components/RHFInput/RHFInput";
import { ButtonContainer, ButtonWrapper } from "./style";
import { Fab } from "@components/Fab/Fab";
import { FormStepProps } from "@/types/Interfaces";
import { useFormContext } from "react-hook-form";
import { maskCurrency } from "@/formatter";
import { Button } from "@components/Button/Button";
import { Box } from "@mui/material";

export function DataStep({
  onBack,
  onNext
}: FormStepProps) {

  const { formState } = useFormContext();

  return (
    <>
      <RHFInput name="name" label="Nome" />
      <RHFInput name="description" label="Descrição" />
      <RHFInput name="price" label="Preço" mask={maskCurrency}/>
      <RHFInput name="stock" label="Estoque" type="number"/>

      <Box sx={{mt: 4}}/>

      <Button fullWidth type="submit" loading={formState.isSubmitting} icon="check">
        Confirmar
      </Button>
    </>
  );
}
