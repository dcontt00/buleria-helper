import { defineContentScript } from "wxt/sandbox";
import { onMessage } from "@/utils/messaging";
import manage from "@/utils/test";

export default defineContentScript({
  matches: ["https://buleria.unileon.es/*"],
  runAt: "document_end",
  main: () => {
    onMessage("pasteKeyword", (keyword) => {
      const input: HTMLInputElement | null = document.getElementById(
        "aspect_submission_StepTransformer_field_dc_subject_other"
      ) as HTMLInputElement;
      const button: HTMLButtonElement | null = document.querySelector(
        'button[name="submit_dc_subject_other_add"]'
      );
      console.log("pasteKeywords");

      // Asegúrate de que el input y el botón existen
      if (input && button) {
        // Define los textos que quieres añadir

        // Añade cada texto, uno por uno
        try {
          // Añade el texto al input
          input.value = keyword.data;

          // Haz clic en el botón
          button.click();
        } catch (error) {
          return false;
        }
      }
      return true;
    });
    onMessage("getKeywords", (message) => {
      const inputElements: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('input[name="dc_subject_other_selected"]');

      var keywords = inputElements[0].parentElement?.textContent;
      const removeButton: HTMLButtonElement | null = document.querySelector(
        "button[name='submit_dc_subject_other_delete']"
      );
      inputElements[0].click();
      removeButton?.click();

      // Return as string
      return keywords;
    });
  },
});
