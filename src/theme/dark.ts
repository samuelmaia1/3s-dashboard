import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",

    background: {
      default: "#0A0A0A",  
      paper: "#1A1A1A",     
    },

    text: {
      primary: "#FFFFFF", 
      secondary: "#A3A3A3",
    },

    primary: {
      main: "#FFFFFF",  
      contrastText: "#0A0A0A",
    },

    success: {
      main: "#22C55E",   
    },

    error: {
      main: "#561213",  
      contrastText: "#FFFFFF", 
    },

    info: {
      main: "#3B82F6",   
    },
  },

  typography: {
    fontFamily: "'Montserrat', system-ui, sans-serif",

    h1: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
    },
  },
});

export default darkTheme;