import { formatAuthors } from "./common";

class Book {
  authors: string[];
  date: string;
  title: string;
  editorial: string;

  constructor(
    authors: string[],
    date: string,
    title: string,
    editorial: string
  ) {
    this.authors = authors;
    this.date = date;
    this.title = title;
    this.editorial = editorial;
  }

  // Autores. (Fecha). Titulo. Editorial
  toString(): string {
    return `${formatAuthors(this.authors)} (${this.date}). ${this.title}. ${
      this.editorial
    }`;
  }
}

export default Book;
