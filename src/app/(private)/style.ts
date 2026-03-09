import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

interface LoadingContainerProps {
    heightToShow: any
}

export const LoadingContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'heightToShow',
})<LoadingContainerProps>(({ theme, heightToShow }) => ({
    height: heightToShow ?? "80vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}));