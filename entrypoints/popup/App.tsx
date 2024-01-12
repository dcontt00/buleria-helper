import wxtLogo from '/wxt.svg';
import './App.css';
import ApaGenerator from '@/components/ApaGenerator';
import Keywords from '@/components/Keywords';
import SherpaRomeo from '@/components/SherpaRomeo';
import { Stack, ThemeProvider, Typography, Button } from '@mui/material';
import theme from '@/theme';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PublisherPolicy } from '@/types';


function App() {
  const [showAPAGenerator, setShowAPAGenerator] = useState<boolean>(false);
  const [showKeywords, setShowKeywords] = useState<boolean>(false);
  const [showBackButton, setShowBackButton] = useState<boolean>(false);
  const [showSherpaRomeo, setShowSherpaRomeo] = useState<boolean>(false);

  function modules() {
    if (showAPAGenerator) {
      return <ApaGenerator />
    }
    if (showKeywords) {
      return <Keywords />
    }
    if (showSherpaRomeo) {
      return <SherpaRomeo />
    }
  }


  function backButtonClick() {
    setShowAPAGenerator(false);
    setShowKeywords(false);
    setShowBackButton(false);
    setShowSherpaRomeo(false);
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
          <Button onClick={() => { setShowSherpaRomeo(true); setShowBackButton(true) }}>Sherpa Romeo</Button>
        </>
      }

      {modules()}


    </ThemeProvider>
  );
}

export default App;
