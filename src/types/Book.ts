export class Book {
    id: number
    name: string
    authors: string[]
    year: number | null
    rate: number
    isbn: string | null
    constructor(name: string, authors: string[], year: number | null = null, rate: number = 0, isbn: string | null = null) {
        this.name = name
        this.authors = authors
        this.year = year
        this.rate = rate
        this.isbn = isbn
        this.id = Date.now()
    }
}