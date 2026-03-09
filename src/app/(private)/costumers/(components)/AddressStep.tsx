import { RHFInput } from "@components/RHFInput/RHFInput";
import { useFormContext } from "react-hook-form";
import { ButtonContainer, ButtonWrapper } from "./style";
import { Button } from "@components/Button/Button";
import { maskCep } from "@/formatter";
import { fetchAddressByCep } from "@/services/viacep.service";
import { Fab } from "@components/Fab/Fab";

interface AddressStepProps {
    onBack: () => void;
}

export function AddressStep({ onBack }: AddressStepProps) {
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

  return (
    <>
        <RHFInput name="address.cep" label="CEP" mask={maskCep} onBlur={handleFetchAddress}/>
        <RHFInput name="address.street" label="Rua" />
        <RHFInput name="address.neighborhood" label="Bairro" />
        <RHFInput name="address.city" label="Cidade" />
        <RHFInput name="address.number" label="Número" />

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
                Cadastrar cliente
            </Button>
        </ButtonWrapper>

    </>
  );
}