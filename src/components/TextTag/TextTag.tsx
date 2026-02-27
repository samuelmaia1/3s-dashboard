import { IconName } from "lucide-react/dynamic";
import { Container, Content } from "./style";
import { Text } from "@components/Text/Text";
import { useTheme } from "@mui/material";
import { Icon } from "@components/Icon/Icon";

export type TextTagVariant = "success" | "error" | "warning" | "info";

interface TextTagProps {
    text: string;
    variant?: TextTagVariant;
    icon?: IconName;
}

export function TextTag({ text, variant = 'info', icon }: TextTagProps) {
    const theme = useTheme();

    const variantBackground = {
        success: theme.palette.success.main,
        error: theme.palette.error.main,
        warning: theme.palette.warning.main,
        info: theme.palette.info.main,
    };

    const variantText = {
        success: theme.palette.success.contrastText,
        error: theme.palette.error.contrastText,
        warning: theme.palette.warning.contrastText,
        info: theme.palette.info.contrastText,
    }

    return (
        <Container sx={{backgroundColor: variantBackground[variant]}}>
            <Content>
                <Text variant="body2" sx={{color: variantText[variant]}} weight={'medium'}>
                    {text}
                </Text>
                {icon && (
                    <Icon name={icon} size={20} color={variantText[variant]}/>
                )}
            </Content>
        </Container>
    )
}