import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",

    background: {
      default: "#FFFFFF", 
      paper: "#F5F5F5",  
    },

    text: {
      primary: "#000000",  
      secondary: "#525252", 
    },

    primary: {
      main: "#000000",     
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#16A34A",   
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

    h2: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
    },

    h3: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
    },

    h4: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
    },
  },
});

export default lightTheme;