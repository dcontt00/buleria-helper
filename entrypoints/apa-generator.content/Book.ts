class Book {
  authors: string;
  date: string;
  title: string;
  journal: string;
  volume: string;
  numPages: string;

  constructor(
    authors: string,
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

  toString(): string {
    return `Authors: ${this.authors}, Date: ${this.date}, Title: ${this.title}, Journal: ${this.journal}, Volume: ${this.volume}, Number of Pages: ${this.numPages}`;
  }
}

export default Book;
