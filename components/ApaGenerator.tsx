import { browser } from "wxt/browser"
import { Tabs } from "webextension-polyfill/namespaces/tabs";
import { sendMessage } from "@/messaging";
import CitationInfo from "@/interfaces/CitationInfo";
import { useEffect, useState } from "react";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import NotesIcon from '@mui/icons-material/Notes';
import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material";
import HideAlert from "./HideAlert";
export default function ApaGenerator() {
    const urlPatters = [
        /^https:\/\/buleria\.unileon\.es\/admin\/item\?administrative-continue=\w+&submit_metadata$/,
        /^https:\/\/buleria\.unileon\.es\/handle\/\d+\/\d+\/submit\/[\da-f]+\.continue$/
    ]
    const [tab, setTab] = useState<Tabs.Tab | undefined>(undefined);
    const [citationInfo, setCitationInfo] = useState<CitationInfo | undefined>(undefined);
    const [citation, setCitation] = useState<string | undefined>(undefined);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [showModule, setShowModule] = useState<boolean>(false);
    const [showAPAOptions, setShowAPAOptions] = useState<boolean>(false);
    useEffect(() => {
        const getTab = async () => {
            var tab = (await browser.tabs.query({ active: true, currentWindow: true })).pop();
            if (tab != undefined) {
                setTab(tab);
                if (urlPatters.some(pattern => pattern.test(tab.url))) {
                    console.log(tab.url)
                    setShowModule(true);
                } else {
                    console.log("bad");
                }
            }
        }
        getTab();
    }, []);


    async function generateAPA() {
        try {
            if (tab) {
                const response = await sendMessage('getCitationInfo', undefined, tab.id);
                const { title, authors, date, journal, volume, doi } = response;
                // Check every atributte is defined
                if (title && authors && date && journal && volume && doi) {
                    console.log(response);
                    setCitationInfo(response);
                    setCitation(generateCitation(response));
                } else {
                    console.log('Error: Not all attributes are defined');
                }
                console.log(response);
                setShowAPAOptions(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function copyToClipboard() {
        if (citation) {
            try {
                await navigator.clipboard.writeText(citation);
                setAlertMessage("Cita copiada");
                setShowAlert(true);
            } catch (err) {
                console.log('Error al copiar texto al portapapeles: ', err);
            }
        }
    }

    async function pasteAPA() {
        if (tab == undefined) {
            return;
        }
        if (citation) {
            await sendMessage("pasteCitation", citation, tab.id);
            setAlertMessage("Cita pegada");
            setShowAlert(true);
        }
    }
    return (
        <div hidden={!showModule}>
            <Stack direction={"column"} spacing={2}>
                <Button variant="contained" startIcon={<NotesIcon />} onClick={generateAPA}>Generar APA</Button>

                {showAPAOptions &&
                    <>
                        <TextField
                            value={citation}
                            multiline
                            InputProps={{
                                readOnly: true,
                            }}
                            inputProps={{
                                style: { textAlign: "justify" },
                            }}
                            variant="outlined"
                        />
                        <Stack direction={"row"} spacing={2}>
                            <Button variant="contained" startIcon={<ContentCopyIcon />} onClick={copyToClipboard}>Copiar APA al portapapeles</Button>
                            <Button variant="contained" startIcon={<ContentPasteIcon />} onClick={pasteAPA}>Pegar APA</Button>
                            <HideAlert show={showAlert} setShow={setShowAlert} message={alertMessage} severity="success" />
                        </Stack>
                    </>
                }
            </Stack>
        </div>
    )
}
/**
 * Generates an APA citation based on the information provided by the user.
 */
function generateCitation(citationInfo: CitationInfo): string {
    var citation = `${citationInfo.authors} (${citationInfo.date}). ${citationInfo.title}. ${citationInfo.journal}, ${citationInfo.volume}, ${citationInfo.doi}`;
    return citation
}
