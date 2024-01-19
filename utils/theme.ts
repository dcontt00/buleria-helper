import { createTheme } from "@mui/material";
// Comprueba si el navegador está en modo oscuro
const isDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

var themeAuto = createTheme({
  palette: {
    mode: isDarkMode ? "dark" : "light",
    primary: {
      main: "#00bcd4",
    },
    secondary: {
      main: "#ff4081",
    },
  },
});

var themeLight = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00bcd4",
    },
    secondary: {
      main: "#ff4081",
    },
  },
});

export { themeAuto, themeLight };
