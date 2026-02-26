"use client";

import { Button } from "@components/Button/Button";

import { useTheme } from "@hooks/useTheme";

import { Avatar } from "@components/Avatar/Avatar";
import { AvatarContainer, ButtonsContainer, Container, TitleContainer } from "./style";
import { Text } from "@components/Text/Text";
import { useAuth } from "@hooks/useAuth";
import { FlashMessage } from "@components/FlashMessage/FlashMessage";
import { useState } from "react";
import { IFlashMessage } from "@/types/Interfaces";

interface HeaderProps {
  onOpenSidebar: () => void;
  title: string
}

export function Header({ onOpenSidebar, title }: HeaderProps) {
  const [snackBar, setSnackBar] = useState<IFlashMessage>({ open: false, message: "", severity: undefined });

  const { logout } = useAuth();

  const { toggleTheme, theme } = useTheme();

  const isDark = theme === "dark";

  async function handleLogout() {
    try {
      await logout();
      setSnackBar({ open: true, message: "Logout realizado com sucesso!", severity: "success" });
    } catch (error) {
      setSnackBar({ open: true, message: "Erro ao deslogar", severity: "error" });
    }
  }

  return (
    <Container>
      <FlashMessage message={snackBar.message} open={snackBar.open} onClose={() => setSnackBar((prev) => ({ ...prev, open: false }))} />
      <AvatarContainer>
        <Button
          variant="text"
          color="primary"
          shape="rounded"
          size="medium"
          icon={"menu"}
          onClick={onOpenSidebar}
        />
      </AvatarContainer>
      <TitleContainer>
        <Text variant="h5" weight={500}>
          {title}
        </Text>
      </TitleContainer>
      <ButtonsContainer>
        <Button
          variant="text"
          color="primary"
          shape="rounded"
          size="medium"
          icon={isDark ? "moon-star" : "sun"}
          onClick={toggleTheme}
        />
        <Button
          variant="text"
          color="primary"
          shape="rounded"
          size="medium"
          icon="settings"
          onClick={handleLogout}
        />
        <Avatar />
      </ButtonsContainer>
    </Container>
  );
}
