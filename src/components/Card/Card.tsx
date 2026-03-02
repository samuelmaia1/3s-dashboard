import { Text } from "@components/Text/Text";
import { Container, TitleContainer, TopContainer } from "./style";
import { ReactNode } from "react";
import { IconName } from "lucide-react/dynamic";
import { Icon } from "@components/Icon/Icon";
import { Skeleton, useTheme } from "@mui/material";

interface CardProps {
  children?: ReactNode;
  title?: string;
  description?: string;
  icon?: IconName;
  textVariant?: "body1" | "body2";
  textColor?: "primary" | "secondary";
  loading?: boolean;
}

export function Card({
  children,
  title,
  description,
  icon,
  textVariant,
  textColor,
  loading,
}: CardProps) {
  const theme = useTheme();

  if (loading) {
    return (
      <Container>
        <TitleContainer>
          <TopContainer>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="circular" width={20} height={20} />
          </TopContainer>

          <Skeleton variant="text" width="90%" />
          <Skeleton variant="text" width="80%" />
        </TitleContainer>

        <Skeleton
          variant="rectangular"
          height={80}
          sx={{ mt: 2, borderRadius: 1 }}
        />
      </Container>
    );
  }

  return (
    <Container>
      <TitleContainer>
        <TopContainer>
          <Text
            variant={textVariant || "body1"}
            weight="bold"
            color={
              textColor === "primary"
                ? theme.palette.primary.main
                : theme.palette.text.secondary
            }
            truncate
          >
            {title}
          </Text>

          {icon && (
            <Icon name={icon} size={20} color={theme.palette.text.secondary} />
          )}
        </TopContainer>

        <Text
          variant="body2"
          color={theme.palette.text.secondary}
          sx={{ mt: 1 }}
          lines={2}
        >
          {description}
        </Text>
      </TitleContainer>

      {children}
    </Container>
  );
}