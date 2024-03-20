import DoiInfo from "@/classes/DoiInfo";
import DoiInfoComponent from "@/components/DOISearch/DoiInfoComponent";
import { themeLight } from "@/utils/theme";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { Button, ThemeProvider } from "@mui/material";
import { useState } from "react";
import getDoiInfo from "./common";
export default function DoiSearchButton({ doi }: { doi: string }) {
    const [doiInfo, setDoiInfo] = useState<DoiInfo | undefined>(undefined);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [open, setOpen] = useState(false);

    async function onClick() {
        var response = await getDoiInfo(doi);
        if (response != undefined) {
            setDoiInfo(response);
            setNotFound(false);
            return;
        }
        setNotFound(true);
        setOpen(!open);


    }
    return (
        <ThemeProvider theme={themeLight}>
            <Button variant="contained" onClick={onClick} startIcon={<SearchIcon />} endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}>Buscar DOI</Button>
            <br />
            <br />

            <DoiInfoComponent doiInfo={doiInfo} notFound={notFound} />
        </ThemeProvider>
    );
}