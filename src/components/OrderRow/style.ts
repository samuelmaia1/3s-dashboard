import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
        padding: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.divider}`,
    })
);

export const TopInfoContainer = styled(Box)(({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    })
);