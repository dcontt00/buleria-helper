import { ThemeProvider } from "@emotion/react";
import { ContentCopy } from "@mui/icons-material";
import { Button } from "@mui/material";

interface CopyDoiButtonProps {
    doi: string;
}

export default function CopyDoiButton({ doi }: CopyDoiButtonProps) {


    async function onClick() {
        await navigator.clipboard.writeText(doi);
    }

    return (
        <ThemeProvider theme={themeLight}>

            <Button variant="contained" onClick={onClick} startIcon={<ContentCopy />}>Copiar DOI</Button>
        </ThemeProvider>
    )
}