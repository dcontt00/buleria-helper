export default function capitalizeWords(word: string) {
  return word.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}
