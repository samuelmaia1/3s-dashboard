"use client";

import { Button } from "@components/Button/Button";

import { useTheme } from "@hooks/useTheme";

import { Avatar } from "@components/Avatar/Avatar";
import { AvatarContainer, ButtonsContainer, Container, TitleContainer } from "./style";
import { Text } from "@components/Text/Text";

interface HeaderProps {
  onOpenSidebar: () => void;
  title: string
}

export function Header({ onOpenSidebar, title }: HeaderProps) {

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
          onClick={() => {}}
        />
        <Avatar />
      </ButtonsContainer>
    </Container>
  );
}
