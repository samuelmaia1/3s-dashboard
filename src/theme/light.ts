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
    },

    success: {
      main: "#16A34A",   
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

export default lightTheme;