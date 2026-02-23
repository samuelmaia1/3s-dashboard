"use client";

import { Button } from "@components/Button/Button";

import { useTheme } from "@hooks/useTheme";

import { Avatar } from "@components/Avatar/Avatar";
import { AvatarContainer, ButtonsContainer, Container } from "./style";

export function Header() {
  const { toggleTheme, theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <Container>
      <AvatarContainer>
        <Button
          variant="text"
          color="primary"
          shape="rounded"
          size="medium"
          icon={"menu"}
          onClick={toggleTheme}
        />
      </AvatarContainer>
      <ButtonsContainer>
        <Button
          variant="text"
          color="primary"
          shape="rounded"
          size="medium"
          icon={isDark ? "moon" : "sun"}
          onClick={toggleTheme}
        />
        <Button
          variant="text"
          color="primary"
          shape="rounded"
          size="medium"
          icon="settings"
          onClick={() => {}}
        />
        <Avatar />
      </ButtonsContainer>
    </Container>
  );
}
