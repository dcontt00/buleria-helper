import { getFileNameFromTitle } from "@/utils/stringUtils"
import { Button, IconButton, Paper, Stack, TextField, Tooltip } from "@mui/material"
import { ThemeProvider } from "@mui/material"
import theme from "@/utils/theme"
import FileCopyIcon from '@mui/icons-material/FileCopy';
interface TitleTextfieldProps {
    title: string
}

export default function TitleTextfield({ title }: TitleTextfieldProps) {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(getFileNameFromTitle(title));
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <br />
            <Stack direction="row" spacing={1}>
                <TextField id="title" label="Título de archivo" variant="outlined" fullWidth
                    InputLabelProps={{ style: { fontSize: 16 } }}
                    InputProps={{ style: { fontSize: 16 } }}
                    value={getFileNameFromTitle(title)}
                />
                <Button variant="contained" onClick={handleCopy} startIcon={<FileCopyIcon />} >Copiar</Button>
            </Stack>
        </ThemeProvider>
    )
}