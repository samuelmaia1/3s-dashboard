"use client";

import { Button } from "@components/Button/Button";

import { useTheme } from "@hooks/useTheme";

import { Avatar } from "@components/Avatar/Avatar";
import { ButtonsContainer, Container } from "./style";

export function PublicHeader() {
  const { toggleTheme, theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <Container>
      <ButtonsContainer>
        <Button
          variant="text"
          color="primary"
          shape="rounded"
          size="medium"
          icon={isDark ? "moon" : "sun"}
          onClick={toggleTheme}
        />
        <Button>Cadastre-se</Button>
      </ButtonsContainer>
    </Container>
  );
}
