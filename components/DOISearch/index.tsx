import ComponentProps from "@/interfaces/ComponentProps";
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { Alert, Button, Chip, CircularProgress, Grid, Paper, TextField, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";

import { Author } from "@/types";
import React, { useState } from "react";
import CopyTextField from "./CopyTextfield";
import Document from "./Document";

export default function DOISearch({ tab }: ComponentProps) {
    const [text, setText] = useState<string>("")
    const [document, setDocument] = useState<Document | undefined>(undefined)
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    function searchDOI() {
        setDocument(undefined);
        setLoading(true);
        axios
            .get(`http://dx.doi.org/${text}`, {

                headers: {
                    Accept: 'application/json',
                },
            }).then((response) => {
                const data = response.data;
                const date = `${data["issued"]["date-parts"][0][0]}-${data["issued"]["date-parts"][0][1]}-${data["issued"]["date-parts"][0][2]}`
                var authors: Author[] = data.author.map((author: any) => {
                    return { name: author.given, surname: author.family }
                });

                var documentt = new Document(
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
                setDocument(documentt);
                setNotFound(false);
            }
            ).catch((error: AxiosError) => {
                setNotFound(true);
                alert(error.message);
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
                document &&
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>

                            <CopyTextField label="Titulo" text={document.title} fullWidth multiline />
                        </Grid>


                        <Grid item xs={12}>
                            <CopyTextField label="Revista" text={document.journal} fullWidth multiline />
                        </Grid>
                        <Grid item xs={12}>
                            <CopyTextField label="Editorial" text={document.publisher} fullWidth multiline />
                        </Grid>
                        <Grid item xs={6}>
                            <CopyTextField label="Tipo" text={document.type} fullWidth multiline />
                        </Grid>
                        <Grid item xs={6}>
                            <CopyTextField label="ISSN" text={document.ISSN.join(",")} fullWidth multiline />
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2 }}>

                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">Autores</Typography>
                                    </Grid>

                                    {document.authors.map((author, index) => {
                                        return (
                                            <Grid item key={index}>
                                                <Chip key={index} label={`${author.name}, ${author.surname}`} icon={<PersonIcon />} />
                                            </Grid>
                                        )
                                    }
                                    )}
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <CopyTextField label="DOI" text={document.DOI} fullWidth multiline />
                        </Grid>
                        <Grid item xs={6}>
                            <CopyTextField label="Fecha" text={document.date} fullWidth multiline />
                        </Grid>
                        {
                            document.volume != undefined &&
                            <Grid item xs={3}>
                                <CopyTextField label="Volumen" text={document.volume} fullWidth multiline />
                            </Grid>
                        }
                        {document.number != undefined &&
                            <Grid item xs={3}>
                                <CopyTextField label="Numero" text={document.number} fullWidth multiline />
                            </Grid>
                        }

                    </Grid>
                </Grid>
            }

            {
                notFound && <Alert hidden={false} severity="error">No se encuentra el DOI</Alert>
            }
        </Grid>

    )
}
