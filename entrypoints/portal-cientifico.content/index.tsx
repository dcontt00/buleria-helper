import { onMessage } from "@/utils/messaging";
import ReactDOM from "react-dom/client";
import { defineContentScript } from "wxt/sandbox";
import SherpaRomeoButton from "../sherpa-romeo.content/SherpaRomeoButton";
export default defineContentScript({
    // Set manifest options
    matches: ["https://portalcientifico.unileon.es/documentos/*"],
    runAt: "document_end",

    main: async (ctx) => {
        onMessage("searchIssnPortal", async (message) => {

            let parentElement = document.querySelector("p.documento-detalle__localizacion") as HTMLElement;
            let issn = parentElement.getElementsByTagName("span")[1].textContent?.trim();
            if (issn === undefined) {
                return false;
            }

            const ui = createIntegratedUi(ctx, {
                position: "inline",
                anchor: parentElement.parentElement,
                onMount: (container) => {
                    // Create a root on the UI container and render a component
                    const root = ReactDOM.createRoot(container);
                    container.className = "documento-detalle__localizacion";
                    root.render(
                        <SherpaRomeoButton issns={[issn]} />
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

