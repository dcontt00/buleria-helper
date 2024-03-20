import PublisherPolicyData from "@/components/SherpaRomeo/PublisherPolicyData";
import { PublisherPolicy } from "@/types";
import { themeLight } from "@/utils/theme";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { Button, ThemeProvider } from "@mui/material";
import { useState } from "react";

import getPublisherPolicies from "./common";
export default function SherpaRomeoButton({ issns }: { issns: string[] }) {
    const [publisherPolicies, setPublisherPolicies] = useState<PublisherPolicy[]>([]);
    const [issn, setIssn] = useState<string>("");
    const [notFound, setNotFound] = useState<boolean>(false);

    async function onClick() {
        for (const value of issns) {
            var response = await getPublisherPolicies(value);
            if (response.length > 0) {
                setPublisherPolicies(response);
                setIssn(value);
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
            <Button variant="contained" onClick={onClick} startIcon={<FindInPageIcon />}>Buscar en SherpaRomeo</Button>
            {publisherPolicies.length > 0 &&
                <>
                    <br />
                    <br />

                </>
            }

            <PublisherPolicyData PublisherPolicies={publisherPolicies} issn={issn} notFound={notFound} cols={12} />
        </ThemeProvider>
    );
}