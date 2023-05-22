import React, {FC} from 'react';
import styles from "./BooksList.module.scss"
import {Book} from "../../types/Book";
import BooksListItem from "./BooksListItem/BooksListItem";

interface BooksListProps {
    books: Book[]
    year: number | "Without year"
    removeBook: (id: number) => void
}


const BooksList: FC<BooksListProps> = ({books, year, removeBook}) => {
    const compare = (a: string, b: string) => {
        const A = a.toUpperCase()
        const B = b.toUpperCase()
        if (A < B) return -1
        if (A > B) return 1
        return 0
    }
    return (
        <div className={styles.list}>
            <div className={styles.year}>{year}</div>
            <div className={styles.header}>
                <div className={styles.headeritem}>Book name</div>
                <div className={styles.headeritem}>Authors</div>
                <div className={styles.headeritem}>Rate</div>
                <div className={styles.headeritem}>Year</div>
                <div className={styles.headeritem}>ISBN</div>
            </div>
            {books
                .sort((a, b) => compare(a.name, b.name))
                .map((el, i) => <BooksListItem removeBook={removeBook} key={el.id} book={el} number={i}/>)}
        </div>
    );
};

export default BooksList;