import { RHFInput } from "@components/RHFInput/RHFInput";
import { useFormContext } from "react-hook-form";
import { ButtonContainer } from "./style";
import { Button } from "@components/Button/Button";
import { maskInstagram } from "@/formatter";

export function CompanyStep({
  onBack,
  onCreate,
}: {
  onBack: () => void;
  onCreate: () => void;
}) {
  const { trigger, formState } = useFormContext();

  async function handleSubmitClick() {
    const valid = await trigger(["socialName", "instagram"]);
    if (!valid) return;
    onCreate();
  }

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
        onClick={handleSubmitClick}
        style={{ marginTop: 24 }}
      >
        Cadastrar
      </Button>
    </>
  );
}
