import { RHFInput } from "@components/RHFInput/RHFInput";
import { useFormContext } from "react-hook-form";
import { ButtonContainer } from "./style";
import { Button } from "@components/Button/Button";

export function CompanyStep({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: () => void;
}) {
  const { formState } = useFormContext();


  return (
    <>
      <RHFInput name="socialName" label="Nome Social" />
      <RHFInput name="instagram" label="Instagram" />

      <ButtonContainer>
        <Button
          type="submit"
          variant="text"
          color="primary"
          shape="square"
          icon="arrow-left"
          onClick={onBack}
        />
      </ButtonContainer>

      <Button
        type="submit"
        variant="filled"
        color="primary"
        shape="rounded"
        icon="check"
        fullWidth
        disabled={formState.isSubmitting}
        loading={formState.isSubmitting}
        onClick={onSubmit}
        style={{ marginTop: 24 }}
      >
        Cadastrar
      </Button>
    </>
  );
}
