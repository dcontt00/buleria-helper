import { DocumentType } from "@/types";
import { themeLight } from "@/utils/theme";
import { Button, MenuItem, Select, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { getCitationInfoSubmit, pasteCitation } from "./common";
export default function APAGeneratorButton() {
    const [documentType, setDocumentType] = useState<DocumentType>('Articulo');

    function onClick() {
        var citation = getCitationInfoSubmit(documentType);
        console.log(citation);
        pasteCitation(citation);
    }

    function onSelectChange(event: { target: { value: string; }; }) {
        setDocumentType(event.target.value as DocumentType);
    }

    return (
        <ThemeProvider theme={themeLight}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={documentType}
                label="Age"
                onChange={onSelectChange}
            >
                <MenuItem value="Articulo">Articulo</MenuItem>
                <MenuItem value="Libro">Libro</MenuItem>
                <MenuItem value="Capítulolibro">Capítulo libro</MenuItem>
            </Select>
            <Button variant="contained" onClick={onClick}>Pegar APA</Button>
        </ThemeProvider>
    );
}