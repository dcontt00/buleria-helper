
class Document {
    title: string;
    type: string;
    journal: string;
    authors: string[];
    ISSN: string[];
    DOI: string;
    date: string;
    volume: string;
    number: string;
    publisher: string;

    constructor(
        title: string,
        type: string,
        journal: string,
        authors: string[],
        ISSN: string[],
        DOI: string,
        date: string,
        volume: string,
        number: string,
        publisher: string,
    ) {
        this.title = title;
        this.type = type;
        this.journal = journal;
        this.authors = authors;
        this.ISSN = ISSN;
        this.DOI = DOI;
        this.date = date;
        this.volume = volume;
        this.number = number;
        this.publisher = publisher;
    }
}

export default Document;