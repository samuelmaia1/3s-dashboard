"use client";

import LoginForm from "./(components)/LoginForm";
import { Container } from "./style";
import { Text } from "@components/Text/Text";
import { Box } from "@mui/material";

export default function Login() {
  return (
    <Container>
      <Box>
        <Text variant="h4" color="primary" fontWeight={600} mb={2}>
          Bem-vindo de volta.
        </Text>
        <Text variant="body1" color="textSecondary" mb={4}>
          Faça login para acessar seu painel de controle.
        </Text>
        <LoginForm />
      </Box>
    </Container>
  );
}
