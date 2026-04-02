import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

interface PageProps {
  active: boolean;
}

export const Container = styled(Box)(() => ({
  padding: 8,
  minHeight: "80vh",
  display: "flex",
  flexDirection: "column",
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

export const RentsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: theme.spacing(2),
}));
