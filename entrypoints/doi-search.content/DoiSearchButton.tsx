import DoiInfo from "@/classes/DoiInfo";
import DoiInfoComponent from "@/components/DOISearch/DoiInfoComponent";
import { themeLight } from "@/utils/theme";
import SearchIcon from '@mui/icons-material/Search';
import { Button, ThemeProvider } from "@mui/material";
import { useState } from "react";
import getDoiInfo from "./common";
export default function DoiSearchButton({ doi }: { doi: string }) {
    const [doiInfo, setDoiInfo] = useState<DoiInfo | undefined>(undefined);
    const [notFound, setNotFound] = useState<boolean>(false);

    async function onClick() {
        var response = await getDoiInfo(doi);
        if (response != undefined) {
            setDoiInfo(response);
            setNotFound(false);
            return;
        }
        setNotFound(true);


    }
    return (
        <ThemeProvider theme={themeLight}>
            <Button variant="contained" onClick={onClick} startIcon={<SearchIcon />}>Buscar DOI</Button>
            <br />
            <br />

            <DoiInfoComponent doiInfo={doiInfo} notFound={notFound} />
        </ThemeProvider>
    );
}