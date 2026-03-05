"use client";

import LoginForm from "./(components)/LoginForm";
import { Container } from "./style";
import { Text } from "@components/Text/Text";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFlashMessage } from "@contexts/FlashMessageContext";
import Image from "next/image";
import Logo from "@/assets/images/logo2.png";

export default function Login() {
  const {showMessage} = useFlashMessage();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("logout") === "true") {
      showMessage("Logout realizado com sucesso!", "success");
    }
  }, []);

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
