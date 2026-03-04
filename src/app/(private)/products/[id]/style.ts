import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)(({ theme }) => ({
    position: "relative",
    minHeight: "80vh",
}))

export const ImageInfoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  maxWidth: "400px",
  marginTop: "2rem",
}))

export const ButtonContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "2rem",
    gap: theme.spacing(2),
}))