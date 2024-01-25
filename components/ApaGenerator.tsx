import { browser } from "wxt/browser"
import { Tabs } from "webextension-polyfill/namespaces/tabs";
import { sendMessage } from "@/utils/messaging";
import CitationInfo from "@/interfaces/CitationInfo";
import { useEffect, useState } from "react";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Alert, Button, MenuItem, Select, Snackbar, Stack, TextField, Typography } from "@mui/material";
import HideAlert from "./HideAlert";
import ComponentProps from "@/interfaces/ComponentProps";
import { DocumentType } from "@/types";

export default function ApaGenerator({ tab }: ComponentProps) {
    const urlPatters = [
        /^https?:\/\/buleria\.unileon\.es\/admin\/item\?administrative-continue=\w+&submit_metadata$/,
        /^https?:\/\/buleria\.unileon\.es\/handle\/\d+\/\d+\/submit\/[\da-f]+\.continue$/,
        /^https?:\/\/buleria\.unileon\.es\/handle\/\d+\/\d+\/workflow_edit_metadata\?workflowID=WW\d+$/
    ]

    const [citation, setCitation] = useState<string | undefined>(undefined);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [documentType, setDocumentType] = useState<DocumentType>('Articulo');
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

    useEffect(() => {
        const apa = async () => {
            await generateAPA(tab);

        }
        apa();
    }
        , [documentType]);


    async function generateAPA(tab?: Tabs.Tab) {
        console.log("Generating APA");
        try {
            if (tab) {
                const response = await sendMessage('getCitation', documentType, tab.id);
                // Check every atributte is defined
                console.log(response);
                if (response != undefined) {
                    setCitation(response);
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

    async function onSelectChange(event: { target: { value: string; }; }) {
        const value = event.target.value as DocumentType;
        setDocumentType(value);
    }

    return (
        <Stack direction={"column"} spacing={2}>
            <Typography variant="body1">Cita en formato APA</Typography>

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
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={documentType}
                    label="Age"
                    onChange={onSelectChange}
                >
                    <MenuItem value="Articulo">Articulo</MenuItem>
                    <MenuItem value="Libro">Libro</MenuItem>
                    <MenuItem value="Capítulolibro">Capítulo libro</MenuItem>
                </Select>
                <Button variant="contained" startIcon={<ContentCopyIcon />} onClick={copyToClipboard}>Copiar al portapapeles</Button>
                <Button variant="contained" startIcon={<ContentPasteIcon />} onClick={pasteAPA}>Pegar APA</Button>
                <HideAlert show={showAlert} setShow={setShowAlert} message={alertMessage} severity="success" />
            </Stack>
        </Stack>
    )
}
