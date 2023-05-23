import React, {useState} from 'react';
import styles from "./BooksStorage.module.scss"
import {Book} from "../../types/Book";
import BooksForm from "../BooksForm/BooksForm";
import BooksList from "../BooksList/BooksList";
import Recommendation from "../Recomendation/Recommendation";
import MySelect from "../UI/selects/MySelect/MySelect";
const BooksStorage = () => {
    const [books, setBooks] = useState<Book[]>([])
    const [groupBy, setGroupBy] = useState<string>("year")

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
    const authors = Array.from(new Set(books.map(el => el.authors).flat())).sort()
    const rates = Array.from(new Set(books.map(el => el.rate))).sort((a, b) => a-b)

    const booksWithoutYear = books.filter(el => el.year === null)

    return (
        <div>
            <BooksForm addBook={addBook}/>
            <Recommendation books={books}/>
            <div style={{height: "20px"}}></div>
            {books.length > 0
                ?
                <MySelect
                    options={
                        [{id: "year", name: "Group by year"},
                        {id: "author", name: "Group by author"},
                        {id: "rate", name: "Group by rate"}]}
                    onChangeSuper={(e) => setGroupBy(e.target.value)}/>
                :
                <div></div>}

            <div className={styles.booksStorage}>
                {}
                {groupBy === "year" ? years.map(year => <BooksList removeBook={removeBook} key={year} header={(year || "").toString()} books={books.filter(el => el.year === year)}/>) : <div></div>}
                {groupBy === "author" ? authors.map(author => <BooksList removeBook={removeBook} key={author} header={author} books={books.filter(el => el.authors.includes(author))}/>) : <div></div>}
                {groupBy === "rate" ? rates.map(rate => <BooksList removeBook={removeBook} key={rate} header={rate.toString()} books={books.filter(el => el.rate === rate)}/>) : <div></div>}
                {books.length > 0
                    ? booksWithoutYear.length > 0 && groupBy === "year"
                        ? <BooksList removeBook={removeBook} header="Without year" books={booksWithoutYear}/>
                        : <div></div>
                    : <div className={styles.emptyWarn}>Storage is empty :(</div>}
            </div>
        </div>
    );
};

export default BooksStorage;