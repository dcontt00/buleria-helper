import { PublisherPolicy } from "@/types"
import { Box, Grid, Link, Paper, Stack, Typography } from "@mui/material"
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import FolderIcon from '@mui/icons-material/Folder';
import ChecklistIcon from '@mui/icons-material/Checklist';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CopyrightIcon from '@mui/icons-material/Copyright';
import BackupIcon from '@mui/icons-material/Backup';
export default function SherpaRomeo({ PublisherPolicies }: { PublisherPolicies: PublisherPolicy[] }) {

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

    return (
        <Stack direction="column" spacing={2}>
            {
                PublisherPolicies.length !== 0 && PublisherPolicies.map((PublisherPolicy, index) => {
                    return (
                        <Paper key={index} sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
                            <Grid container spacing={2} key={index}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">{PublisherPolicy.articleVersion}</Typography>
                                </Grid>
                                {Embargo(PublisherPolicy)}
                                {Licencia(PublisherPolicy)}
                                {CopyrightOwner(PublisherPolicy)}
                                {PublisherDeposit(PublisherPolicy)}
                                {Locations(PublisherPolicy)}
                                {Conditions(PublisherPolicy)}
                            </Grid>
                        </Paper>

                    )
                }
                )
            }

        </Stack>
    )
}