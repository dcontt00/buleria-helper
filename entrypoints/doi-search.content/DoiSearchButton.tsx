import DoiInfo from "@/classes/DoiInfo";
import DoiInfoComponent from "@/components/DOISearch/DoiInfoComponent";
import { themeLight } from "@/utils/theme";
import { Alert, Button, ThemeProvider, Typography } from "@mui/material";
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
            <div className="col-xs-6" >
                <Button variant="contained" onClick={onClick}>Buscar DOI</Button>
            </div>
            <br />
            <br />
            {
                notFound &&
                <div className="col-xs-12 needs-xs-spacing">

                    <Alert hidden={false} severity="error"><Typography sx={{ fontSize: "14px" }}>No se encuentra DOI</Typography></Alert>
                </div>
            }
            <br />

            <DoiInfoComponent doiInfo={doiInfo} />
        </ThemeProvider>
    );
}