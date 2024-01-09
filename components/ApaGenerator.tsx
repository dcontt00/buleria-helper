import { browser } from "wxt/browser"
import { sendMessage } from "@/messaging";

export default function ApaGenerator() {
    async function onClick() {
        console.log("Clicking button");
        var tab = (await browser.tabs.query({ active: true, currentWindow: true })).pop();
        try {
            if (tab) {
                const length = await sendMessage('getStringLength', 'hello world', tab.id);
                const response = await sendMessage('getCitationInfo', undefined, tab.id);
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