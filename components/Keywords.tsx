import { browser } from "wxt/browser"
import { Tabs } from "webextension-polyfill/namespaces/tabs";
import React, { useEffect, useState } from "react";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { sendMessage } from "@/messaging";
async function waitForTabComplete(tabId: number) {
    return new Promise(resolve => {
        const checkTabStatus = async () => {
            const tab = await browser.tabs.get(tabId);
            if (tab.status === 'complete') {
                resolve(true);
                console.log("done");
            } else {
                console.log("waiting");
                setTimeout(checkTabStatus, 100); // Check every 100ms
            }
        };
        checkTabStatus();
    });
}

export default function Keywords() {
    const urlPatters = [
        /^https:\/\/buleria\.unileon\.es\/admin\/item\?administrative-continue=\w+&submit_metadata$/,
        /^https:\/\/buleria\.unileon\.es\/handle\/\d+\/\d+\/submit\/[\da-f]+\.continue$/
    ]
    const [tab, setTab] = useState<Tabs.Tab | undefined>(undefined);
    const [keywordsString, setKeywordsString] = useState<string>("");
    useEffect(() => {
        const getTab = async () => {
            var tab = (await browser.tabs.query({ active: true, currentWindow: true })).pop();
            if (tab != undefined) {
                setTab(tab);
                if (urlPatters.some(pattern => pattern.test(tab.url))) {
                    console.log(tab.url)
                } else {
                    console.log("bad");
                }
            }
        }
        getTab();
    }, []);

    async function onClick() {
        if (keywordsString == undefined) {
            return;
        }

        var separator = ',';
        if (keywordsString.includes(';')) {
            separator = ';';
        }
        var keywords: string[] = keywordsString.split(separator);

        for (const keyword of keywords) {
            await sendMessage('pasteKeyword', keyword, tab.id);
            await waitForTabComplete(tab?.id);
        }

    }

    return (
        <>
            <Typography variant="body1">Introduce la cadena de keywords para separarlas</Typography>
            <TextField id="outlined-basic" label="Palabras clave" variant="outlined" value={keywordsString} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setKeywordsString(event.target.value)
            }} />
            <Button variant="contained" color="primary" onClick={onClick}>Aceptar</Button>
        </>
    )
}
async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}