import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({theme}) => ({
    borderRadius: 16,
    padding: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: '80%',
    maxWidth: '300px',
    minWidth: '100px',
    textAlign: 'center'
}))

export const Content = styled(Box)(({theme}) => ({
    display: "flex",
    alignItems: "center",
    gap: 4
}))