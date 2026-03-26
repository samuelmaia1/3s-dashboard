"use client";

import { FormStepProps } from "@/types/Interfaces";
import { uploadProductImage } from "@/services/product.service";
import { useFormContext } from "react-hook-form";
import { useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { Button } from "@components/Button/Button";
import Image from "next/image";
import { Fab } from "@components/Fab/Fab";
import { ButtonContainer } from "./style";
import { Text } from "@components/Text/Text";
import { LoadingSpinner } from "@components/LoadingSpinner/LoadingSpinner";

export function ImageStep({ onBack, onNext, isLastStep }: FormStepProps) {
  const { setValue, watch, formState } = useFormContext();
  const imageUri = watch("imageUri");

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setError("Formato inválido. Use JPG, PNG ou WEBP.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("A imagem deve ter no máximo 5MB.");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const url = await uploadProductImage(file);
      setValue("imageUri", url, { shouldValidate: true });
    } catch {
      setError("Erro ao enviar imagem. Tente novamente.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Box
        sx={{
          width: "100%",
          height: 200,
          borderColor: imageUri ? "primary.main" : "grey.400",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {uploading ? (
          <LoadingSpinner size={32} />
        ) : imageUri ? (
          <Image
            src={imageUri}
            alt="Preview do produto"
            fill
            style={{ objectFit: "contain" }}
          />
        ) : (
          <Text variant="body2" color="text.secondary">
            Nenhuma imagem selecionada
          </Text>
        )}
      </Box>

      {error && (
        <Text variant="caption" color="error">
          {error}
        </Text>
      )}

      <Button
        type="button"
        fullWidth
        icon="image"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {imageUri ? "Trocar Imagem" : "Adicionar Imagem"}
      </Button>

        <ButtonContainer>
            <Fab icon="arrow-left" onClick={onBack} />
        </ButtonContainer>
        <Button
            type="submit"
            fullWidth
            loading={formState.isSubmitting}
            icon="check"
        >
            Criar Produto
        </Button>
    </Box>
  );
}