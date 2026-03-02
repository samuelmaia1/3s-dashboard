import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)(({ theme }) => ({
    padding: 8
}))

export const TopContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 16,
    marginBottom: 48
}))