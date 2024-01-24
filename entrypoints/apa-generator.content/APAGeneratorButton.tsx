import { Button } from "@mui/material";
import { pasteCitation, getCitationInfoSubmit, generateCitation } from "./common";
import { ThemeProvider } from "@mui/material";
import { themeLight } from "@/utils/theme";
export default function APAGeneratorButton() {

    function onClick() {
        var citationInfo = getCitationInfoSubmit();
        var citation = generateCitation(citationInfo, "");
        pasteCitation(citation);
    }
    return (
        <ThemeProvider theme={themeLight}>

            <Button variant="contained" onClick={onClick}>Pegar APA</Button>
        </ThemeProvider>
    );
}