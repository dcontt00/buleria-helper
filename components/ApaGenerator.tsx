import { browser } from "wxt/browser"
import { Tabs } from "webextension-polyfill/namespaces/tabs";
import { sendMessage } from "@/messaging";
import CitationInfo from "@/interfaces/CitationInfo";
import { useEffect, useState } from "react";
import { Alert, Stack } from "@mui/material";
export default function ApaGenerator() {
    const urlPatters = [
        /^https:\/\/buleria\.unileon\.es\/admin\/item\?administrative-continue=\w+&submit_metadata$/,
        /^https:\/\/buleria\.unileon\.es\/handle\/\d+\/\d+\/submit\/[\da-f]+\.continue$/
    ]
    const [tab, setTab] = useState<Tabs.Tab | undefined>(undefined);
    const [citationInfo, setCitationInfo] = useState<CitationInfo | undefined>(undefined);
    const [citation, setCitation] = useState<string | undefined>(undefined);
    const [showAlertSuccess, setShowAlertSuccess] = useState<boolean>(false);
    const [showModule, setShowModule] = useState<boolean>(false);
    useEffect(() => {
        const getTab = async () => {
            var tab = (await browser.tabs.query({ active: true, currentWindow: true })).pop();
            if (tab != undefined) {
                setTab(tab);
                if (urlPatters.some(pattern => pattern.test(tab.url))) {
                    console.log(tab.url)
                    setShowModule(true);
                } else {
                    console.log("bad");
                }
            }
        }
        getTab();
    }, []);


    async function generateAPA() {
        try {
            if (tab) {
                const response = await sendMessage('getCitationInfo', undefined, tab.id);
                const { title, authors, date, journal, volume, doi } = response;
                // Check every atributte is defined
                if (title && authors && date && journal && volume && doi) {
                    console.log(response);
                    setCitationInfo(response);
                    setCitation(generateCitation(response));
                } else {
                    console.log('Error: Not all attributes are defined');
                }
                console.log(response);
                setShowAlertSuccess(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function pasteAPA() {
        if (tab == undefined) {
            return;
        }
        if (citation) {

            await sendMessage("pasteCitation", citation, tab.id);
        }
    }
    return (
        <div hidden={!showModule}>
            <Stack direction={"column"} spacing={2}>
                <button onClick={generateAPA}>Generar APA</button>

                {showAlertSuccess &&
                    <>
                        <Alert severity="success" >Se ha generado la cita correctamente</Alert>
                        <button onClick={pasteAPA}>Pegar APA</button>
                    </>
                }
            </Stack>
        </div>
    )
}
/**
 * Generates an APA citation based on the information provided by the user.
 */
function generateCitation(citationInfo: CitationInfo): string {
    var citation = `${citationInfo.authors} (${citationInfo.date}). ${citationInfo.title}. ${citationInfo.journal}, ${citationInfo.volume}, ${citationInfo.doi}`;
    return citation
}
