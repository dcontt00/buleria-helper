import { getFileNameFromTitle } from "@/utils/stringUtils";
import { themeLight } from "@/utils/theme";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Button, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface TitleTextfieldProps {
    title: string;
}

export default function TitleTextfield({ title }: TitleTextfieldProps) {
    const [value, setValue] = useState<string>(getFileNameFromTitle(title));
    useEffect(() => {
        let titleElement = document.getElementById(
            "aspect_submission_StepTransformer_field_dc_title"
        ) as HTMLInputElement;

        const handleInputChange = () => {
            setValue(getFileNameFromTitle(titleElement.value));
        };

        titleElement.addEventListener('input', handleInputChange);

        return () => {
            titleElement.removeEventListener('input', handleInputChange);
        };
    }, []);
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };
    return (
        <ThemeProvider theme={themeLight}>
            <Stack direction="row" spacing={2}>
                <Typography>Copia este titulo para ponerselo al archivo en el paso siguiente</Typography>
                <TextField id="title" label="Título de archivo" variant="outlined" fullWidth
                    InputLabelProps={{ style: { fontSize: 16 } }}
                    InputProps={{ style: { fontSize: 16 } }}
                    value={value}
                />
                <Button variant="contained" onClick={handleCopy} startIcon={<FileCopyIcon />} >Copiar</Button>
            </Stack>
        </ThemeProvider>
    )
}