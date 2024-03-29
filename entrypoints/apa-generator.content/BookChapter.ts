import { formatAuthors } from "./common";

class BookChapter {
  authors: string[];
  date: string;
  title: string;
  bookTitle: string;
  numPages: string;
  editorial: string;

  constructor(
    authors: string[],
    date: string,
    title: string,
    bookTitle: string,
    numPages: string,
    editorial: string
  ) {
    this.authors = authors;
    this.date = date;
    this.title = title;
    this.bookTitle = bookTitle;
    this.numPages = numPages;
    this.editorial = editorial;
  }
  // Autores. (Fecha). Titulo Capitulo. En Titulo libro. (p. paginas) Editorial
  toString(): string {
    var output = "";
    output += formatAuthors(this.authors);
    output += ` (${this.date}). ${this.title}. `;
    output += `En ${this.bookTitle}`;
    if (this.numPages) {
      output += ` (p. ${this.numPages})`;
    }
    output += ` ${this.editorial}`;
    return output;
  }
}

export default BookChapter;
