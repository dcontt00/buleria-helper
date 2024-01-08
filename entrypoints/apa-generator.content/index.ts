import { defineContentScript } from "wxt/sandbox";
export default defineContentScript({
  // Set manifest options
  matches: ["https://buleria.unileon.es/*"],
  runAt: undefined,

  main: () => {
    console.log("main");
    browser.runtime.onMessage.addListener((message) => {
      console.log("message", message);
      if (message.command === "apa") {
        var citation: string;
        var title: string;
        var authors: string;
        var date: string;
        var journal: string;
        var volume: string;
        var doi: string = "";

        let titleElement = document.getElementById(
          "aspect_submission_StepTransformer_field_dc_title"
        ) as HTMLInputElement;

        let authorsCheckboxes = document.querySelectorAll(
          "[name='dc_contributor_author_selected']"
        );
        var authorsArray: string[] = [];
        authorsCheckboxes.forEach((checkbox) => {
          var parent = checkbox.parentElement;
          var authorElement: HTMLCollectionOf<HTMLSpanElement> | undefined =
            parent?.getElementsByTagName("span");
          authorElement && authorsArray.push(authorElement[0].innerText);
        });

        let dateElement: HTMLInputElement = document.getElementById(
          "aspect_submission_StepTransformer_field_dc_date_year"
        ) as HTMLInputElement;

        let journalElement: HTMLInputElement = document.getElementById(
          "aspect_submission_StepTransformer_field_dc_journal_title"
        ) as HTMLInputElement;

        let volumeElement: HTMLInputElement = document.getElementById(
          "aspect_submission_StepTransformer_field_dc_volume_number"
        ) as HTMLInputElement;

        let doiCheckboxes = document.querySelectorAll(
          "[name='dc_identifier_selected']"
        );
        doiCheckboxes.forEach((checkbox) => {
          var parent = checkbox.parentElement;
          var doiElement: HTMLCollectionOf<HTMLSpanElement> | undefined =
            parent?.getElementsByTagName("span");

          if (doiElement && doiElement[0].innerText.includes("doi:")) {
            doi = doiElement[0].innerText.replace("doi:", "");
          }
        });

        let bibliographyElement: HTMLInputElement = document.getElementById(
          "aspect_submission_StepTransformer_field_dc_identifier_citation"
        ) as HTMLInputElement;

        title = titleElement?.value;
        authors = formatAuthors(authorsArray);
        date = dateElement?.value;
        journal = journalElement?.value;
        volume = volumeElement?.value;

        citation = `${authors} (${date}). ${title}. ${journal}, ${volume}, ${doi}`;
        bibliographyElement.value = citation;
      }
    });
  },
});

/**
 * Formats an array of authors into a specific format.
 *
 * @param authors - The array of authors to be formatted.
 * @returns The formatted authors as a string.
 */
function formatAuthors(authors: string[]) {
  var formattedAuthors: string[] = [];
  authors.forEach((author) => {
    var authorParts = author.split(", ");
    var surnames = authorParts[0].toUpperCase();
    var names = authorParts[1].toUpperCase().split(" ");
    var formattedName = "";
    names.forEach((name) => {
      formattedName += `${name[0]}. `;
    });
    var formattedAuthor = `${surnames}, ${formattedName}`;
    formattedAuthors.push(formattedAuthor);
  });
  return formattedAuthors.join("; ");
}
