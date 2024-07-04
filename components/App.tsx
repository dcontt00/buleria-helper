import ApaGenerator from '@/components/ApaGenerator';
import Authors from '@/components/Authors';
import FileRename from '@/components/FileRename';
import Keywords from '@/components/Keywords';
import SherpaRomeo from '@/components/SherpaRomeo';
import {themeAuto} from '@/utils/theme';
import AbcIcon from '@mui/icons-material/Abc';
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import NotesIcon from '@mui/icons-material/Notes';
import PersonIcon from '@mui/icons-material/Person';
import {Button, Stack, ThemeProvider, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {browser, Tabs} from 'wxt/browser';
import './App.css';
import DOISearch from './DOISearch';

type ComponentName = 'ApaGenerator' | 'Keywords' | 'SherpaRomeo' | 'FileRename' | 'Authors' | 'DOISearch';

function App() {
    const [activeComponent, setActiveComponent] = useState<ComponentName | null>(null);
    const [tab, setTab] = useState<Tabs.Tab | undefined>(undefined);


    const componentsMap = {
        ApaGenerator: <ApaGenerator tab={tab}/>,
        Keywords: <Keywords tab={tab}/>,
        SherpaRomeo: <SherpaRomeo tab={tab}/>,
        FileRename: <FileRename/>,
        Authors: <Authors tab={tab}/>,
        DOISearch: <DOISearch tab={tab}/>
    };

    const handleButtonClick = (componentName: ComponentName) => {
        setActiveComponent(componentName);
    };

    const backButtonClick = () => {
        setActiveComponent(null);
    };
    useEffect(() => {
        console.log("useEffect");
        const getTab = async () => {
            var tab = (await browser.tabs.query({active: true, currentWindow: true})).pop();
            if (tab != undefined) {
                setTab(tab);
            }
        }
        getTab();
    }, []);

    function Modules() {
        return activeComponent ? componentsMap[activeComponent] || null : null;
    }

    async function navigateToGithub() {
        await browser.tabs.create({url: "https://github.com/dcontt00/buleria-helper/releases/latest"});
    }

    function Buttons() {
        const buttonData = [
            {text: "APA Generator", icon: <NotesIcon/>, action: () => handleButtonClick("ApaGenerator")},
            {text: "Keywords", icon: <AbcIcon/>, action: () => handleButtonClick("Keywords")},
            {
                text: "Sherpa Romeo", icon: <FindInPageIcon/>, action: () => {
                    handleButtonClick("SherpaRomeo")
                }
            },
            {
                text: "Buscar DOI", icon: <ManageSearchIcon/>, action: () => {
                    handleButtonClick("DOISearch")
                }
            },
            {
                text: "Nombre Archivo", icon: <DriveFileRenameOutlineIcon/>, action: () => {
                    handleButtonClick("FileRename")
                }
            },
            {
                text: "Autores", icon: <PersonIcon/>, action: () => {
                    handleButtonClick("Authors")
                }
            }
        ];

        if (activeComponent) {
            return <Button variant="outlined" startIcon={<ArrowBackIosIcon/>} onClick={() => {
                setActiveComponent(null);
            }}>Atras</Button>;
        } else {
            return (
                <>
                    {buttonData.map((button, index) => (
                        <Button
                            key={index}
                            variant="contained"
                            startIcon={button.icon}
                            onClick={button.action}>
                            {button.text}
                        </Button>
                    ))}
                    <Button onClick={navigateToGithub} variant="outlined" startIcon={<InstallDesktopIcon/>}>Instalar en
                        otro
                        navegador</Button>
                </>
            );
        }
    }

    return (
        <ThemeProvider theme={themeAuto}>
            <Stack direction="column" spacing={2} justifyContent={"center"}>
                <Typography variant="h4">Buleria Helper</Typography>
                <Buttons/>
            </Stack>
            <br/>
            <Modules/>
        </ThemeProvider>
    );
}

export default App;
