import { Release } from "@/types";
import { Alert, Button, Stack } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react";

export default function Updater() {
    const [newUpdate, setNewUpdate] = useState<boolean>(false);
    const [release, setRelease] = useState<Release | undefined>(undefined);


    useEffect(() => {
        const api = async () => {
            await getLatestVersion();
        }
        api();
    }, []);

    async function getLatestVersion() {
        var latestCheckUpdate = await storage.getItem<Date>("local:lastCheckUpdate");
        console.log("latestCheckUpdate", latestCheckUpdate);
        if (latestCheckUpdate != undefined && new Date().getTime() - latestCheckUpdate.getTime() < 1000 * 60 * 60 * 24) {
            console.log("No se comprueba la actualización");
            return;
        }
        await storage.setItem<Date>("local:lastCheckUpdate", new Date());


        var extensionVersion = browser.runtime.getManifest().version;
        var release: Release | undefined = await axios.get('https://api.github.com/repos/dcontt00/buleria-helper/releases/latest').then(response => {
            // Buscar en los assets el archivo .xpi
            var download_url;
            for (var asset of response.data.assets) {
                if (asset.name.endsWith(".xpi")) {
                    download_url = asset.browser_download_url;
                }
            }
            return {
                version: response.data.tag_name,
                url: response.data.html_url,
                id: response.data.id,
                name: response.data.name,
                body: response.data.body,
                tag_name: response.data.tag_name,
                download_url: download_url
            }
        }).catch(error => {
            console.log(error);
            return undefined;
        });

        if (release == undefined) {
            return;
        }
        setRelease(release);
        if (isThereNewUpdate(extensionVersion, release.tag_name)) {
            console.log("Hay una nueva versión disponible");
            setNewUpdate(true);
        }
    }
    function isThereNewUpdate(versionExtension: string, versionRepo: string) {
        const v1parts = versionExtension.split('.').map(Number);
        const v2parts = versionRepo.split('.').map(Number);

        for (let i = 0; i < v1parts.length; ++i) {
            if (v2parts.length === i) {
                return false;
            }

            if (v1parts[i] < v2parts[i]) {
                return true;
            }
            else if (v1parts[i] > v2parts[i]) {
                return false;
            }
        }

        return v1parts.length < v2parts.length;
    }

    async function downloadupdate() {
        if (release == undefined) {
            return;
        }
        console.log("Descargando actualización");
        //Abrir nueva pestaña con la url de la release
        await browser.tabs.create({
            url: release.download_url
        });
    }

    function NewUpdateAlert() {
        if (newUpdate) {
            return <Alert severity="info">
                <Stack direction="column" spacing={2}>
                    Nueva versión disponible
                    <Button variant="outlined" onClick={downloadupdate}>Descargar</Button>
                </Stack>
            </Alert>
        }
    }

    return (
        <div>
            <NewUpdateAlert />
        </div>
    )

}