function capitalizeWords(wordsString: string) {
  return wordsString
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getFileNameFromTitle(title: string) {
  // Eliminar espacio en blanco inicial si hay
  title = title.trim();

  // Eliminar caracteres especiales
  title = title.replace(/-/g, " ");

  // Eliminar simbolos puntuacion
  const punctuationRegex = /[-.,;:?¿!(){}[\]]/g;
  const withoutPunctuation = title.replace(punctuationRegex, "");

  // Eliminar preposiciones, conjunciones y articulos
  const prepositionsAndConjunctions = [
    "de",
    "a",
    "en",
    "y",
    "o",
    "con",
    "por",
    "para",
    "sin",
    "sobre",
    "bajo",
    "entre",
    "hacia",
    "desde",
    "hasta",
    "según",
    "durante",
    "mediante",
    "versus",
    "vía",
    "el",
    "la",
    "los",
    "las",
    "un",
    "una",
    "unos",
    "unas",
    "of",
    "to",
    "in",
    "and",
    "or",
    "with",
    "by",
    "for",
    "without",
    "on",
    "under",
    "between",
    "towards",
    "from",
    "until",
    "according",
    "during",
    "through",
    "versus",
    "via",
    "the",
    "a",
    "an",
  ];
  const words = withoutPunctuation
    .split(" ")
    .filter(
      (word) => !prepositionsAndConjunctions.includes(word.toLowerCase())
    );

  // Coger las 5 primeras palabras y poner mayuscula la primera letra de cada palabra
  const transformedWords = words
    .slice(0, 5)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return transformedWords.join("_");
}

export { capitalizeWords, getFileNameFromTitle };
