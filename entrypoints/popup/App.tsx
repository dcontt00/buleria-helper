import wxtLogo from '/wxt.svg';
import './App.css';
import ApaGenerator from '@/components/ApaGenerator';
import Keywords from '@/components/Keywords';
import SherpaRomeo from '@/components/SherpaRomeo';
import { Stack, ThemeProvider, Typography, Button } from '@mui/material';
import theme from '@/theme';
import { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AbcIcon from '@mui/icons-material/Abc';
import NotesIcon from '@mui/icons-material/Notes';
import FindInPageIcon from '@mui/icons-material/FindInPage';
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
        <Typography variant="h4">Buleria Helper</Typography>
      </Stack>

      <Stack direction={"column"} spacing={1} justifyContent={"center"}>

        {
          showBackButton ? (
            <Button variant="outlined" startIcon={<ArrowBackIosIcon />} onClick={backButtonClick}>Atras</Button>
          ) : <>
            <Button variant="contained" startIcon={<NotesIcon />} onClick={() => { setShowAPAGenerator(true); setShowBackButton(true) }}>APA Generator</Button>
            <Button variant="contained" startIcon={<AbcIcon />} onClick={() => { setShowKeywords(true); setShowBackButton(true) }}>Keywords</Button>
            <Button variant="contained" startIcon={<FindInPageIcon />} onClick={() => { setShowSherpaRomeo(true); setShowBackButton(true) }}>Sherpa Romeo</Button>
          </>
        }
      </Stack>

      {modules()}


    </ThemeProvider>
  );
}

export default App;
