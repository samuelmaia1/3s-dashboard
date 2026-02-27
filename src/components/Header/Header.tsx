"use client";

import { Button } from "@components/Button/Button";

import { useTheme } from "@hooks/useTheme";

import { Avatar } from "@components/Avatar/Avatar";
import {
  AvatarContainer,
  ButtonsContainer,
  Container,
  TitleContainer,
} from "./style";
import { Text } from "@components/Text/Text";
import { useAuth } from "@hooks/useAuth";
import { FlashMessage } from "@components/FlashMessage/FlashMessage";
import { useState } from "react";
import { IFlashMessage } from "@/types/Interfaces";
import { Icon } from "@components/Icon/Icon";

interface HeaderProps {
  onOpenSidebar: () => void;
  title: string;
}

export function Header({ onOpenSidebar, title }: HeaderProps) {
  const [snackBar, setSnackBar] = useState<IFlashMessage>({
    open: false,
    message: "",
    severity: undefined,
  });

  const { logout } = useAuth();

  const { toggleTheme, theme } = useTheme();

  const isDark = theme === "dark";

  async function handleLogout() {
    try {
      await logout();
      setSnackBar({
        open: true,
        message: "Logout realizado com sucesso!",
        severity: "success",
      });
    } catch (error) {
      setSnackBar({
        open: true,
        message: "Erro ao deslogar",
        severity: "error",
      });
    }
  }

  return (
    <Container>
      <FlashMessage
        message={snackBar.message}
        open={snackBar.open}
        onClose={() => setSnackBar((prev) => ({ ...prev, open: false }))}
      />
      <AvatarContainer>
        <Icon size={16} name={"menu"} onClick={onOpenSidebar} />
      </AvatarContainer>
      <TitleContainer>
        <Text variant="h6" weight={500} fontSize={16}>
          {title}
        </Text>
      </TitleContainer>
      <ButtonsContainer>
        <Icon
          size="16"
          name={isDark ? "moon-star" : "sun"}
          onClick={toggleTheme}
        />
        <Icon size="16" name={"settings"} onClick={handleLogout} />
      </ButtonsContainer>
    </Container>
  );
}
