import { browser } from "wxt/browser"
import { Tabs } from "webextension-polyfill/namespaces/tabs";
import { sendMessage } from "@/utils/messaging";
import CitationInfo from "@/interfaces/CitationInfo";
import { useEffect, useState } from "react";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material";
import HideAlert from "./HideAlert";
import ComponentProps from "@/interfaces/ComponentProps";
export default function ApaGenerator({ tab }: ComponentProps) {
    const urlPatters = [
        /^https?:\/\/buleria\.unileon\.es\/admin\/item\?administrative-continue=\w+&submit_metadata$/,
        /^https?:\/\/buleria\.unileon\.es\/handle\/\d+\/\d+\/submit\/[\da-f]+\.continue$/,
        /^https?:\/\/buleria\.unileon\.es\/handle\/\d+\/\d+\/workflow_edit_metadata\?workflowID=WW\d+$/
    ]

    const [citationInfo, setCitationInfo] = useState<CitationInfo | undefined>(undefined);
    const [citation, setCitation] = useState<string | undefined>(undefined);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    useEffect(() => {
        console.log("useEffect");
        const apa = async () => {
            if (tab != undefined) {
                if (urlPatters.some(pattern => pattern.test(tab.url))) {
                    await generateAPA(tab);
                } else {
                    console.log("bad");
                }
            }
        }
        apa();
    }, []);


    async function generateAPA(tab?: Tabs.Tab) {
        console.log("Generating APA");
        try {
            if (tab) {
                const response = await sendMessage('getCitationInfo', undefined, tab.id);
                // Check every atributte is defined
                console.log(response);
                if (response != undefined) {

                    setCitationInfo(response);
                    setCitation(generateCitation(response));
                } else {
                    setCitation("No se ha podido generar la cita");
                    console.log("Response is undefined");
                }
            } else {
                console.log("Tab is undefined");
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
        <Stack direction={"column"} spacing={2}>

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
                <Button variant="contained" startIcon={<ContentCopyIcon />} onClick={copyToClipboard}>Copiar al portapapeles</Button>
                <Button variant="contained" startIcon={<ContentPasteIcon />} onClick={pasteAPA}>Pegar APA</Button>
                <HideAlert show={showAlert} setShow={setShowAlert} message={alertMessage} severity="success" />
            </Stack>
        </Stack>
    )
}
/**
 * Generates an APA citation based on the information provided by the user.
 */
function generateCitation(citationInfo: CitationInfo): string {
    var citation = `${citationInfo.authors} (${citationInfo.date}). ${citationInfo.title}. ${citationInfo.journal}`;
    if (citationInfo.volume) {
        citation += `, ${citationInfo.volume}`;
    }
    if (citationInfo.doi) {
        citation += `, ${citationInfo.doi}`;
    }
    return citation
}
