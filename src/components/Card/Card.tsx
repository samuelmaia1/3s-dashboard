import { Text } from "@components/Text/Text";
import { Container, TitleContainer, TopContainer } from "./style";
import { ReactNode } from "react";
import { IconName } from "lucide-react/dynamic";
import { Icon } from "@components/Icon/Icon";
import { useTheme } from "@mui/material";

interface CardProps {
    children?: ReactNode;
    title?: string;
    description?: string;
    icon?: IconName;
}

export function Card({ children, title, description, icon}: CardProps) {
    const theme = useTheme();

    return (
        <Container>
            <TitleContainer>
                <TopContainer>
                    <Text variant="body1" weight='bold'>{title}</Text>
                    {icon && <Icon name={icon} size={20} color={theme.palette.text.secondary}/>}
                </TopContainer>
                <Text variant="body2" color={theme.palette.text.secondary} sx={{ mt: 1 }}>
                    {description}
                </Text>
            </TitleContainer>
            {children}
        </Container>
    )
}