import { PublisherPolicy } from "@/types";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BackupIcon from '@mui/icons-material/Backup';
import ChecklistIcon from '@mui/icons-material/Checklist';
import CopyrightIcon from '@mui/icons-material/Copyright';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FolderIcon from '@mui/icons-material/Folder';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Link, Stack, TextField, Typography } from "@mui/material";
export default function SherpaRomeo({ PublisherPolicies }: { PublisherPolicies: PublisherPolicy[] }) {


    const handleCopy = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    function Conditions(PublisherPolicy: PublisherPolicy) {
        if (PublisherPolicy.conditions != undefined && PublisherPolicy.conditions.length !== 0) {
            return (
                <>
                    <Grid item xs={5}>
                        <Stack direction="row" spacing={1}>
                            <ChecklistIcon />
                            <Typography variant="body1" align="left">Condiciones</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={7}>
                        {PublisherPolicy.conditions.map((condition, index) => {
                            return (
                                <Typography variant="body1" key={index} align="left">{condition}</Typography>
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
                            <FolderIcon />
                            <Typography variant="body1" align="left">Localizacion</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={7}>
                        {PublisherPolicy.locations.map((location, index) => {
                            return (
                                <Typography variant="body1" key={index} align="left">{location}</Typography>
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
                            <ReceiptLongIcon />
                            <Typography variant="body1" align="left">Licencia</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="body1" align="left">{PublisherPolicy.license}</Typography>
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
                            <HourglassBottomIcon />
                            <Typography variant="body1" align="left">Embargo</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="body1" align="left">{PublisherPolicy.embargo} </Typography>
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
                            <CopyrightIcon />
                            <Typography variant="body1" align="left">Copyright Owner</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant="body1" align="left">{PublisherPolicy.copyrightOwner} </Typography>
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
                            <BackupIcon />
                            <Typography variant="body1" align="left">Publisher Deposit</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={7}>
                        <Link href={PublisherPolicy.publisherDeposit.url} target="_blank" rel="noopener noreferrer">
                            <Typography variant="body1" align="left">{PublisherPolicy.publisherDeposit.name} </Typography>
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
                        <AttachMoneyIcon />
                        <Typography variant="body1" align="left">Open Access Fee</Typography>
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
                        <AttachMoneyIcon />
                    </Grid>
                )}

                {PublisherPolicy.embargo != undefined && (
                    <Grid item>

                        <Stack direction="row" spacing={1}>
                            <HourglassBottomIcon />
                            <Typography variant="body1" align="left">{PublisherPolicy.embargo === "No embargo" ? "None" : PublisherPolicy.embargo}</Typography>
                        </Stack>
                    </Grid>
                )}
                {PublisherPolicy.license != undefined && (
                    <Grid item>

                        <Stack direction="row" spacing={1}>
                            <ReceiptLongIcon />
                            <Typography variant="body1" align="left">{PublisherPolicy.license}</Typography>
                        </Stack>
                    </Grid>
                )}
                {PublisherPolicy.publisherDeposit != undefined && (

                    <Grid item>

                        <Stack direction="row" spacing={1}>
                            <BackupIcon />
                            <Typography variant="body1" align="left">{PublisherPolicy.publisherDeposit.name}</Typography>
                        </Stack>
                    </Grid>
                )}
                {PublisherPolicy.conditions != undefined && (
                    <Grid item>
                        <ChecklistIcon />
                    </Grid>
                )}
                {PublisherPolicy.locations != undefined && (
                    <Grid item>
                        <Stack direction="row" spacing={1}>
                            <FolderIcon />
                            <Typography variant="body1" align="left">{formatLocations(PublisherPolicy.locations)}</Typography>
                        </Stack>
                    </Grid>
                )}

            </Grid>
        );
    }

    return (
        <>
            {PublisherPolicies.length > 0 &&
                <Stack direction="row" spacing={1}>
                    <TextField id="title" label="Editorial" variant="outlined" fullWidth
                        InputLabelProps={{ style: { fontSize: 16 } }}
                        InputProps={{ style: { fontSize: 16 } }}
                        value={PublisherPolicies[0].publisherName}
                        multiline
                    />
                    <Button variant="contained" onClick={() => handleCopy(PublisherPolicies[0].publisherName)} startIcon={<FileCopyIcon />} >Copiar</Button>
                </Stack>
            }
            {PublisherPolicies.map((PublisherPolicy, index) => {
                return (
                    <div className="col-xs-6" >
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ArrowDownwardIcon />}
                            >
                                <Stack direction="column" spacing={1}>
                                    <Typography variant="body1" align="center">{PublisherPolicy.articleVersion}</Typography>
                                    <Icons PublisherPolicy={PublisherPolicy} />
                                </Stack>
                            </AccordionSummary>

                            <AccordionDetails>
                                {PublisherPolicy.oafee}
                                <Grid container spacing={2} key={index}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">{PublisherPolicy.articleVersion}</Typography>
                                    </Grid>
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
                    </div>
                )
            })}
        </>
    )
}