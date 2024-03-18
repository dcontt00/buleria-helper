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
      primary: "#ffffff", // color de texto principal
      secondary: "#757575", // color de texto secundario
    },
  },
  typography: {
    body1: {
      color: "#ffffff",
    },
    body2: {
      color: "#ffffff",
    },
    h1: {
      color: "#ffffff",
    },
    h2: {
      color: "#ffffff",
    },
    h3: {
      color: "#ffffff",
    },
    h4: {
      color: "#ffffff",
    },
    h5: {
      color: "#ffffff",
    },
    h6: {
      color: "#ffffff",
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
  typography: {
    body1: {
      color: "#000000",
    },
    body2: {
      color: "#000000",
    },
    h1: {
      color: "#000000",
    },
    h2: {
      color: "#000000",
    },
    h3: {
      color: "#000000",
    },
    h4: {
      color: "#000000",
    },
    h5: {
      color: "#000000",
    },
    h6: {
      color: "#000000",
    },
  },
});

var themeAuto = isDarkMode ? themeDark : themeLight;

export { themeAuto, themeLight };
