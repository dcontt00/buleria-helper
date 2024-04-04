import { formatAuthors } from "./common";

class BookChapter {
  authors: string[];
  date: string;
  title: string;
  bookTitle: string;
  startPage: number;
  endPage: number;
  editorial: string;

  constructor(
    authors: string[],
    date: string,
    title: string,
    bookTitle: string,
    startPage: number,
    endPage: number,
    editorial: string
  ) {
    this.authors = authors;
    this.date = date;
    this.title = title;
    this.bookTitle = bookTitle;
    this.startPage = startPage;
    this.endPage = endPage;
    this.editorial = editorial;
  }
  // Autores. (Fecha). Titulo Capitulo. En Titulo libro. (p. paginas) Editorial
  toString(): string {
    var output = "";
    output += formatAuthors(this.authors);
    output += ` (${this.date}). ${this.title}. `;
    output += `En ${this.bookTitle}`;
    if (this.startPage != null && this.endPage != null) {
      output += ` (p. ${this.startPage}-${this.endPage})`;
    }
    output += ` ${this.editorial}`;
    return output;
  }
}

export default BookChapter;
