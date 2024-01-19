import './App.css';
import ApaGenerator from '@/components/ApaGenerator';
import Keywords from '@/components/Keywords';
import SherpaRomeo from '@/components/SherpaRomeo';
import { Button, Stack, ThemeProvider, Typography } from '@mui/material';
import { themeAuto } from '@/utils/theme';
import { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AbcIcon from '@mui/icons-material/Abc';
import NotesIcon from '@mui/icons-material/Notes';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import PersonIcon from '@mui/icons-material/Person';
import FileRename from '@/components/FileRename';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Authors from '@/components/Authors';
function App() {
    const [showAPAGenerator, setShowAPAGenerator] = useState<boolean>(false);
    const [showKeywords, setShowKeywords] = useState<boolean>(false);
    const [showBackButton, setShowBackButton] = useState<boolean>(false);
    const [showSherpaRomeo, setShowSherpaRomeo] = useState<boolean>(false);
    const [showFileRename, setShowFileRename] = useState<boolean>(false);
    const [showAuthors, setShowAuthors] = useState<boolean>(false);
    const [tab, setTab] = useState<Tabs.Tab | undefined>(undefined);

    useEffect(() => {
        console.log("useEffect");
        const getTab = async () => {
            var tab = (await browser.tabs.query({ active: true, currentWindow: true })).pop();
            if (tab != undefined) {
                setTab(tab);
            }
        }
        getTab();
    }, []);

    function Modules() {
        if (showAPAGenerator) {
            return <ApaGenerator tab={tab} />
        }
        if (showKeywords) {
            return <Keywords tab={tab} />
        }
        if (showSherpaRomeo) {
            return <SherpaRomeo tab={tab} />
        }
        if (showFileRename) {
            return <FileRename />
        }
        if (showAuthors) {
            return <Authors tab={tab} />
        }
    }


    function Buttons() {
        if (showBackButton) {
            return <Button variant="outlined" startIcon={<ArrowBackIosIcon />} onClick={backButtonClick}>Atras</Button>
        } else {

            return <>
                <Button variant="contained" startIcon={<NotesIcon />} onClick={() => {
                    setShowAPAGenerator(true);
                    setShowBackButton(true)
                }}>APA Generator</Button>
                <Button variant="contained" startIcon={<AbcIcon />} onClick={() => {
                    setShowKeywords(true);
                    setShowBackButton(true)
                }}>Keywords</Button>
                <Button variant="contained" startIcon={<FindInPageIcon />} onClick={() => {
                    setShowSherpaRomeo(true);
                    setShowBackButton(true)
                }}>Sherpa Romeo</Button>
                <Button variant="contained" startIcon={<DriveFileRenameOutlineIcon />} onClick={() => {
                    setShowFileRename(true);
                    setShowBackButton(true)
                }}>Nombre Archivo</Button>
                <Button variant="contained" startIcon={<PersonIcon />} onClick={() => {
                    setShowAuthors(true);
                    setShowBackButton(true)
                }}>Autores</Button>
            </>
        }

    }


    function backButtonClick() {
        setShowAPAGenerator(false);
        setShowKeywords(false);
        setShowBackButton(false);
        setShowSherpaRomeo(false);
        setShowFileRename(false);
        setShowAuthors(false);
    }

    return (
        <ThemeProvider theme={themeAuto}>
            <Stack direction="column" spacing={2} justifyContent={"center"}>
                <Typography variant="h4">Buleria Helper</Typography>
                <Buttons />
                <Modules />
            </Stack>
        </ThemeProvider>
    );
}

export default App;
