import { defineContentScript } from "wxt/sandbox";
import { onMessage } from "@/utils/messaging";
import ReactDOM from "react-dom/client";
import { Button, ThemeProvider } from "@mui/material";
import CitationInfo from "@/interfaces/CitationInfo";
import { pasteCitation, getCitationInfoEdit, getCitationInfoSubmit } from "./common";
import APAGeneratorButton from "./APAGeneratorButton";

export default defineContentScript({
  // Set manifest options
  matches: ["https://buleria.unileon.es/*", "http://buleria.unileon.es/*"],
  runAt: "document_end",

  main: (ctx) => {
    onMessage("getCitationInfo", (message) => {
      if (location.href.includes("/submit/")) {
        // Submit submission page
        return getCitationInfoSubmit();
      } else if (location.href.includes("submit_metadata")) {
        // Edit submission page
        return getCitationInfoEdit();
      } else if (location.href.includes("workflow_edit_metadata")) {
        // Review submission to aproove page
        return getCitationInfoSubmit();
      } else {
        return undefined;
      }
    });

    onMessage("pasteCitation", (message) => {
      pasteCitation(message.data);
      return true;
    });

    onMessage("addCitationButtonToPage", async (message) => {
      let citationElement = document.getElementById(
        "aspect_submission_StepTransformer_field_dc_identifier_citation"
      ) as HTMLInputElement;
      const ui = createIntegratedUi(ctx, {
        position: "inline",
        anchor: citationElement.parentElement,
        onMount: (container) => {
          // Create a root on the UI container and render a component
          const root = ReactDOM.createRoot(container);
          root.render(
            <APAGeneratorButton />
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

