import { onMessage } from "@/utils/messaging";
import ReactDOM from "react-dom/client";
import { defineContentScript } from "wxt/sandbox";
import SherpaRomeoButton from "./SherpaRomeoButton";
export default defineContentScript({
    // Set manifest options
    matches: ["https://buleria.unileon.es/*", "http://buleria.unileon.es/*"],
    runAt: "document_end",

    main: async (ctx) => {

        onMessage("addSherpaRomeoButtonToPage", async (message) => {
            let issnInputElement = document.getElementById(
                "aspect_submission_StepTransformer_field_dc_identifier_qualifier"
            ) as HTMLInputElement;

            // Buscar elemento span con class ds-interpreted-field y su valor contiene issn
            let spanElements = document.querySelectorAll("span.ds-interpreted-field") as NodeListOf<HTMLElement>;
            var issn = "";

            let issnElement = Array.from(spanElements).find(element => element.textContent?.includes('issn'));
            if (issnElement?.textContent == undefined) {
                // issnElement es el primer span que contiene 'issn' en su valor
                //alert(issnElement.textContent);
                return true;
            }
            issn = issnElement.textContent?.split(':')[1].trim();



            const ui = createIntegratedUi(ctx, {
                position: "inline",
                anchor: issnInputElement.parentElement?.parentElement?.parentElement?.parentElement,
                onMount: (container) => {
                    // Create a root on the UI container and render a component
                    const root = ReactDOM.createRoot(container);
                    root.render(
                        <div className="control-group row">
                            <SherpaRomeoButton issn={issn} />

                        </div>
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

