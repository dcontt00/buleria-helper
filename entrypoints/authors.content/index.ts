import { onMessage } from "@/utils/messaging";
import { defineContentScript } from "wxt/sandbox";

async function waitForTrElements(): Promise<NodeListOf<Element>> {
  return new Promise((resolve, reject) => {
    const observer = new MutationObserver((mutations, observer) => {
      const elements = document.querySelectorAll("tr.odd");
      alert(elements[0]?.querySelector("td")?.outerHTML);
      if (
        elements[0] &&
        elements[0].querySelector("td")?.innerHTML != "" &&
        elements[0].querySelector("td")?.innerText != "...., ....."
      ) {
        observer.disconnect();
        resolve(elements);
        return;
      }
    });

    observer.observe(document, { childList: true, subtree: true });
  });
}
export default defineContentScript({
  // Set manifest options
  matches: ["https://buleria.unileon.es/*", "http://buleria.unileon.es/*"],
  runAt: "document_start",

  main: () => {
    onMessage("removeAuthors", async () => {
      let authorCheckboxes = document.querySelectorAll(
        "input[name=dc_contributor_author_selected]"
      ) as NodeListOf<HTMLInputElement>;
      authorCheckboxes.forEach((checkbox) => {
        checkbox.click();
      });

      let removeButton = document.querySelector(
        "button[name=submit_dc_contributor_author_delete]"
      ) as HTMLInputElement;
      removeButton.click();
      return true;
    });

    onMessage("pasteAuthor", async (message) => {
      var author = message.data;
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

      nameInput.value = author.name;
      surnameInput.value = author.surname;
      searchButton.click();

      let rows: NodeListOf<HTMLTableRowElement> =
        (await waitForTrElements()) as NodeListOf<HTMLTableRowElement>;

      // Si no se encuentra autor, introducir manualmente
      if (rows[0].innerText == "No people found") {
        // Hacer click en x y salir del modal
        let closeButton: HTMLSpanElement | null = document.querySelector(
          'button.close[data-dismiss="modal"]'
        );
        closeButton?.click();
      } else {
        // Si hay mas de un autor, seleccionar el primero
        var rowWithAuthority: HTMLElement | undefined = undefined;
        rows.forEach((row) => {
          if (row.classList.contains("inAutoridad")) {
            rowWithAuthority = row;
          }
        });
        if (rowWithAuthority != undefined) {
          (rowWithAuthority as HTMLElement).click();
        } else {
          rows[0].click();
        }
        let addPersonButton = document.querySelector(
          "input.ds-button-field.btn.btn-default"
        ) as HTMLInputElement;
        addPersonButton.click();
      }

      addButton.click();
      return true;
    });
  },
});
