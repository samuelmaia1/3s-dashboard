import { Box, styled } from "@mui/material";

interface ContainerProps {
  width?: string;
}

export const Container = styled(Box)<ContainerProps>(({ width }) => ({
    borderRadius: 16,
    padding: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: width || "80%",
    maxWidth: '300px',
    minWidth: '80px',
    textAlign: 'center',
    overflow: "hidden",
}))

export const Content = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: 4,
    minWidth: 0,
    maxWidth: "100%",
    overflow: "hidden",
}))
