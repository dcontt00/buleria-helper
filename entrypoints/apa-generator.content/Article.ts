import { formatAuthors } from "./common";

class Article {
  authors: string[];
  date: string;
  title: string;
  journal: string;
  volume: string;
  numPages: string;

  constructor(
    authors: string[],
    date: string,
    title: string,
    journal: string,
    volume: string,
    numPages: string
  ) {
    this.authors = authors;
    this.date = date;
    this.title = title;
    this.journal = journal;
    this.volume = volume;
    this.numPages = numPages;
  }
  // Autores. (Fecha). Titulo. Titulo revista, Volumen, Paginas

  toString(): string {
    return `${formatAuthors(this.authors)} (${this.date}). ${this.title}. ${
      this.journal
    }, ${this.volume}, ${this.numPages}`;
  }
}

export default Article;
