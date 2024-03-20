import CopyTextField from "@/components/DOISearch/CopyTextfield";
import { getFileNameFromTitle } from "@/utils/stringUtils";
import { themeLight } from "@/utils/theme";
import { Stack, ThemeProvider, Typography } from "@mui/material";
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
    return (
        <ThemeProvider theme={themeLight}>
            <Stack direction="column" spacing={2}>
                <Typography sx={{ fontSize: "16px" }}>Copia este titulo para ponerselo al archivo en el paso siguiente</Typography>
                <CopyTextField text={value} label="Titulo archivo" fullWidth />
            </Stack>
        </ThemeProvider>
    )
}