import { defineContentScript } from "wxt/sandbox";
import { onMessage } from "@/messaging";

export default defineContentScript({
  // Set manifest options
  matches: ["https://buleria.unileon.es/*", "http://buleria.unileon.es/*"],
  runAt: "document_start",

  main: () => {
    onMessage("pasteAuthors", (message) => {
      var authors = message.data;
      let nameInput = document.getElementById(
        "aspect_submission_StepTransformer_field_dc_contributor_author_first"
      ) as HTMLInputElement;
      let surnameInput = document.getElementById(
        "aspect_submission_StepTransformer_field_dc_contributor_author_last"
      ) as HTMLInputElement;

      let addButton = document.querySelector(
        "button[name=submit_dc_contributor_author_add]"
      ) as HTMLInputElement;

      let searchButton = document.querySelector(
        "button[name=lookup_dc_contributor_author]"
      ) as HTMLInputElement;

      for (const author of authors) {
        nameInput.value = author.name;
        surnameInput.value = author.surname;
        searchButton.click();

        // Esperar a que cargue la tabla de resultados
        let observer = new MutationObserver((mutations, observer) => {
          // Buscar la tabla en el DOM
          let rows = document.querySelectorAll(
            "tr.odd.clickable"
          ) as NodeListOf<HTMLTableRowElement>;
          // Si la tabla existe, detener la observación y hacer algo con la tabla
          if (rows.length > 0) {
            observer.disconnect();

            // Seleccionar el primero
            rows[0].click();

            // Click en el botón de añadir que tiene de clase ds-button-field btn btn-default
            let addPersonButton = document.querySelector(
              "input.ds-button-field.btn.btn-default"
            ) as HTMLInputElement;
            //addPersonButton.click();
          }
        });

        // Iniciar la observación
        observer.observe(document, { childList: true, subtree: true });
      }
      return true;
    });
  },
});
