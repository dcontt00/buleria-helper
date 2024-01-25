import { Button, MenuItem, Select } from "@mui/material";
import { pasteCitation, getCitationInfoSubmit, generateCitation } from "./common";
import { ThemeProvider } from "@mui/material";
import { themeLight } from "@/utils/theme";
import { useEffect, useState } from "react";
import { DocumentType } from "@/types";
export default function APAGeneratorButton() {
    const [documentType, setDocumentType] = useState<DocumentType>('Articulo');

    function onClick() {
        var citation = getCitationInfoSubmit(documentType);
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