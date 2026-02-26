"use client";

import { Button } from "@components/Button/Button";

import { useTheme } from "@hooks/useTheme";

import { ButtonsContainer, Container } from "./style";
import { usePathname, useRouter } from "next/navigation";

export function PublicHeader() {
  const { toggleTheme, theme } = useTheme();
  const router = useRouter();
  const path = usePathname();

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
        <Button onClick={() => router.push(path === "/login" ? "/register" : "/login")}>
          {path === "/login" ? "Cadastre-se" : "Entrar"}
        </Button>
      </ButtonsContainer>
    </Container>
  );
}
