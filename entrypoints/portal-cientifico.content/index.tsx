import { onMessage } from "@/utils/messaging";
import ReactDOM from "react-dom/client";
import { defineContentScript } from "wxt/sandbox";
import DoiSearchButton from "../doi-search.content/DoiSearchButton";
import SherpaRomeoButton from "../sherpa-romeo.content/SherpaRomeoButton";
import CopyDoiButton from "./CopyDoiButton";
export default defineContentScript({
    // Set manifest options
    matches: ["https://portalcientifico.unileon.es/documentos/*"],
    runAt: "document_end",

    main: async (ctx) => {

        onMessage("addSearchDoiButtonToPortal", async (message) => {
            let parentElement = document.querySelector("p.documento-detalle__localizacion") as HTMLElement;
            const doiElement = document.getElementsByClassName("documento-detalle__tipo")[0];

            if (doiElement == undefined || !doiElement.textContent?.includes("DOI")) {
                return false;
            }
            const doi = doiElement.textContent?.split(":")[1].trim();

            const ui = createIntegratedUi(ctx, {
                position: "inline",
                anchor: parentElement.parentElement,
                onMount: (container) => {
                    // Create a root on the UI container and render a component
                    const root = ReactDOM.createRoot(container);
                    container.className = "documento-detalle__localizacion";
                    root.render(

                        <DoiSearchButton doi={doi} />
                    );
                    return root;
                },
                onRemove: (root) => {
                    // Unmount the root when the UI is removed
                    root.unmount();
                },
            });

            // Call mount to add the UI to the DOM
            ui.mount();

            return true;
        });

        onMessage("addCopyDoiButton", async (message) => {
            const doiElement = document.getElementsByClassName("documento-detalle__tipo")[0];

            if (doiElement == undefined || !doiElement.textContent?.includes("DOI")) {
                return false;
            }

            const doi = doiElement.textContent?.split(":")[1].trim();

            const ui = createIntegratedUi(ctx, {
                position: "inline",
                anchor: doiElement.parentElement,
                onMount: (container) => {
                    // Create a root on the UI container and render a component
                    const root = ReactDOM.createRoot(container);
                    container.className = "documento-detalle__localizacion";
                    root.render(
                        <CopyDoiButton doi={doi} />
                    );
                    return root;
                },
                onRemove: (root) => {
                    // Unmount the root when the UI is removed
                    root.unmount();
                },
            });

            // Call mount to add the UI to the DOM
            ui.mount();



            return true;
        });

        onMessage("addSherpaRomeoButtonToPortal", async (message) => {

            let parentElement = document.querySelector("p.documento-detalle__localizacion") as HTMLElement;
            let issnElements = parentElement.getElementsByTagName("span");


            var issns: string[] = [];
            for (var i = 0; i < issnElements.length; i++) {
                if (issnElements[i].className != "documento-detalle__localizacion") {
                    continue;
                }
                issns.push(issnElements[i].textContent?.trim().replace(",", "") as string);
            }
            const ui = createIntegratedUi(ctx, {
                position: "inline",
                anchor: parentElement.parentElement,
                onMount: (container) => {
                    // Create a root on the UI container and render a component
                    const root = ReactDOM.createRoot(container);
                    container.className = "documento-detalle__localizacion";
                    container.style.paddingBottom = "20px";

                    root.render(
                        <SherpaRomeoButton issns={issns} />
                    );
                    return root;
                },
                onRemove: (root) => {
                    // Unmount the root when the UI is removed
                    root.unmount();
                },
            });

            // Call mount to add the UI to the DOM
            ui.mount();


            return true;

        });
    },
});

