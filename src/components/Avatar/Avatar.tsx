import { useAuth } from "@hooks/useAuth";
import { Text } from "@components/Text/Text";
import { useTheme } from "@mui/material";

import { AvatarContainer } from "./style";

export function Avatar() {
  const { user, loadingAuth } = useAuth();
  const theme = useTheme();

  const initials = !!user ? `${user.name[0]}${user.lastName[0]}` : "NA";

  return (
    <AvatarContainer>
      <Text
        variant="caption"
        align="center"
        weight={600}
        color={theme.palette.primary.contrastText}
      >
        {!loadingAuth && initials}
      </Text>
    </AvatarContainer>
  );
}
