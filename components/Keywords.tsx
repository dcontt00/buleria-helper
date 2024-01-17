import { browser } from "wxt/browser"
import { Tabs } from "webextension-polyfill/namespaces/tabs";
import React, { useEffect, useState } from "react";
import { Alert, Button, CircularProgress, Grid, LinearProgress, Paper, Stack, TextField, Typography } from "@mui/material";
import { sendMessage } from "@/utils/messaging";
import ComponentProps from "@/interfaces/ComponentProps";
import waitForTabComplete from "@/utils/tabUtils";
import ProgressComponent from "./Progress";


export default function Keywords({ tab }: ComponentProps) {
    const urlPatters = [
        /^https:\/\/buleria\.unileon\.es\/admin\/item\?administrative-continue=\w+&submit_metadata$/,
        /^https:\/\/buleria\.unileon\.es\/handle\/\d+\/\d+\/submit\/[\da-f]+\.continue$/
    ]
    const [keywordsString, setKeywordsString] = useState<string>("");
    const [separator, setSeparator] = useState<string>("");
    const [separatorDetected, setSeparatorDetected] = useState<boolean>(false);
    const [showProgress, setShowProgress] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);



    async function onClick() {
        if (keywordsString == undefined) {
            return;
        }
        var keywords: string[] = keywordsString.split(separator);
        setButtonDisabled(true);
        var increment = 100 / keywords.length;
        setShowProgress(true);
        for (const keyword of keywords) {
            await sendMessage('pasteKeyword', keyword, tab.id);
            await waitForTabComplete(tab?.id);
            setProgress(oldProgress => oldProgress + increment);
        }
        setShowProgress(false);
        setButtonDisabled(false);

    }

    function onTextFieldKeywordChange(event: React.ChangeEvent<HTMLInputElement>) {
        var separators = [',', ';', '.'];
        var separator = separators.find(separator => event.target.value.includes(separator));
        if (separator != undefined) {
            setSeparatorDetected(true);
            setSeparator(separator);
            setButtonDisabled(false);
        } else {
            setSeparatorDetected(false);
            setSeparator("");
            setButtonDisabled(true);
        }
        setKeywordsString(event.target.value);
    }

    function onTextFieldSeparatorChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSeparator(event.target.value);
    }
    return (
        <>
            <Stack direction="column" spacing={1}>
                <Typography variant="body1">Introduce la cadena de keywords para separarlas y añadirlas automáticamente al campo de palabras clave</Typography>
            </Stack>
            <Grid container spacing={1}>
                <Grid item xs={10}>
                    <TextField label="Palabras clave" variant="outlined" fullWidth value={keywordsString} onChange={onTextFieldKeywordChange} />

                </Grid>
                <Grid item xs={2}>
                    <TextField label="Separador" variant="standard" fullWidth value={separator} disabled={separatorDetected} onChange={onTextFieldSeparatorChange} />
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" disabled={buttonDisabled} onClick={onClick}>Aceptar</Button>

            <ProgressComponent progress={progress} showProgress={showProgress} text="Pegando palabras clave" />
            {
                progress == 100 &&
                <Alert severity="success">
                    <Typography variant="body1">Añadidas palabras clave</Typography>
                </Alert>
            }
        </>
    )
}
async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}