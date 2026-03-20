import { Drawer, Box, styled, Typography } from '@mui/material';

const CART_WIDTH = 380;

export const StyledCartDrawer = styled(Drawer)(({ theme }) => ({
  width: CART_WIDTH,
  flexShrink: 0,
  
  '& .MuiDrawer-paper': {
    width: CART_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper, 
    borderLeft: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'column',
  },
}));

export const CartHeader = styled(Box)(({ theme }) => ({
  height: 64,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 24px',
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const CartContent = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  overflowY: 'auto',
}));

export const CartFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
}));

export const TotalRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
});