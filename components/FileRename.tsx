import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import HideAlert from "./HideAlert";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function FileRename() {
    const [title, setTitle] = useState<string>("");
    const [filename, setFilename] = useState<string>("");

    /**
     * Transforms a string.
     * 
     * @param input The input string to transform.
     * @returns The transformed string.
     */
    function transformString(input: string): string {

        // Eliminar espacio en blanco inicial si hay
        input = input.trim();

        // Eliminar caracteres especiales
        input = input.replace(/-/g, ' ');

        // Eliminar simbolos puntuacion
        const punctuationRegex = /[.,;?¿¿!(){}\\[\\]-]/g;
        const withoutPunctuation = input.replace(punctuationRegex, '');
        console.log(withoutPunctuation);

        // Eliminar preposiciones, conjunciones y articulos
        const prepositionsAndConjunctions = ["de", "a", "en", "y", "o", "con", "por", "para", "sin", "sobre", "bajo", "entre", "hacia", "desde", "hasta", "según", "durante", "mediante", "versus", "vía", "el", "la", "los", "las", "un", "una", "unos", "unas", "of", "to", "in", "and", "or", "with", "by", "for", "without", "on", "under", "between", "towards", "from", "until", "according", "during", "through", "versus", "via", "the", "a", "an"];
        const words = withoutPunctuation.split(' ').filter(word => !prepositionsAndConjunctions.includes(word.toLowerCase()));

        // Coger las 5 primeras palabras y poner mayuscula la primera letra de cada palabra
        const transformedWords = words.slice(0, 5).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        return transformedWords.join('_');
    }

    function onChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
        const transformedString = transformString(event.target.value);
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