import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

interface PageProps {
  active: boolean;
}

export const TopContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 16,
  marginBottom: 48,
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
  flex: 1,

  [theme.breakpoints.up("md")]: {
    maxWidth: "50%",
  },
}));

export const PaginationContainer = styled(Box)(({ theme }) => ({
  marginTop: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
  paddingTop: theme.spacing(2),
}));

export const Page = styled(Box)<PageProps>(({ theme, active }) => ({
  padding: 8,
  borderRadius: 8,
  backgroundColor: active ? theme.palette.primary.main : "transparent",
  color: active ? theme.palette.primary.contrastText : "inherit",
  border: active
    ? "1px solid transparent"
    : `1px solid ${theme.palette.primary.main}`,
  cursor: "pointer",
}));

export const ProductsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "repeat(1, 1fr)",

  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },

  [theme.breakpoints.up("xl")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
}));

export const ButtonContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 24,
}));

export const ButtonWrapper = styled(Box)(() => ({
  marginTop: 24,
  display: "flex",
  gap: 16,
}));
