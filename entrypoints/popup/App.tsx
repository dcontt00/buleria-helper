import wxtLogo from '/wxt.svg';
import './App.css';
import ApaGenerator from '@/components/ApaGenerator';
import Keywords from '@/components/Keywords';
import { Stack, ThemeProvider, Typography } from '@mui/material';
import theme from '@/theme';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Stack direction={"row"} spacing={2} justifyContent={"center"}>
        <img src={wxtLogo} className="logo" alt="WXT logo" />
        <Typography variant="h4">Buleria Helper</Typography>
      </Stack>
      <Keywords />
      <ApaGenerator />
    </ThemeProvider>
  );
}

export default App;
