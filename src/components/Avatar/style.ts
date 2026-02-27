import { styled } from "@mui/material";

export const AvatarContainer = styled("div")(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: "50%",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.contrastText,

  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1,
}));