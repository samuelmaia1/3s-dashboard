import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)(({ theme }) => ({
    padding: 8
}))

export const TopContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    marginBottom: 48
}))

export const SearchContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    
    [theme.breakpoints.up('md')]: {
        maxWidth: '50%'
    }
}))