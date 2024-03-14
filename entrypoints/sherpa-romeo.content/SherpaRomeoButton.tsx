import PublisherPolicyData from "@/components/SherpaRomeo/PublisherPolicyData";
import { PublisherPolicy } from "@/types";
import { themeLight } from "@/utils/theme";
import { Button, ThemeProvider } from "@mui/material";
import { useState } from "react";
import getPublisherPolicies from "./common";
export default function SherpaRomeoButton({ issn }: { issn: string }) {
    const [publisherPolicies, setPublisherPolicies] = useState<PublisherPolicy[]>([]);

    async function onClick() {
        var response = await getPublisherPolicies(issn);
        setPublisherPolicies(response);
    }
    return (
        <ThemeProvider theme={themeLight}>
            <div className="col-xs-12 needs-xs-spacing" >
                <Button variant="contained" onClick={onClick}>Buscar en SherpaRomeo</Button>
            </div>
            <br />
            <br />


            <PublisherPolicyData PublisherPolicies={publisherPolicies} />
        </ThemeProvider>
    );
}