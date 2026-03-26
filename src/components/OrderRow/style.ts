import { Box, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
        padding: theme.spacing(2),
    })
);

export const TopInfoContainer = styled(Box)(({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    })
);