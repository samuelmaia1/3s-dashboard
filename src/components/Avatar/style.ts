import { styled } from "@mui/material";

export const AvatarContainer = styled("div")(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: "50%",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,

  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1,
}));