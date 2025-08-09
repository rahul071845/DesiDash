import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#F39C12", // A lighter, more golden orange for hover effects
      main: "#E67E22", // The main, refined burnt orange
      dark: "#D35400", // A darker shade for pressed states
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#008080", // A deep teal that complements orange well
    },
    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: "Lato, Arial, sans-serif",
    h1: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontWeight: 500,
    },
    h5: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontWeight: 500,
    },
    h6: {
      fontFamily: "Poppins, Arial, sans-serif",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none", // Buttons will use sentence case, not uppercase
        },
      },
    },
  },
});

export default theme;
