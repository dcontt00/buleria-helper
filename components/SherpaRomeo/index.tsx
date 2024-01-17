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

    async function getAPI(): Promise<PublisherPolicy[]> {
        var result = await axios.get("https://v2.sherpa.ac.uk/cgi/retrieve",
            {
                params: {
                    "item-type": "publication",

                    "format": "Json",
                    "limit": 10,
                    "offset": 0,
                    "order": "-id",
                    "filter": JSON.stringify([["issn", "equals", issn]]),
                    "api-key": import.meta.env.VITE_SHERPA_ROMEO_API_KEY,
                },
                headers: {
                    'Accept': "*",
                },
            }
        ).then((response) => {
            var publisherPolicies: PublisherPolicy[] = [];
            setUrl(response.data.items[0].system_metadata.uri)
            for (const PublisherPolicy of response.data.items[0].publisher_policy) {
                for (const PermittedOA of PublisherPolicy.permitted_oa) {
                    try {
                        var license = undefined;
                        var embargo = undefined;

                        var id = PermittedOA.id;
                        if (PermittedOA.article_version_phrases == undefined) {
                            continue;
                        }
                        var articleVersion = PermittedOA.article_version_phrases[0].phrase;
                        var conditions = PermittedOA.conditions;
                        if (PermittedOA.license) {
                            license = PermittedOA.license[0].license_phrases[0].phrase;
                        }

                        if (PermittedOA.embargo) {
                            embargo = PermittedOA.embargo.amount + " " + PermittedOA.embargo.units;
                        } else {
                            embargo = "No embargo";
                        }

                        var locations: string[] = [];
                        for (const Location of PermittedOA.location.location_phrases) {
                            var phrase: string = Location.phrase;
                            locations.push(phrase);
                        }

                        var copyrightOwner;
                        if (PermittedOA.copyright_owner_phrases) {
                            copyrightOwner = PermittedOA.copyright_owner_phrases[0].phrase;
                        }

                        var publiserDeposit = undefined
                        var publisherDepositURL, publisherDepositName;
                        if (PermittedOA.publisher_deposit) {
                            publisherDepositURL = PermittedOA.publisher_deposit[0].repository_metadata.url;
                            publisherDepositName = PermittedOA.publisher_deposit[0].repository_metadata.name[0].name;
                            publiserDeposit = { url: publisherDepositURL, name: publisherDepositName };
                        }

                        var publisherPolicy: PublisherPolicy = {
                            id: id,
                            articleVersion: articleVersion,
                            conditions: conditions,
                            license: license,
                            embargo: embargo,
                            locations: locations,
                            copyrightOwner: copyrightOwner,
                            publisherDeposit: publiserDeposit,
                        }

                        publisherPolicies.push(publisherPolicy);
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
            return publisherPolicies;

        }
        ).catch((error) => {
            console.log(error);
            setNotFound(true);
            return [];
        });
        return result;

    }

    async function searchOnSherpaRomeo() {

        //var response = await sendMessage('getSherpaRomeoInfo', "0340-7004", tab.id);
        var response = await getAPI();
        setPublisherPolicies(response);

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
            <Typography variant="body1">Introduce la cadena de keywords para separarlas</Typography>

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

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}