import { formatAuthors } from "./common";

class Article {
  title: string;
  journal: string;
  authors: string[];
  ISSN: string;
  DOI: string;
  date: string;
  volume: string;
  number: string;
  publisher: string;
  numPages: string;

  constructor(
    title: string,
    journal: string,
    authors: string[],
    ISSN: string,
    DOI: string,
    date: string,
    volume: string,
    number: string,
    publisher: string,
    numPages: string
  ) {
    this.title = title;
    this.journal = journal;
    this.authors = authors;
    this.ISSN = ISSN;
    this.DOI = DOI;
    this.date = date;
    this.volume = volume;
    this.number = number;
    this.publisher = publisher;
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
