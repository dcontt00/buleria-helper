import getPublisherPolicies from "@/entrypoints/sherpa-romeo.content/common";
import ComponentProps from "@/interfaces/ComponentProps";
import { PublisherPolicy } from "@/types";
import LaunchIcon from '@mui/icons-material/Launch';
import SearchIcon from '@mui/icons-material/Search';
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { browser } from "wxt/browser";
import PublisherPolicyData from "./PublisherPolicyData";

export default function SherpaRomeo({ tab }: ComponentProps) {
    const [issn, setIssn] = useState<string>("");
    const [text, setText] = useState<string>("")
    const [publisherPolicies, setPublisherPolicies] = useState<PublisherPolicy[]>([]);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");


    async function searchOnSherpaRomeo() {
        var search = text.replaceAll(" ", "");
        var searchValues: string[] = [];
        if (search.includes(",")) {
            searchValues = search.split(",");
        } else {
            searchValues.push(search);
        }

        searchValues.forEach(async (issn) => {
            var response = await getPublisherPolicies(issn);
            if (response.length > 0) {
                setNotFound(false);
                setUrl(response[0].url);
                setPublisherPolicies(response);
                setIssn(issn);
                return;
            }
            setNotFound(true);
        });
    }

    async function navigateToSherpaRomeo() {
        await browser.tabs.create({ url: url });
    }

    function onTextFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
        var value = event.target.value;
        setText(value);

        if (value.length == 0) {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }

    return (
        <Stack direction={"column"} spacing={2}>
            <Typography variant="body1">Introduce el ISSN</Typography>

            <TextField label="ISSN" variant="outlined" value={text} onChange={onTextFieldChange} helperText="Introduce un ISSN o varios separados por comas" />
            <Button variant="contained" startIcon={<SearchIcon />} onClick={searchOnSherpaRomeo}
                disabled={buttonDisabled}>Buscar</Button>
            {
                url != "" &&
                <Button variant="contained" startIcon={<LaunchIcon />} onClick={navigateToSherpaRomeo}>Ver en
                    SherpaRomeo</Button>
            }
            {!notFound && publisherPolicies.length > 0 &&
                <Typography>ISSN: {issn}</Typography>
            }
            <PublisherPolicyData PublisherPolicies={publisherPolicies} />
            {
                notFound && <Alert hidden={false} severity="error">No se encuentra en Sherpa Romeo</Alert>
            }
        </Stack>
    )
}
