import Lottie from 'lottie-react';
import NotFoundAnimation from "@/assets/animations/404.json";
import { Container } from "./style";
import { Text } from '@components/Text/Text';
import { useTheme } from '@mui/material';

interface NotFoundProps { 
    title?: string;
    text?: string;
}

export function NotFound({ title, text }: NotFoundProps) {
    const theme = useTheme();

    return (
        <Container>
            <div style={{ width: 300, height: 300 }}>
                <Lottie 
                    animationData={NotFoundAnimation} 
                    loop={true} 
                    style={{fill: theme.palette.primary.main}}
                />
            </div>
            <Text variant="h6">{title ? title : "Página não encontrada"}</Text>
            <Text variant="body2" textAlign={'center'}>{text ? text : "Infelizmente, não foi possível encontrar este recurso."}</Text>
        </Container>
    )
}