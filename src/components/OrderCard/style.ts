import { Box, styled } from "@mui/material";

export const MetricsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
}));

export const MetricItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  padding: theme.spacing(1.5),
  borderRadius: 12,
  backgroundColor: theme.palette.action.hover,
}));

export const ProductsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.75),
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const Footer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2.5),
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  flexWrap: "wrap",
}));

export const ActionGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  flexWrap: "wrap",
}));
