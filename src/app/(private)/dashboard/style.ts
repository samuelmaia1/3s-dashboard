import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({

}));

export const CardContainer = styled(Box)(({ theme }) => ({
    marginBottom: "2rem",

    display: "grid", 
    gap: "1.5rem",

    gridTemplateColumns: "1fr", 

    [theme.breakpoints.up("sm")]: {
        gridTemplateColumns: "repeat(2, 1fr)",
    },

    [theme.breakpoints.up("md")]: {
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "2rem",
    },

    [theme.breakpoints.up("lg")]: {
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "2rem",
    }

    
}));

export const IconTextContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
}));

export const TableContainer = styled(Box)(({ theme }) => ({
    display: "grid", 
    gap: "1.5rem",

    gridTemplateColumns: "1fr", 

    [theme.breakpoints.up("md2")]: {
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "2rem",
    },

    "& > *": {
        minWidth: 0,
    },
}));