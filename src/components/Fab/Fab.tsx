import { CircularProgress } from "@mui/material";
import type { IconName } from "lucide-react/dynamic";
import { Icon } from "@components/Icon/Icon";
import { Container } from "./style";
import { CSSProperties } from "react";

interface FabProps {
  icon: IconName;
  onClick?: () => void;
  loading?: boolean;
  size?: number;
  disabled?: boolean;
  style?: CSSProperties;
}

export function Fab({
  icon,
  onClick,
  loading = false,
  size = 50,
  disabled = false,
  style,
}: FabProps) {
  return (
    <Container
      size={size}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
    >
      {loading ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        <Icon name={icon} size={20}/>
      )}
    </Container>
  );
}