import DoiInfo from "@/classes/DoiInfo";
import PersonIcon from '@mui/icons-material/Person';
import {Alert, Button, Chip, Grid, Paper, TextField, Typography} from "@mui/material";
import CopyTextField from "./CopyTextfield";
import {Author} from "@/types";
import {useState} from "react";

interface DoiInfoComponentProps {
    doiInfo: DoiInfo | undefined;
    notFound: boolean;
}

export default function DoiInfoComponent({doiInfo, notFound}: DoiInfoComponentProps) {
    const [showAlert, setShowAlert] = useState<boolean>(false);

    async function fetchAuthors() {
        await storage.removeItem("local:authors");
        await storage.setItem("local:authors", doiInfo?.authors);
        setShowAlert(true);
    }


    if (notFound) {
        return (
            <Alert hidden={false} severity="error"><Typography sx={{fontSize: "14px"}}>No se encuentra DOI</Typography></Alert>
        )
    }

    if (doiInfo != undefined) {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CopyTextField label="Titulo" text={doiInfo.title} fullWidth multiline/>
                </Grid>
                <Grid item xs={12}>
                    <CopyTextField label="Revista" text={doiInfo.journal} fullWidth multiline/>
                </Grid>
                <Grid item xs={12}>
                    <CopyTextField label="Editorial" text={doiInfo.publisher} fullWidth multiline/>
                </Grid>
                <Grid item xs={6}>
                    <CopyTextField label="Tipo" text={doiInfo.type} fullWidth multiline/>
                </Grid>
                {
                    doiInfo.ISSN != undefined &&
                    <Grid item xs={6}>
                        <CopyTextField label="ISSN" text={doiInfo.ISSN.join(",")} fullWidth multiline/>
                    </Grid>
                }
                <Grid item xs={12}>
                    <Paper sx={{p: 2}}>

                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography sx={{fontSize: "16px"}} variant="body1">Autores</Typography>
                            </Grid>

                            {doiInfo.authors.map((author, index) => {
                                    return (
                                        <Grid item key={index}>
                                            <Chip key={index} label={`${author.name}, ${author.surname}`}
                                                  icon={<PersonIcon/>} style={{fontSize: "14px"}}/>
                                        </Grid>
                                    )
                                }
                            )}

                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={fetchAuthors}>Añadir a modulo autores</Button>
                </Grid>

                <Grid item xs={12}>
                    {
                        showAlert && (

                            <Alert severity="info"><Typography sx={{fontSize: "14px"}}>
                                Se han añadido los autores al modulo autores
                            </Typography> </Alert>
                        )
                    }
                </Grid>

                <Grid item xs={12}>
                    <CopyTextField label="DOI" text={doiInfo.DOI} fullWidth multiline/>
                </Grid>
                <Grid item xs={6}>
                    <CopyTextField label="Fecha" text={doiInfo.date} fullWidth multiline/>
                </Grid>
                {
                    doiInfo.pages != undefined &&
                    <Grid item xs={6}>
                        <CopyTextField label="Páginas" text={doiInfo.pages} fullWidth/>
                    </Grid>
                }
                {
                    doiInfo.volume != undefined &&
                    <Grid item xs={doiInfo.number == undefined ? 6 : 3}>
                        <CopyTextField label="Volumen" text={doiInfo.volume} fullWidth multiline/>
                    </Grid>
                }

                {doiInfo.number != undefined &&
                    <Grid item xs={doiInfo.volume == undefined ? 6 : 3}>
                        <CopyTextField label="Numero" text={doiInfo.number} fullWidth multiline/>
                    </Grid>
                }

            </Grid>
        )
    }
}