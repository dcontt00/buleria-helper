import { PublisherPolicy } from "@/types";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BackupIcon from '@mui/icons-material/Backup';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CopyrightIcon from '@mui/icons-material/Copyright';
import FolderIcon from '@mui/icons-material/Folder';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Grid, Link, Stack, Typography } from "@mui/material";
import CopyTextField from "../DOISearch/CopyTextfield";
export default function SherpaRomeo({ PublisherPolicies, issn, notFound, cols }: { PublisherPolicies: PublisherPolicy[], issn: string, notFound: boolean, cols: number }) {
    function Conditions(PublisherPolicy: PublisherPolicy) {
        if (PublisherPolicy.conditions != undefined && PublisherPolicy.conditions.length !== 0) {
            return (
                <>
                    <Grid item xs={5}>
                        <Stack direction="row" spacing={1}>
                            <ChecklistIcon sx={{ fontSize: "24px" }} />
                            <Typography variant="body1" sx={{ fontSize: "16px" }} align="left">Condiciones</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={7}>
                        {PublisherPolicy.conditions.map((condition, index) => {
                            return (
                                <Typography variant="body1" sx={{ fontSize: "16px" }} key={index} align="left">{condition}</Typography>
                            )

                        }
                        )}
                    </Grid>
                </>
            )
        }
    }

    function Locations(PublisherPolicy: PublisherPolicy) {
        if (PublisherPolicy.locations != undefined && PublisherPolicy.locations.length !== 0) {
            return (
                <>
                    <Grid item xs={5}>
                        <Stack direction="row" spacing={1}>
                            <FolderIcon sx={{ fontSize: "24px" }} />
                            <Typography variant="body1" sx={{ fontSize: "16px" }} align="left">Localizacion</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={7}>
                        {PublisherPolicy.locations.map((location, index) => {
                            return (
                                <Typography variant="body1" sx={{ fontSize: "16px" }} key={index} align="left">{location}</Typography>
                            )

                        }
                        )}
                    </Grid>
                </>
            )
        }
    }

    function Licencia(PublisherPolicy: PublisherPolicy) {
        if (PublisherPolicy.license != undefined) {
            return (
                <>
                    <Grid item xs={5}>
                        <Stack direction="row" spacing={1}>
                            <ReceiptLongIcon sx={{ fontSize: "24px" }} />
                            <Typography variant="body1" sx={{ fontSize: "16px" }} align="left">Licencia</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="body1" sx={{ fontSize: "16px" }} align="left">{PublisherPolicy.license}</Typography>
                    </Grid>
                </>
            )
        }
    }

    function Embargo(PublisherPolicy: PublisherPolicy) {
        if (PublisherPolicy.embargo != undefined) {
            return (
                <>
                    <Grid item xs={5}>
                        <Stack direction="row" spacing={1}>
                            <HourglassBottomIcon sx={{ fontSize: "24px" }} />
                            <Typography variant="body1" sx={{ fontSize: "16px" }} align="left">Embargo</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="body1" sx={{ fontSize: "16px" }} align="left">{PublisherPolicy.embargo} </Typography>
                    </Grid>
                </>
            )
        }
    }
    function CopyrightOwner(PublisherPolicy: PublisherPolicy) {
        if (PublisherPolicy.copyrightOwner != undefined) {
            return (
                <>
                    <Grid item xs={5}>
                        <Stack direction="row" spacing={1}>
                            <CopyrightIcon sx={{ fontSize: "24px" }} />
                            <Typography variant="body1" sx={{ fontSize: "16px" }} align="left">Copyright Owner</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="body1" sx={{ fontSize: "16px" }} align="left">{PublisherPolicy.copyrightOwner} </Typography>
                    </Grid>
                </>
            )
        }
    }
    function PublisherDeposit(PublisherPolicy: PublisherPolicy) {
        if (PublisherPolicy.publisherDeposit != undefined) {
            return (
                <>
                    <Grid item xs={5}>
                        <Stack direction="row" spacing={1}>
                            <BackupIcon sx={{ fontSize: "24px" }} />
                            <Typography variant="body1" sx={{ fontSize: "16px" }} align="left">Publisher Deposit</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={7}>
                        <Link href={PublisherPolicy.publisherDeposit.url} target="_blank" rel="noopener noreferrer">
                            <Typography variant="body1" sx={{ fontSize: "16px" }} align="left">{PublisherPolicy.publisherDeposit.name} </Typography>
                        </Link>
                    </Grid>
                </>
            )


        }
    }

    function oaFee(PublisherPolicy: PublisherPolicy) {
        if (PublisherPolicy.oafee) {
            return (
                <Grid item xs={12}>
                    <Stack direction="row" spacing={1}>
                        <AttachMoneyIcon sx={{ fontSize: "24px" }} />
                        <Typography variant="body1" sx={{ fontSize: "16px" }} align="left">Open Access Fee</Typography>
                    </Stack>
                </Grid>
            )
        }
    }

    function formatLocations(locations: string[]) {
        var length = locations.length;
        var result = locations[0] + " +" + length;
        return result
    }

    function Icons({ PublisherPolicy }: { PublisherPolicy: PublisherPolicy }) {
        return (
            <Grid container spacing={2}>

                {PublisherPolicy.oafee && (
                    <Grid item>
                        <AttachMoneyIcon sx={{ fontSize: "20px" }} />
                    </Grid>
                )}

                {PublisherPolicy.embargo != undefined && (
                    <Grid item>

                        <Stack direction="row" spacing={1}>
                            <HourglassBottomIcon sx={{ fontSize: "20px" }} />
                            <Typography variant="body1" sx={{ fontSize: "16px" }} align="left">{PublisherPolicy.embargo === "No embargo" ? "None" : PublisherPolicy.embargo}</Typography>
                        </Stack>
                    </Grid>
                )}
                {PublisherPolicy.license != undefined && (
                    <Grid item>

                        <Stack direction="row" spacing={1}>
                            <ReceiptLongIcon sx={{ fontSize: "20px" }} />
                            <Typography variant="body1" sx={{ fontSize: "16px" }} align="left">{PublisherPolicy.license}</Typography>
                        </Stack>
                    </Grid>
                )}
                {PublisherPolicy.publisherDeposit != undefined && (

                    <Grid item>

                        <Stack direction="row" spacing={1}>
                            <BackupIcon sx={{ fontSize: "20px" }} />
                            <Typography variant="body1" sx={{ fontSize: "16px" }} align="left">{PublisherPolicy.publisherDeposit.name}</Typography>
                        </Stack>
                    </Grid>
                )}
                {PublisherPolicy.conditions != undefined && (
                    <Grid item>
                        <ChecklistIcon sx={{ fontSize: "20px" }} />
                    </Grid>
                )}
                {PublisherPolicy.locations != undefined && (
                    <Grid item>
                        <Stack direction="row" spacing={1}>
                            <FolderIcon sx={{ fontSize: "20px" }} />
                            <Typography variant="body1" sx={{ fontSize: "16px" }} align="left">{formatLocations(PublisherPolicy.locations)}</Typography>
                        </Stack>
                    </Grid>
                )}

            </Grid>
        );
    }

    return (
        <Grid container spacing={2} columns={cols}>
            {
                notFound &&
                <Grid item xs={12}>
                    <Alert hidden={false} severity="error"><Typography sx={{ fontSize: "14px" }}>No se encuentra en Sherpa Romeo</Typography></Alert>
                </Grid>
            }
            {PublisherPolicies.length > 0 &&
                <Grid item xs={12}>
                    <Typography variant="body1" sx={{ fontSize: "16px" }} ><b>ISSN:</b>{issn}</Typography>
                </Grid>
            }
            {PublisherPolicies.length > 0 &&
                <Grid item xs={12}>
                    <CopyTextField label="Editorial" text={PublisherPolicies[0].publisherName} fullWidth />
                </Grid>
            }
            {PublisherPolicies.map((PublisherPolicy, index) => {
                return (
                    <Grid item xs={6}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ArrowDownwardIcon />}
                            >
                                <Stack direction="column" spacing={1}>
                                    <Typography variant="body1" sx={{ fontSize: "16px" }} align="center">{PublisherPolicy.articleVersion}</Typography>
                                    <Icons PublisherPolicy={PublisherPolicy} />
                                </Stack>
                            </AccordionSummary>

                            <AccordionDetails>
                                {PublisherPolicy.oafee}
                                <Grid container spacing={2} key={index}>
                                    {oaFee(PublisherPolicy)}
                                    {Embargo(PublisherPolicy)}
                                    {Licencia(PublisherPolicy)}
                                    {CopyrightOwner(PublisherPolicy)}
                                    {PublisherDeposit(PublisherPolicy)}
                                    {Locations(PublisherPolicy)}
                                    {Conditions(PublisherPolicy)}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                )
            })}
        </Grid>
    )
}