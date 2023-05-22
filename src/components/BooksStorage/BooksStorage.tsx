import React, {useState} from 'react';
import styles from "./BooksStorage.module.scss"
import {Book} from "../../types/Book";
import BooksForm from "../BooksForm/BooksForm";
import BooksList from "../BooksList/BooksList";
import Recommendation from "../Recomendation/Recommendation";
const BooksStorage = () => {
    const [books, setBooks] = useState<Book[]>([])

    const addBook = (book: Book) => {
        setBooks([...books, book])
    }
    const removeBook = (id: number) => {
        setBooks(books.filter(el => el.id !== id))
    }
    const years = Array
        .from(new Set(books
            .map(el => el.year)
            .filter(el => el !== null)))
        .sort((a,b) => (b || 0) - (a || 0))

    const booksWithoutYear = books.filter(el => el.year === null)

    return (
        <div>
            <BooksForm addBook={addBook}/>
            <Recommendation books={books}/>
            <div className={styles.booksStorage}>
                {years.map(year => <BooksList removeBook={removeBook} key={year} year={year || 0} books={books.filter(el => el.year === year)}/>)}
                {books.length > 0
                    ? booksWithoutYear.length > 0
                        ? <BooksList removeBook={removeBook} year="Without year" books={booksWithoutYear}/>
                        : <div></div>
                    : <div className={styles.emptyWarn}>Storage is empty :(</div>}
            </div>
        </div>
    );
};

export default BooksStorage;