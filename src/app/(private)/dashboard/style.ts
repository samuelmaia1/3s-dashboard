import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({

}));

export const CardContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    marginTop: "2rem",
}));

export const IconTextContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
}));