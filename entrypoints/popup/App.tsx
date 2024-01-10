import wxtLogo from '/wxt.svg';
import './App.css';
import ApaGenerator from '@/components/ApaGenerator';
import Keywords from '@/components/Keywords';
import { Stack, ThemeProvider, Typography, Button } from '@mui/material';
import theme from '@/theme';
import { useState } from 'react';

function App() {
  const [showAPAGenerator, setShowAPAGenerator] = useState<boolean>(false);
  const [showKeywords, setShowKeywords] = useState<boolean>(false);
  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  function modules() {
    if (showAPAGenerator) {
      return <ApaGenerator />
    }
    if (showKeywords) {
      return <Keywords />
    }


  }

  function backButtonClick() {
    setShowAPAGenerator(false);
    setShowKeywords(false);
    setShowBackButton(false);
  }
  return (
    <ThemeProvider theme={theme}>
      <Stack direction={"row"} spacing={2} justifyContent={"center"}>
        <img src={wxtLogo} className="logo" alt="WXT logo" />
        <Typography variant="h4">Buleria Helper</Typography>
      </Stack>

      {
        showBackButton ? (
          <Button onClick={backButtonClick}>Atras</Button>
        ) : <>
          <Button onClick={() => { setShowAPAGenerator(true); setShowBackButton(true) }}>APA Generator</Button>
          <Button onClick={() => { setShowKeywords(true); setShowBackButton(true) }}>Keywords</Button>
        </>
      }

      {modules()}


    </ThemeProvider>
  );
}

export default App;
