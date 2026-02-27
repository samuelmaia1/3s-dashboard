import { useAuth } from "@hooks/useAuth";
import { Text } from "@components/Text/Text";
import { useTheme } from "@mui/material";

import { AvatarContainer } from "./style";

interface AvatarProps {
  name?: string;
  lastName?: string;
}

export function Avatar({ name, lastName }: AvatarProps) {
  const { user, loadingAuth } = useAuth();
  const theme = useTheme();

  const initials = name && lastName ? `${name[0]}${lastName[0]}` : `${user?.name[0]}${user?.lastName[0]}`

  return (
    <AvatarContainer>
      <Text
        variant="caption"
        align="center"
        weight={600}
        color={theme.palette.text.primary}
      >
        {!loadingAuth && initials}
      </Text>
    </AvatarContainer>
  );
}
