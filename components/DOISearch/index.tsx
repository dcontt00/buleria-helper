import ComponentProps from "@/interfaces/ComponentProps";
import SearchIcon from '@mui/icons-material/Search';
import { Alert, Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";

import { Author } from "@/types";
import React, { useState } from "react";
import DoiInfo from "../../classes/DoiInfo";
import DoiInfoComponent from "./DoiInfoComponent";

export default function DOISearch({ tab }: ComponentProps) {
    const [text, setText] = useState<string>("")
    const [doiInfo, setDoiInfo] = useState<DoiInfo | undefined>(undefined)
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    function searchDOI() {
        setDoiInfo(undefined);
        setLoading(true);
        axios
            .get(`https://dx.doi.org/${text}`, {

                headers: {
                    Accept: 'application/json',
                },
            }).then((response) => {
                const data = response.data;
                var date = `${data["issued"]["date-parts"][0][0]}`
                if (data["issued"]["date-parts"][0][1] != undefined) {
                    date += `-${data["issued"]["date-parts"][0][1]}`
                }
                if (data["issued"]["date-parts"][0][2] != undefined) {
                    date += `-${data["issued"]["date-parts"][0][2]}`
                }

                var authors: Author[] = data.author.map((author: any) => {
                    return { name: author.given, surname: author.family }
                });

                var doiInfo = new DoiInfo(
                    data.title,
                    data.type,
                    data["container-title"],
                    authors,
                    data.ISSN,
                    data.DOI,
                    date,
                    data.volume,
                    data.number,
                    data.publisher,
                );
                setDoiInfo(doiInfo);
                setNotFound(false);
            }
            ).catch((error: AxiosError) => {
                setNotFound(true);
            }).finally(() => {
                setLoading(false);
            });
    }


    function onTextFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
        var value = event.target.value;

        if (value.includes("doi.org")) {
            value = value.split("doi.org/")[1];
        }
        setText(value);

        if (value.length == 0) {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="body1">Introduce el DOI</Typography>
            </Grid>

            <Grid item xs={12}>
                <TextField label="DOI" fullWidth variant="outlined" value={text} onChange={onTextFieldChange} helperText="Introduce un DOI" />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained"
                    startIcon={<SearchIcon />}
                    onClick={searchDOI}
                    disabled={buttonDisabled}
                    fullWidth
                >
                    Buscar
                </Button>
            </Grid>

            {
                loading &&
                <Grid item xs={12}>
                    <CircularProgress />
                </Grid>
            }

            {
                doiInfo &&
                <Grid item xs={12}>

                    <DoiInfoComponent doiInfo={doiInfo} />
                </Grid>
            }

            {
                notFound &&
                <Grid item xs={12}>
                    <Alert hidden={false} severity="error">No se encuentra el DOI</Alert>
                </Grid>
            }
        </Grid>

    )
}
