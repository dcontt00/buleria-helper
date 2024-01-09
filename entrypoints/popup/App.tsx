import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import { browser } from "wxt/browser"
import './App.css';
import ApaGenerator from '@/components/ApaGenerator';
import { Stack, ThemeProvider, Typography } from '@mui/material';
import theme from '@/theme';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Stack direction={"row"} spacing={2} justifyContent={"center"}>
        <img src={wxtLogo} className="logo" alt="WXT logo" />
        <Typography variant="h1">Buleria Helper</Typography>
      </Stack>
      <ApaGenerator />
    </ThemeProvider>
  );
}

export default App;
