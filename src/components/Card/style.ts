import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "12px",
    padding: "1.5rem",
    backgroundColor: theme.palette.background.paper,
}));

export const TitleContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "3rem"
}));

export const TopContainer = styled(Box)(() => ({
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    justifyContent: "space-between"
}));
