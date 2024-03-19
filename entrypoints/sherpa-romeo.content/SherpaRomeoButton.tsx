import PublisherPolicyData from "@/components/SherpaRomeo/PublisherPolicyData";
import { PublisherPolicy } from "@/types";
import { themeLight } from "@/utils/theme";
import { Alert, Button, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import getPublisherPolicies from "./common";
export default function SherpaRomeoButton({ issns }: { issns: string[] }) {
    const [publisherPolicies, setPublisherPolicies] = useState<PublisherPolicy[]>([]);
    const [issn, setIssn] = useState<string>("");
    const [notFound, setNotFound] = useState<boolean>(false);

    async function onClick() {
        for (const issn of issns) {
            var response = await getPublisherPolicies(issn);
            if (response.length > 0) {
                setPublisherPolicies(response);
                setIssn(issn);
                setNotFound(false);
                return;
            }
        }

        if (publisherPolicies.length === 0) {
            setNotFound(true);
        }
    }
    return (
        <ThemeProvider theme={themeLight}>
            <div className="col-xs-6" >
                <Button variant="contained" onClick={onClick}>Buscar en SherpaRomeo</Button>
            </div>
            <br />
            <br />
            {
                notFound &&
                <div className="col-xs-12 needs-xs-spacing">

                    <Alert hidden={false} severity="error"><Typography sx={{ fontSize: "14px" }}>No se encuentra en Sherpa Romeo</Typography></Alert>
                </div>
            }
            {publisherPolicies.length > 0 &&
                <div className="col-xs-12 needs-xs-spacing">

                    <Typography sx={{ fontSize: "16px" }}><b>ISSN:</b> {issn}</Typography>
                </div>
            }
            <PublisherPolicyData PublisherPolicies={publisherPolicies} />
        </ThemeProvider>
    );
}