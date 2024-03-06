function getKeywords() {
  const inputElements: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    'input[name="dc_subject_other_selected"]'
  );

  var keywords = inputElements[0].parentElement?.textContent;
  const removeButton: HTMLButtonElement | null = document.querySelector(
    "button[name='submit_dc_subject_other_delete']"
  );
  inputElements[0].click();
  removeButton?.click();

  // Return as string
  return keywords;
}

function pasteKeyword(keyword: string) {
  const input: HTMLInputElement | null = document.getElementById(
    "aspect_submission_StepTransformer_field_dc_subject_other"
  ) as HTMLInputElement;
  const button: HTMLButtonElement | null = document.querySelector(
    'button[name="submit_dc_subject_other_add"]'
  );
  // Asegúrate de que el input y el botón existen
  if (input && button) {
    // Define los textos que quieres añadir

    // Añade cada texto, uno por uno
    try {
      // Añade el texto al input
      input.value = keyword;

      // Haz clic en el botón
      button.click();
    } catch (error) {
      return false;
    }
  }
  return true;
}

function detectSeparator(keywords: string) {
  var separators = [",", ";", "."];
  var separator = separators.find((separator) => keywords.includes(separator));
  if (separator != undefined) {
    return separator;
  }
}

function separateKeywords(keywords: string, separator: string) {
  var result: string[] = [];
  var aux = keywords.split(separator);

  // Poner la primera letra de cada palabra en mayúscula
  aux.forEach((word) => {
    word = word.trim();
    var fixed = capitalizeWords(word);
    console.log(fixed);
    result.push(fixed);
  });

  return result;
}
export { detectSeparator, getKeywords, pasteKeyword, separateKeywords };
