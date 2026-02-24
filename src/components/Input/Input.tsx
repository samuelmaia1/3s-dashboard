"use client";

import { StyledTextField } from "./style";

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  type?: string;
  disabled?: boolean;
  name?: string;
}

export function Input({
  label,
  placeholder,
  value,
  onChange,
  error = false,
  helperText,
  type = "text",
  disabled = false,
  name,
}: InputProps) {
  return (
    <StyledTextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      type={type}
      disabled={disabled}
      name={name}
      variant="outlined"
      InputLabelProps={{ shrink: true }}
      fullWidth
    />
  );
}