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
    var output = "";
    output += formatAuthors(this.authors);
    output += ` (${this.date}). ${this.title}. `;
    output += `${this.journal}, ${this.volume}`;
    if (this.numPages) {
      output += this.numPages;
    }
    return output;
  }
}

export default Article;
