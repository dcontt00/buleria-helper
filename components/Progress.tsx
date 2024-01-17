import { Paper, LinearProgress, Typography, Stack, Alert } from "@mui/material";

interface ProgressProps {
    progress: number;
    showProgress: boolean;
    progressText: string;
    completeText: string;
}
export default function ProgressComponent({ progress, showProgress, progressText, completeText }: ProgressProps) {
    if (showProgress) {

        return (
            <Paper sx={{ p: 2 }} >
                <Typography>{progressText}</Typography>
                <Stack direction="row" spacing={3} alignItems="center">
                    <LinearProgress sx={{ width: "100%" }} variant="determinate" value={progress} />
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        progress,
                    )}%`}</Typography>
                </Stack>
            </Paper>
        )
    } else {

        return (
            <Alert severity="success">
                <Typography variant="body1">{completeText}</Typography>
            </Alert>
        )
    }
};