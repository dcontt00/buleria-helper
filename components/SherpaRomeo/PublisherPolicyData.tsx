import { PublisherPolicy } from "@/types"
import { Grid, Paper, Stack, Typography } from "@mui/material"

export default function SherpaRomeo({ PublisherPolicies }: { PublisherPolicies: PublisherPolicy[] }) {

    function Conditions(PublisherPolicy: PublisherPolicy) {
        if (PublisherPolicy.conditions != undefined && PublisherPolicy.conditions.length !== 0) {
            return (
                <>
                    <Grid item xs={4}>
                        <Typography variant="body1">Condiciones</Typography>
                    </Grid>
                    <Grid item xs={8}>
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
                    <Grid item xs={4}>
                        <Typography variant="body1">Localizacion</Typography>
                    </Grid>
                    <Grid item xs={8}>
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
                    <Grid item xs={4}>
                        <Typography variant="body1">Licencia</Typography>
                    </Grid>
                    <Grid item xs={8}>
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
                    <Grid item xs={4}>
                        <Typography variant="body1">Embargo</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="body1" align="left">{PublisherPolicy.embargo} </Typography>
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