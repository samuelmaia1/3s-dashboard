import { styled } from '@mui/material/styles';
import { Paper, Typography, Box } from '@mui/material';

export const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  backgroundImage: 'none', // Remove o gradiente padrão do Paper no Dark Mode
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

export const ChartHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const ChartTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const ChartContent = styled(Box)({
  height: 250,
  width: '100%',
});