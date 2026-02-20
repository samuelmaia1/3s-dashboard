import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",

    background: {
      default: "#f7f7f7",
      paper: "#ffffff",
    },

    text: {
      primary: "#1f1f1f",
      secondary: "#6e6e6e",
    },

    primary: {
      main: "#e52e4d",
    },

    success: {
      main: "#33cc95",
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