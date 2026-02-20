import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",

    background: {
      default: "#333333",
      paper: "#1f1f1f",
    },

    text: {
      primary: "#f7f7f7",
      secondary: "#b1b1b1",
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

export default darkTheme;