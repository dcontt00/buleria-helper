import { Paper, LinearProgress, Typography, Stack } from "@mui/material";

interface ProgressProps {
    progress: number;
    showProgress: boolean;
    text: string;
}
export default function ProgressComponent({ progress, showProgress, text }: ProgressProps) {
    if (showProgress) {

        return (
            <Paper sx={{ p: 2 }} >
                <Typography>{text}</Typography>
                <Stack direction="row" spacing={3} alignItems="center">
                    <LinearProgress sx={{ width: "100%" }} variant="determinate" value={progress} />
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        progress,
                    )}%`}</Typography>
                </Stack>
            </Paper>
        )
    }
}