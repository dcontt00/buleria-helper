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
    return `${formatAuthors(this.authors)} (${this.date}). ${this.title}. (p. ${
      this.numPages
    }) En ${this.bookTitle}. ${this.editorial}`;
  }
}

export default BookChapter;
