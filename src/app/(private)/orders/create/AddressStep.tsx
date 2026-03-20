import { RHFInput } from "@components/RHFInput/RHFInput";
import { useFormContext } from "react-hook-form";
import { ButtonContainer, ButtonWrapper } from "./style";
import { Button } from "@components/Button/Button";
import { maskCep, maskDate } from "@/formatter";
import { fetchAddressByCep } from "@/services/viacep.service";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

interface AddressStepProps {
    onBack: () => void;
}

export function AddressStep({ onBack }: AddressStepProps) {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>();
  const { setValue, trigger, formState } = useFormContext();

  async function handleFetchAddress(cep: string) {
    if (cep.length !== 8) return;

    try {
      const address = await fetchAddressByCep(cep);
      setValue("address.street", address.street);
      setValue("address.neighborhood", address.neighborhood);
      setValue("address.city", address.city);

      await trigger("address");
    } catch (error) {
      console.error(error);
    }
  }

  const { formState: { errors } } = useFormContext();

  useEffect(() => {
    console.log("Erros de validação:", errors)
  }, [formState.errors]);

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', marginBottom: 2 }}>
        <Button icon="truck" onClick={() => setDeliveryType('delivery')} variant={deliveryType === 'delivery' ? 'filled' : 'outline'}>
          Entrega
        </Button>
        <Button icon="check" onClick={() => setDeliveryType('pickup')} variant={deliveryType === 'delivery' ? 'outline' : 'filled'}>
          Retirada
        </Button>
      </Box>

      {deliveryType === 'delivery' && (
        <>
          <RHFInput name="address.cep" label="CEP" mask={maskCep} onBlur={handleFetchAddress}/>
          <RHFInput name="address.street" label="Rua" />
          <RHFInput name="address.neighborhood" label="Bairro" />
          <RHFInput name="address.city" label="Cidade" />
          <RHFInput name="address.number" label="Número" />
          <RHFInput name="deliveryDate" label="Data de entrega" mask={maskDate}/>
        </>
      )}

      <ButtonContainer>
        <Button icon="arrow-left" onClick={onBack} variant="text"/>
      </ButtonContainer>

      <ButtonWrapper>
        <Button
          color="primary"
          fullWidth
          type="submit"
          loading={formState.isSubmitting}
        >
          Criar Pedido
        </Button>
      </ButtonWrapper>
    </>
  );
}