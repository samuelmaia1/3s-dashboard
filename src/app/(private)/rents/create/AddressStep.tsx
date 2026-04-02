import { RHFInput } from "@components/RHFInput/RHFInput";
import { useFormContext } from "react-hook-form";
import { ButtonContainer, ButtonWrapper } from "./style";
import { Button } from "@components/Button/Button";
import { formatToCurrency, maskCep, maskDate } from "@/formatter";
import { fetchAddressByCep } from "@/services/viacep.service";
import { Box } from "@mui/material";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { Text } from "@components/Text/Text";
import { CreateRentFormData } from "@/types/Schemes";

interface AddressStepProps {
  onBack: () => void;
}

export function AddressStep({ onBack }: AddressStepProps) {
  const [deliveryTax, setDeliveryTax] = useState<string | number>(0);

  const { setValue, trigger, formState, clearErrors, watch } =
    useFormContext<CreateRentFormData>();
  const { user } = useAuth();

  const deliveryType = watch("deliveryType");

  async function handleFetchAddress(cep: string) {
    if (cep.length !== 8) return;

    try {
      const address = await fetchAddressByCep(cep);
      setValue("address.street", address.street);
      setValue("address.neighborhood", address.neighborhood);
      setValue("address.city", address.city);

      await trigger("address");
      calculateTax(cep);
    } catch (error) {
      console.error(error);
    }
  }

  function handleDeliveryChange(type: "delivery" | "pickup") {
    setValue("deliveryType", type, { shouldValidate: true });
    if (type === "pickup") {
      setValue("address", undefined);
      setValue("deliveryTax", 0);
      clearErrors("address");
      setDeliveryTax(0);
    }
  }

  async function calculateTax(cep: string) {
    const response = await fetch("/api/delivery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originCep: user?.address.cep, destinationCep: cep }),
    });

    const body = await response.json();

    if (!response.ok || typeof body.deliveryTax !== "string") {
      setValue("deliveryTax", 0);
      setDeliveryTax("Não foi possível calcular");
      return;
    }

    setValue("deliveryTax", Number(body.deliveryTax));
    setDeliveryTax(formatToCurrency(Number(body.deliveryTax)));
  }

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", marginBottom: 2 }}>
        <Button
          icon="truck"
          onClick={() => handleDeliveryChange("delivery")}
          variant={deliveryType === "delivery" ? "filled" : "outline"}
          type="button"
        >
          Entrega
        </Button>
        <Button
          icon="check"
          onClick={() => handleDeliveryChange("pickup")}
          variant={deliveryType === "pickup" ? "filled" : "outline"}
          type="button"
        >
          Retirada
        </Button>
      </Box>

      {deliveryType === "delivery" && (
        <>
          <RHFInput name="address.cep" label="CEP" mask={maskCep} onBlur={handleFetchAddress} />
          <RHFInput name="address.street" label="Rua" />
          <RHFInput name="address.neighborhood" label="Bairro" />
          <RHFInput name="address.city" label="Cidade" />
          <RHFInput name="address.number" label="Número" />
        </>
      )}

      <RHFInput
        name="deliveryDate"
        label={deliveryType === "delivery" ? "Data de entrega" : "Data de retirada"}
        mask={maskDate}
      />
      <RHFInput name="returnDate" label="Data de devolução" mask={maskDate} />

      <Text sx={{ marginTop: 2 }}>
        Taxa de entrega: {deliveryType === "delivery" ? deliveryTax : "Não aplicável"}
      </Text>

      <ButtonContainer>
        <Button icon="arrow-left" onClick={onBack} variant="text" />
      </ButtonContainer>

      <ButtonWrapper>
        <Button color="primary" fullWidth type="submit" loading={formState.isSubmitting}>
          Criar Aluguel
        </Button>
      </ButtonWrapper>
    </>
  );
}
