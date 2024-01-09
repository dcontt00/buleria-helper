import { browser } from "wxt/browser"
import { sendMessage } from "@/messaging";
import CitationInfo from "@/interfaces/CitationInfo";
import { useState } from "react";
export default function ApaGenerator() {
    const [citationInfo, setCitationInfo] = useState<CitationInfo | undefined>(undefined);
    const [citation, setCitation] = useState<string | undefined>(undefined);
    async function generateAPA() {
        var tab = (await browser.tabs.query({ active: true, currentWindow: true })).pop();
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
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function pasteAPA() {
        var tab = (await browser.tabs.query({ active: true, currentWindow: true })).pop();
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
        <div className="card">
            <button id='myButton' onClick={generateAPA}>Generar APA</button>
            <p>{citation}</p>
            <button onClick={pasteAPA}> Pegar APA</button>
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
