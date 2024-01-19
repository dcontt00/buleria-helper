import CitationInfo from "@/interfaces/CitationInfo";

/**
 * Retrieves the citation information from Submission Submit Page and returns it as a CitationInfo object.
 * @returns The citation information.
 */
function getCitationInfoSubmit(): CitationInfo {
  var title: string;
  var authors: string;
  var date: string;
  var journal: string;
  var volume: string;
  var doi: string = "";
  var startPage: string = "";
  var endPage: string = "";

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

  let startPageElement: HTMLInputElement = document.getElementById(
    "aspect_submission_StepTransformer_field_dc_page_initial"
  ) as HTMLInputElement;

  let endPageElement: HTMLInputElement = document.getElementById(
    "aspect_submission_StepTransformer_field_dc_page_final"
  ) as HTMLInputElement;
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
  startPage = startPageElement?.value;
  endPage = endPageElement?.value;
  return {
    title: title,
    authors: authors,
    date: date,
    journal: journal,
    volume: volume,
    doi: doi,
    startPage: startPage,
    endPage: endPage,
  };
}

/**
 * Retrieves the citation information from the Submission Edit page and returns it as a CitationInfo object.
 * @returns The citation information.
 */
function getCitationInfoEdit(): CitationInfo {
  var title = "";
  var authors = "";
  var date = "";
  var journal = "";
  var volume = "";
  var doi = "";

  var authorsArray: string[] = [];

  let tds = document.querySelectorAll("td");

  tds.forEach((td) => {
    switch (td.innerText) {
      case "dc. title":
        if (td.nextElementSibling) {
          title =
            td.nextElementSibling.getElementsByTagName("textarea")[0].value;
        }
        break;
      case "dc. contributor. author":
        if (td.nextElementSibling) {
          authorsArray.push(
            td.nextElementSibling.getElementsByTagName("textarea")[0].value
          );
        }
        break;
      case "dc. date":
        if (td.nextElementSibling) {
          date =
            td.nextElementSibling.getElementsByTagName("textarea")[0].value;
        }
        break;
      case "dc. journal. title":
        if (td.nextElementSibling) {
          journal =
            td.nextElementSibling.getElementsByTagName("textarea")[0].value;
        }
        break;
      case "dc. volume. number":
        if (td.nextElementSibling) {
          volume =
            td.nextElementSibling.getElementsByTagName("textarea")[0].value;
        }
        break;
      case "dc. identifier. doi":
        if (td.nextElementSibling) {
          doi = td.nextElementSibling.getElementsByTagName("textarea")[0].value;
        }
        break;
    }
    authors = formatAuthors(authorsArray);
  });
  return {
    title: title,
    authors: authors,
    date: date,
    journal: journal,
    volume: volume,
    doi: doi,
    startPage: "",
    endPage: "",
  };
}

/**
 * Formats an array of authors into a specific format.
 *
 * @param authors - The array of authors to be formatted.
 * @returns The formatted authors as a string.
 */
function formatAuthors(authors: string[]): string {
  var formattedAuthors: string[] = [];
  authors.forEach((author) => {
    var authorParts = author.split(", ");
    var surnames = authorParts[0].split(" ");
    var names = authorParts[1].split(" ");

    // Capitalize first letter of surnames
    var formattedSurnames = "";
    surnames.forEach((surname) => {
      formattedSurnames += `${surname[0].toUpperCase()}${surname.slice(1)}`;
      // Add space between surnames
      if (surnames.indexOf(surname) != surnames.length - 1) {
        formattedSurnames += " ";
      }
    });

    // Capitalize first letter of names
    var formattedName = "";
    names.forEach((name) => {
      formattedName += `${name[0].toUpperCase()}.`;
      // Add space between names
      if (names.indexOf(name) != names.length - 1) {
        formattedName += " ";
      }
    });
    var formattedAuthor = `${formattedSurnames}, ${formattedName}`;
    formattedAuthors.push(formattedAuthor);
  });
  return formattedAuthors.join("; ");
}

/**
 * Paste the given citation into the bibliography element.
 * @param citation - The citation to be pasted.
 */
function pasteCitation(citation: string) {
  if (location.href.includes("/submit/")) {
    // Submit submission page
    let bibliographyElement: HTMLInputElement = document.getElementById(
      "aspect_submission_StepTransformer_field_dc_identifier_citation"
    ) as HTMLInputElement;
    bibliographyElement.value = citation;
    return true;
  } else if (location.href.includes("submit_metadata")) {
    // Edit submission page
    let inputElement;
    let tds = document.querySelectorAll("td");

    let td = Array.from(tds).find(
      (td) => td.innerText == "dc. identifier. citation"
    );
    let textarea = td?.nextElementSibling?.getElementsByTagName("textarea")[0];
    if (textarea) {
      textarea.value = citation;
    }
    return true;
  }
}

export { getCitationInfoSubmit, getCitationInfoEdit, pasteCitation };