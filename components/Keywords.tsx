import { detectSeparator, separateKeywords } from "@/entrypoints/keywords.content/common";
import ComponentProps from "@/interfaces/ComponentProps";
import { sendMessage } from "@/utils/messaging";
import waitForTabComplete from "@/utils/tabUtils";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
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



    async function onAcceptClick() {
        var keywords = separateKeywords(keywordsString, separator);
        await pasteKeywords(keywords);

    }

    /**
     * Paste the given keywords into the keywords field.
     * 
     * @param keywords - An array of keywords to be pasted.
     * @returns {Promise<void>} - A promise that resolves when the keywords are pasted.
     */
    async function pasteKeywords(keywords: string[]) {
        setProgress(0);
        setButtonDisabled(true);
        setShowProgress(true);

        var increment = 100 / keywords.length;
        for (const keyword of keywords) {
            console.log(keyword);
            await sendMessage('pasteKeyword', keyword, tab.id);
            await waitForTabComplete(tab?.id);
            setProgress(oldProgress => oldProgress + increment);
        }
        setShowProgress(false);
        setButtonDisabled(false);
    }



    async function onCorrectClick() {
        // Obtiene keywords que están en una sola linea de la página y las pega en el campo de keywords
        var keywordsString = await sendMessage('getKeywords', undefined, tab.id);
        await waitForTabComplete(tab?.id);
        if (keywordsString != undefined && keywordsString != null) {
            var separator = detectSeparator(keywordsString);
            if (separator != undefined) {
                var keywords = separateKeywords(keywordsString, separator);
                console.log(keywords);
                await pasteKeywords(keywords);
            }
        }
    }

    function manageKeywordsString(keywords: string) {
        var separator = detectSeparator(keywords);
        if (separator != undefined) {
            setSeparatorDetected(true);
            setSeparator(separator);
            setButtonDisabled(false);
        } else {
            setSeparatorDetected(false);
            setSeparator("");
            setButtonDisabled(true);
        }
        setKeywordsString(keywords);
    }

    function onTextFieldKeywordChange(event: React.ChangeEvent<HTMLInputElement>) {
        manageKeywordsString(event.target.value);
    }

    function onTextFieldSeparatorChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSeparator(event.target.value);
        setButtonDisabled(false);
    }
    return (
        <>
            <Stack direction="column" spacing={1}>
                <Typography variant="body1">Si las palabras clave están en 1 sola linea, corregirlo automaticamente</Typography>
                <Button variant="contained" onClick={onCorrectClick}>Corregir Palabras Clave</Button>
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
            <Button variant="contained" color="primary" disabled={buttonDisabled} onClick={onAcceptClick}>Aceptar</Button>

            <ProgressComponent progress={progress} showProgress={showProgress} progressText="Pegando palabras clave" completeText="Añadidas palabras clave" />
        </>
    )
}