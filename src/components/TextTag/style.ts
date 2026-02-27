import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({theme}) => ({
    borderRadius: 16,
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: '300px',
    minWidth: '200px'
}))

export const Content = styled(Box)(({theme}) => ({
    display: "flex",
    alignItems: "center",
    gap: 4
}))