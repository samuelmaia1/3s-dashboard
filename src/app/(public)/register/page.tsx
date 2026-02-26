'use client';

import { Text } from "@components/Text/Text";
import { Container } from "./style";
import { Box } from "@mui/material";
import RegisterForm from "./(components)/RegisterForm";

export default function Register() {
    return (
        <Container>
            <Box>
                <Text variant="h4" color="primary">Junte-se a nós!</Text>
                <Text variant="body1" color="textSecondary" mb={4}>
                    Crie sua conta para acessar o dashboard e aproveitar todos os recursos disponíveis.
                </Text>
                <RegisterForm />
            </Box>
        </Container>
    )
}