import { browser } from "wxt/browser"
import { Tabs } from "webextension-polyfill/namespaces/tabs";
import React, { useEffect, useState } from "react";
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { PublisherPolicy } from "@/types";
import PublisherPolicyData from "./PublisherPolicyData";
import LaunchIcon from '@mui/icons-material/Launch';
import SearchIcon from '@mui/icons-material/Search';
import ComponentProps from "@/interfaces/ComponentProps";
import getPublisherPolicies from "@/entrypoints/sherpa-romeo.content/common";

export default function SherpaRomeo({ tab }: ComponentProps) {
    const urlPatters = [
        /^https:\/\/buleria\.unileon\.es\/admin\/item\?administrative-continue=\w+&submit_metadata$/,
        /^https:\/\/buleria\.unileon\.es\/handle\/\d+\/\d+\/submit\/[\da-f]+\.continue$/
    ]
    const [issn, setIssn] = useState<string>("");
    const [publisherPolicies, setPublisherPolicies] = useState<PublisherPolicy[]>([]);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");


    useEffect(() => {
        const getTab = async () => {
            if (tab != undefined) {
                if (urlPatters.some(pattern => pattern.test(tab.url))) {
                    console.log(tab.url)
                } else {
                    console.log("bad");
                }
            }
        }
        getTab();
    }, []);


    async function searchOnSherpaRomeo() {
        var response = await getPublisherPolicies(issn);
        if (response.length > 0) {
            setNotFound(false);
            setUrl(response[0].url);
            setPublisherPolicies(response);
        } else {
            setNotFound(true);
        }
    }

    async function navigateToSherpaRomeo() {
        await browser.tabs.create({ url: url });
    }

    function onTextFieldChange(event: React.ChangeEvent<HTMLInputElement>) {

        setIssn(event.target.value.replaceAll(" ", ""));
        if (event.target.value.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }

    return (
        <Stack direction={"column"} spacing={2}>
            <Typography variant="body1">Introduce el ISSN</Typography>

            <TextField label="ISSN" variant="outlined" value={issn} onChange={onTextFieldChange} />
            <Button variant="contained" startIcon={<SearchIcon />} onClick={searchOnSherpaRomeo}
                disabled={buttonDisabled}>Buscar</Button>
            {
                url != "" &&
                <Button variant="contained" startIcon={<LaunchIcon />} onClick={navigateToSherpaRomeo}>Ver en
                    SherpaRomeo</Button>
            }
            <PublisherPolicyData PublisherPolicies={publisherPolicies} />
            {
                notFound && <Alert hidden={false} severity="error">No se encuentra en Sherpa Romeo</Alert>
            }
        </Stack>
    )
}
