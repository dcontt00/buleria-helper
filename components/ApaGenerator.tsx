import { browser } from "wxt/browser"
import { Tabs } from "webextension-polyfill/namespaces/tabs";
import { sendMessage } from "@/messaging";
import CitationInfo from "@/interfaces/CitationInfo";
import { useEffect, useState } from "react";
import { Alert, Stack } from "@mui/material";
export default function ApaGenerator() {
    const [tab, setTab] = useState<Tabs.Tab | undefined>(undefined);
    const [citationInfo, setCitationInfo] = useState<CitationInfo | undefined>(undefined);
    const [citation, setCitation] = useState<string | undefined>(undefined);
    const [showAlertSuccess, setShowAlertSuccess] = useState<boolean>(false);
    useEffect(() => {
        const getTab = async () => {
            var tab = (await browser.tabs.query({ active: true, currentWindow: true })).pop();
            if (tab) {
                setTab(tab);
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
            console.log('Error: No tab selected');
            return;
        }
        if (citation) {

            const response = await sendMessage("pasteCitation", citation, tab.id);
            console.log(response);
        }
    }
    return (
        <div>
            <button id='myButton' onClick={generateAPA}>Generar APA</button>
            {showAlertSuccess &&
                <>
                    <button onClick={pasteAPA}>Pegar APA</button>
                    <Alert severity="success" >Se ha generado la cita correctamente</Alert>
                </>
            }
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
