import { defineContentScript } from "wxt/sandbox";
import { onMessage } from "@/messaging";
type CitationInfo = {
  title: string | undefined;
  authors: string | undefined;
  date: string | undefined;
  journal: string | undefined;
  volume: string | undefined;
  doi: string | undefined;
};

export default defineContentScript({
  // Set manifest options
  matches: ["https://buleria.unileon.es/*"],
  runAt: undefined,

  main: () => {
    onMessage("getCitationInfo", (message) => {
      var citationInfo = getCitationInfo();
      console.log(citationInfo);
      return citationInfo;
    });

    onMessage("pasteCitation", (message) => {
      console.log(message.data);
      pasteCitation(message.data);
      return true;
    });
  },
});

function pasteCitation(citation: string) {
  let bibliographyElement: HTMLInputElement = document.getElementById(
    "aspect_submission_StepTransformer_field_dc_identifier_citation"
  ) as HTMLInputElement;
  bibliographyElement.value = citation;
}

function getCitationInfo(): CitationInfo {
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

  title = titleElement?.value;
  authors = formatAuthors(authorsArray);
  date = dateElement?.value;
  journal = journalElement?.value;
  volume = volumeElement?.value;
  return {
    title: title,
    authors: authors,
    date: date,
    journal: journal,
    volume: volume,
    doi: doi,
  };
}

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
    var surnames = authorParts[0].split(" ");

    // Capitalize first letter of surnames
    var formattedSurnames = "";
    surnames.forEach((surname) => {
      formattedSurnames += `${surname[0].toUpperCase()}${surname.slice(1)} `;
    });

    var names = authorParts[1].split(" ");
    var formattedName = "";
    names.forEach((name) => {
      formattedName += `${name[0]}. `;
    });
    var formattedAuthor = `${surnames}, ${formattedName}`;
    formattedAuthors.push(formattedAuthor);
  });
  return formattedAuthors.join("; ");
}
