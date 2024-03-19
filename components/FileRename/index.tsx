import { getFileNameFromTitle } from "@/utils/stringUtils";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
export default function FileRename() {
    const [title, setTitle] = useState<string>("");
    const [filename, setFilename] = useState<string>("");


    function onChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
        const transformedString = getFileNameFromTitle(event.target.value);
        setFilename(transformedString);
    }

    async function onClickCopy() {
        await navigator.clipboard.writeText(filename);

    }

    return (
        <Stack direction="column" spacing={2}>
            <Typography variant="body1">Obtén el nombre del archivo a partir del titulo del envio</Typography>
            <TextField label="Titulo del envio" variant="outlined" onChange={onChangeTitle} value={title} />
            <TextField label="Nombre del archivo" variant="outlined" InputProps={{ readOnly: true }} value={filename} />
            <Button variant="contained" startIcon={<ContentCopyIcon />} disabled={filename == ""} onClick={onClickCopy}>Copiar</Button>
        </Stack>
    )
}