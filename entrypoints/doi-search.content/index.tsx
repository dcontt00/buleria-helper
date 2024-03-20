import { onMessage } from "@/utils/messaging";
import ReactDOM from "react-dom/client";
import { defineContentScript } from "wxt/sandbox";
import DoiSearchButton from "./DoiSearchButton";
export default defineContentScript({
    // Set manifest options
    matches: ["https://buleria.unileon.es/*", "http://buleria.unileon.es/*"],
    runAt: "document_end",

    main: async (ctx) => {

        onMessage("addSearchDoiButtonToBuleria", async (message) => {
            let issnInputElement = document.getElementById(
                "aspect_submission_StepTransformer_field_dc_identifier_qualifier"
            ) as HTMLInputElement;

            // Buscar elemento span con class ds-interpreted-field y su valor contiene issn
            let spanElements = document.querySelectorAll("span.ds-interpreted-field") as NodeListOf<HTMLElement>;

            let doiElement = Array.from(spanElements).find(element => element.textContent?.includes('doi'));

            if (doiElement?.textContent != null && doiElement.textContent.includes('doi')) {
                var doi = doiElement.textContent.split(":")[1].trim();
            }

            const ui = createIntegratedUi(ctx, {
                position: "inline",
                anchor: issnInputElement.parentElement?.parentElement?.parentElement?.parentElement,
                onMount: (container) => {
                    // Create a root on the UI container and render a component
                    const root = ReactDOM.createRoot(container);
                    container.className = "control-group row";
                    container.style.marginTop = "20px";
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
    },
});

