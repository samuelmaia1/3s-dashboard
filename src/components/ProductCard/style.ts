import { Box, styled } from "@mui/material";

interface CardContainerProps {
  $isOutOfStock: boolean;
}

export const CardContainer = styled(Box)<CardContainerProps>(({ theme, $isOutOfStock }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper, 
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease-in-out',
  height: '100%',
  position: 'relative',

  opacity: $isOutOfStock ? 0.6 : 1,
  pointerEvents: $isOutOfStock ? 'none' : 'auto',
  filter: $isOutOfStock ? 'grayscale(0.8)' : 'none',

  '&:hover': {
    boxShadow: $isOutOfStock ? 'none' : theme.shadows[8],
    transform: $isOutOfStock ? 'none' : 'translateY(-4px)',
  },
}));

export const OutOfStockBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  left: 12,
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  padding: '4px 12px',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  zIndex: 2,
  textTransform: 'uppercase',
}));

export const ImageWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '180px',
  backgroundColor: theme.palette.mode === 'dark' ? '#262626' : '#E5E5E5',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

export const HeaderRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '8px',
  marginBottom: '8px',
});

export const FooterContainer = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  paddingTop: theme.spacing(2),
}));

export const QuantityControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
  borderRadius: '8px',
  padding: '6px',
  border: `1px solid ${theme.palette.divider}`,
  marginTop: theme.spacing(1),
}));

export const ProductsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: 'repeat(1, 1fr)',
  [theme.breakpoints.up('sm')]: { gridTemplateColumns: 'repeat(2, 1fr)' },
  [theme.breakpoints.up('md2')]: { gridTemplateColumns: 'repeat(3, 1fr)' }, // Usando seu breakpoint md2
  [theme.breakpoints.up('xl')]: { gridTemplateColumns: 'repeat(4, 1fr)' },
}));