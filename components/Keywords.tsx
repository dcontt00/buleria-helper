import { browser } from "wxt/browser"
import { Tabs } from "webextension-polyfill/namespaces/tabs";
import { useEffect, useState } from "react";
import { Button, Grid, Stack, TextField } from "@mui/material";
export default function Keywords() {
    const urlPatters = [
        /^https:\/\/buleria\.unileon\.es\/admin\/item\?administrative-continue=\w+&submit_metadata$/,
        /^https:\/\/buleria\.unileon\.es\/handle\/\d+\/\d+\/submit\/[\da-f]+\.continue$/
    ]
    const [tab, setTab] = useState<Tabs.Tab | undefined>(undefined);
    const [showModule, setShowModule] = useState<boolean>(false);
    const [showTextFields, setShowTextFields] = useState<boolean>(false);
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

    function onClick() {
        setShowTextFields(true);
    }



    return (
        <div hidden={!showModule}>
            <Stack direction={"column"} spacing={2} >
                <Button variant="contained" onClick={onClick}>Keywords</Button>
                {
                    showTextFields ? (
                        <TextField id="outlined-basic" label="Palabras clave" variant="outlined" />
                    ) : null
                }
            </Stack>

        </div>
    )
}
