import PublisherPolicyData from "@/components/SherpaRomeo/PublisherPolicyData";
import { PublisherPolicy } from "@/types";
import { themeLight } from "@/utils/theme";
import { Alert, Button, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import getPublisherPolicies from "./common";
export default function SherpaRomeoButton({ issns }: { issns: string[] }) {
    const [publisherPolicies, setPublisherPolicies] = useState<PublisherPolicy[]>([]);
    const [issn, setIssn] = useState<string>("");

    async function onClick() {
        issns.forEach(async (issn) => {
            var response = await getPublisherPolicies(issn);
            if (response.length > 0) {
                setPublisherPolicies(response);
                setIssn(issn);
                return;
            }
        });
    }
    return (
        <ThemeProvider theme={themeLight}>
            <div className="col-xs-12 needs-xs-spacing" >
                <Button variant="contained" onClick={onClick}>Buscar en SherpaRomeo</Button>
            </div>
            <br />
            <br />
            {
                publisherPolicies.length < 0 && <Alert hidden={false} severity="error">No se encuentra en Sherpa Romeo</Alert>
            }
            {publisherPolicies.length > 0 &&
                <div className="col-xs-12 needs-xs-spacing">

                    <Typography sx={{ fontSize: "16px" }}><b>ISSN:</b> {issn}</Typography>
                </div>
            }
            <br />



            <PublisherPolicyData PublisherPolicies={publisherPolicies} />
        </ThemeProvider>
    );
}