import { browser } from "wxt/browser"

export default function ApaGenerator() {
    async function onClick() {
        console.log("Clicking button");
        var tab = (await browser.tabs.query({ active: true, currentWindow: true })).pop();
        try {
            if (tab) {
                await browser.tabs.sendMessage(tab.id || 0, { command: "apa" });
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