import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

interface PageProps {
    active: boolean
}

export const Container = styled(Box)(({ theme }) => ({
    padding: 8,
    position: 'relative',
    minHeight: "90vh",
    display: "flex",
    flexDirection: "column",
}))

export const TopContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    marginBottom: 48
}))

export const SearchContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    
    [theme.breakpoints.up('md')]: {
        maxWidth: '50%'
    }
}))

export const PaginationContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(3),
  left: 0,
  right: 0,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),

  zIndex: theme.zIndex.fab,
}));

export const Page = styled(Box)<PageProps>(({ theme, active }) => ({
    padding: 8,
    borderRadius: 8,
    backgroundColor: active ? theme.palette.primary.main : 'transparent',
    color: active ? theme.palette.primary.contrastText : 'inherit',
    border: active ? '1px solid transparent' : `1px solid ${theme.palette.primary.main}`,
    cursor: 'pointer'
}));