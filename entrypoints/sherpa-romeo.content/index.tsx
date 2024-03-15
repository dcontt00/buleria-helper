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
            var issns: string[] = [];

            let issnElements = Array.from(spanElements).filter(element => element.textContent?.includes('issn'));
            for (let i = 0; i < issnElements.length; i++) {
                var issn = issnElements[i].textContent?.split(':')[1].trim();
                issns.push(issn);
            }
            let essnElements = Array.from(spanElements).filter(element => element.textContent?.includes('essn'));
            for (let i = 0; i < essnElements.length; i++) {
                var essn = essnElements[i].textContent?.split(':')[1].trim();
                issns.push(essn);
            }


            if (issns.length === 0) {
                return false;
            }




            const ui = createIntegratedUi(ctx, {
                position: "inline",
                anchor: issnInputElement.parentElement?.parentElement?.parentElement?.parentElement,
                onMount: (container) => {
                    // Create a root on the UI container and render a component
                    const root = ReactDOM.createRoot(container);
                    root.render(
                        <div className="control-group row">
                            <SherpaRomeoButton issns={issns} />

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

