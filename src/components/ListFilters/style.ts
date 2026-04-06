import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const DrawerContent = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 420,
  height: "100%",
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

export const FieldsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const ActionsContainer = styled(Box)(({ theme }) => ({
  marginTop: "auto",
  display: "flex",
  gap: theme.spacing(1.5),
}));

export const Header = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
}));
