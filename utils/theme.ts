import { createTheme } from "@mui/material";
// Comprueba si el navegador está en modo oscuro
const isDarkMode =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

var themeDark = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00bcd4",
    },
    secondary: {
      main: "#ff4081",
    },
    text: {
      primary: "#FFFFFF", // color de texto principal
      secondary: "#757575", // color de texto secundario
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
    text: {
      primary: "#000000", // color de texto principal
      secondary: "#757575", // color de texto secundario
    },
  },
});

var themeAuto = isDarkMode ? themeDark : themeLight;

export { themeAuto, themeLight };
