import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Box)(({ theme }) => ({
  position: "relative",
  minHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  paddingBottom: theme.spacing(4),
}));

export const HeaderRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  flexWrap: "wrap",
}));

export const ActionBar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: theme.spacing(1.5),
  flexWrap: "wrap",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

export const HeroSection = styled(Paper)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  padding: theme.spacing(3),
  borderRadius: 24,
  border: `1px solid ${theme.palette.divider}`,
  backgroundImage:
    theme.palette.mode === "dark"
      ? "radial-gradient(circle at top left, rgba(76, 175, 80, 0.18), transparent 38%), linear-gradient(145deg, rgba(18,18,18,0.98), rgba(28,28,28,0.96))"
      : "radial-gradient(circle at top left, rgba(76, 175, 80, 0.18), transparent 38%), linear-gradient(145deg, rgba(255,255,255,0.98), rgba(247,250,247,0.96))",
  boxShadow: theme.shadows[3],
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(4),
  },
}));

export const HeroGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  alignItems: "stretch",
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "minmax(0, 1.35fr) minmax(320px, 0.85fr)",
  },
}));

export const HeroContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2.5),
  minWidth: 0,
}));

export const HeroTop = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
}));

export const Eyebrow = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(0.75, 1.25),
  borderRadius: 999,
  width: "fit-content",
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(34, 51, 34, 0.05)",
  border: `1px solid ${theme.palette.divider}`,
}));

export const TitleBlock = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

export const DescriptionCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 18,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.62)",
  backdropFilter: "blur(10px)",
}));

export const MetricsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1.5),
  gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
}));

export const MetricCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 18,
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))"
      : "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,248,0.92))",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  minHeight: 132,
}));

export const MetricHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1),
}));

export const MetricIconWrap = styled(Box)(({ theme }) => ({
  width: 42,
  height: 42,
  borderRadius: 14,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.mode === "dark" ? "rgba(76, 175, 80, 0.12)" : "rgba(76, 175, 80, 0.1)",
  color: theme.palette.success.main,
}));

export const ProductVisualCard = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  minHeight: 100,
  padding: theme.spacing(2.25),
  borderRadius: 24,
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))"
      : "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(244,248,244,0.92))",
}));

export const ProductImageFrame = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "1 / 1",
  borderRadius: 22,
  overflow: "hidden",
  background:
    theme.palette.mode === "dark"
      ? "radial-gradient(circle at top, rgba(76,175,80,0.16), rgba(255,255,255,0.04))"
      : "radial-gradient(circle at top, rgba(76,175,80,0.2), rgba(255,255,255,0.95))",
  border: `1px solid ${theme.palette.divider}`,
  "&::after": {
    content: '""',
    position: "absolute",
    inset: "auto 12% -22% 12%",
    height: "38%",
    filter: "blur(34px)",
    borderRadius: "50%",
    backgroundColor: theme.palette.mode === "dark" ? "rgba(76,175,80,0.16)" : "rgba(76,175,80,0.18)",
  },
  "& img": {
    position: "relative",
    zIndex: 1,
  },
}));

export const StatusBadge = styled(Box)<{ $tone: "success" | "warning" | "error" }>(
  ({ theme, $tone }) => {
    const toneMap = {
      success: theme.palette.success,
      warning: theme.palette.warning,
      error: theme.palette.error,
    };

    const palette = toneMap[$tone];

    return {
      display: "inline-flex",
      alignItems: "center",
      gap: theme.spacing(1),
      width: "fit-content",
      padding: theme.spacing(0.75, 1.25),
      borderRadius: 999,
      backgroundColor: palette.main,
      color: palette.contrastText,
      boxShadow: theme.shadows[1],
    };
  }
);

export const DetailGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "minmax(0, 1.1fr) minmax(320px, 0.9fr)",
  },
}));

export const DetailCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 24,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[1],
  backgroundImage: "none",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const DetailList = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1.5),
}));

export const DetailRow = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(120px, 160px) minmax(0, 1fr)",
  gap: theme.spacing(2),
  alignItems: "start",
  padding: theme.spacing(1.5, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-of-type": {
    borderBottom: "none",
    paddingBottom: 0,
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(0.75),
  },
}));

export const HighlightCard = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(1.5),
  padding: theme.spacing(2),
  borderRadius: 20,
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(76,175,80,0.08))"
      : "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(231,245,233,0.98))",
}));

export const HighlightRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1.5),
}));
