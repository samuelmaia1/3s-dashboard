import { Box, styled } from "@mui/material";

interface ContainerProps {
  width?: string;
}

export const Container = styled(Box)<ContainerProps>(({theme, width}) => ({
    borderRadius: 16,
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: width || "80%",
    maxWidth: '300px',
    minWidth: '80px',
    textAlign: 'center'
}))

export const Content = styled(Box)(({theme}) => ({
    display: "flex",
    alignItems: "center",
    gap: 4
}))