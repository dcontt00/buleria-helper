import { ThemeProvider } from "@emotion/react";
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

            <Button variant="contained" onClick={onClick}>Copiar DOI</Button>
        </ThemeProvider>
    )
}