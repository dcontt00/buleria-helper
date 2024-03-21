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
  startPage: string;
  endPage: string;

  constructor(
    title: string,
    journal: string,
    authors: string[],
    ISSN: string,
    DOI: string,
    date: string,
    volume: string,
    number: string,
    startPage: string,
    endPage: string
  ) {
    this.title = title;
    this.journal = journal;
    this.authors = authors;
    this.ISSN = ISSN;
    this.DOI = DOI;
    this.date = date;
    this.volume = volume;
    this.number = number;
    this.startPage = startPage;
    this.endPage = endPage;
  }
  // Autores. (Fecha). Titulo. Titulo revista, Volumen, Paginas

  toString(): string {
    var output = "";

    output += formatAuthors(this.authors);
    output += ` (${this.date}). ${this.title}. `;
    output += `${this.journal}, ${this.volume}`;
    if (this.startPage && this.endPage) {
      output += `, ${this.startPage}-${this.endPage}`;
    }
    if (this.number) {
      output += `(${this.number})`;
    }
    if (this.DOI) {
      output += `, https://doi.org/${this.DOI}`;
    }
    return output;
  }
}

export default Article;
