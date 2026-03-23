import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

interface PageProps {
    active: boolean
}

export const Container = styled(Box)(({ theme }) => ({
  padding: 8,
  minHeight: "80vh",
  display: "flex",
  flexDirection: "column",
}));

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
    backgroundColor: active ? theme.palette.primary.main : 'transparent',
    color: active ? theme.palette.primary.contrastText : 'inherit',
    border: active ? '1px solid transparent' : `1px solid ${theme.palette.primary.main}`,
    cursor: 'pointer'
}));

export const ProductsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  gridTemplateColumns: 'repeat(1, 1fr)',
  
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));