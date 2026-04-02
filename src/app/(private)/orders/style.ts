import { Box, styled } from "@mui/material";

export const Container = styled(Box)(() => ({
    
}))

export const TopContainer = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 16,
    marginBottom: 48
}))

export const OrdersGrid = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: theme.spacing(2),
}));
