import { Button } from "@mui/material";
import { pasteCitation, getCitationInfoSubmit } from "./common";
import { ThemeProvider } from "@mui/material";
import theme from "@/utils/theme";
export default function APAGeneratorButton() {

    function onClick() {
        var citationInfo = getCitationInfoSubmit();
        var citation = generateCitation(citationInfo);
        pasteCitation(citation);
    }
    return (
        <ThemeProvider theme={theme}>

            <Button variant="contained" onClick={onClick}>Pegar APA2</Button>
        </ThemeProvider>
    );
}