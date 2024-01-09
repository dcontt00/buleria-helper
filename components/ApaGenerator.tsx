import { browser } from "wxt/browser"
import { sendMessage } from "@/messaging";
import CitationInfo from "@/interfaces/CitationInfo";
import { useState } from "react";
export default function ApaGenerator() {
    const [citationInfo, setCitationInfo] = useState<CitationInfo | undefined>(undefined);
    async function onClick() {
        var tab = (await browser.tabs.query({ active: true, currentWindow: true })).pop();
        try {
            if (tab) {
                const response = await sendMessage('getCitationInfo', undefined, tab.id);
                const { title, authors, date, journal, volume, doi } = response;
                // Check every atributte is defined
                if (title && authors && date && journal && volume && doi) {
                    setCitationInfo(response);
                    const apa = `APA: ${authors}. (${date}). ${title}. ${journal}, ${volume}, ${doi}`;
                    console.log(apa);
                    await sendMessage('showNotification', apa, tab.id);
                } else {
                    await sendMessage('showNotification', 'No se ha podido generar la cita', tab.id);
                }
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className="card">
            <button id='myButton' onClick={onClick}>Generar APA</button>
        </div>
    )
}

