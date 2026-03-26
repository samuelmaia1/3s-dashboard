import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)(({ theme }) => ({
    
}))

export const TopContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}))

export const CardGrid = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
    display: 'grid',
    gap: theme.spacing(3),
    gridTemplateColumns: '1fr',

    [theme.breakpoints.up("sm")]: {
        gridTemplateColumns: "repeat(2, 1fr)",
    },

    [theme.breakpoints.up("md")]: {
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "2rem",
    }
}))

export const InfoContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2)
}))