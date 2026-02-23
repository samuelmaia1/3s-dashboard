import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "12px",
    padding: "1.5rem"
}));

export const TitleContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "3rem"
}));

export const TopContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    justifyContent: "space-between"
}));