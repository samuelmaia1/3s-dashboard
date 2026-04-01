'use client';

import { RHFInput } from "@components/RHFInput/RHFInput";
import { maskCurrency } from "@/formatter";
import { Box } from "@mui/material";
import { Button } from "@components/Button/Button";
import { useFormContext } from "react-hook-form";

export function DataStep() {

    const {formState} = useFormContext();

  return (
    <>
      <RHFInput name="name" label="Nome" />
      <RHFInput name="description" label="Descrição" />
      <RHFInput name="price" label="Preço" mask={maskCurrency}/>
      <RHFInput name="stock" label="Estoque" type="number"/>

      <Box sx={{mt: 4}}/>

      <Button fullWidth type="submit" loading={formState.isSubmitting}>Confirmar alterações</Button>
    </>
  );
}
