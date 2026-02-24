"use client";

import { FormEvent, useState } from "react";
import { Box } from "@mui/material";
import { Input } from "@components/Input/Input";
import { Button } from "@components/Button/Button";
import { useAuth } from "@hooks/useAuth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const { login, loadingAuth } = useAuth();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "Informe seu e-mail";
    }

    if (!password) {
      newErrors.password = "Informe sua senha";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      login(email, password);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: '600px', width: "100%" }}
    >
      <Input
        label="E-mail"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />

      <Input
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />

      <Button type="submit" variant="filled" color="primary" fullWidth shape="square" icon="arrow-right" loading={loadingAuth}>
        Entrar
      </Button>
    </Box>
  );
}