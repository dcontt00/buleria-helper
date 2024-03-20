import { onMessage } from "@/utils/messaging";
import ReactDOM from "react-dom/client";
import { defineContentScript } from "wxt/sandbox";
import SherpaRomeoButton from "../sherpa-romeo.content/SherpaRomeoButton";
export default defineContentScript({
    // Set manifest options
    matches: ["https://portalcientifico.unileon.es/documentos/*"],
    runAt: "document_end",

    main: async (ctx) => {
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

