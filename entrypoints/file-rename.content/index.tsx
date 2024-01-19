import { Button } from "@mui/material";
import ReactDOM from "react-dom/client";
import TitleTextfield from "./TitleTextfield";
export default defineContentScript({
    // Set manifest options
    matches: ["https://buleria.unileon.es/*", "http://buleria.unileon.es/*"],
    runAt: "document_end",

    main(ctx) {
        onMessage("addTitleButtonToPage", (message) => {
            let titleElement = document.getElementById(
                "aspect_submission_StepTransformer_field_dc_title"
            ) as HTMLInputElement;

            const ui = createIntegratedUi(ctx, {
                position: "inline",
                anchor: titleElement.parentElement,
                onMount: (container) => {
                    // Create a root on the UI container and render a component
                    const root = ReactDOM.createRoot(container);
                    root.render(
                        <TitleTextfield title={titleElement.value} />
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

