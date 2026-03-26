// hooks/useImageUpload.ts
import { uploadProductImage } from "@/services/product.service";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

export function useImageUpload(fieldName: string) {
  const { setValue, watch } = useFormContext();
  const imageUri = watch(fieldName);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function openFilePicker() {
    inputRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Formato inválido. Use JPG, PNG ou WEBP.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError("A imagem deve ter no máximo 5MB.");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const url = await uploadProductImage(file);
      setValue(fieldName, url, { shouldValidate: true });
    } catch {
      setError("Erro ao enviar imagem. Tente novamente.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return { imageUri, uploading, error, inputRef, openFilePicker, handleFileChange };
}