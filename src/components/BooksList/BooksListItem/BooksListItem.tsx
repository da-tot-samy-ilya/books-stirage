import React, {FC} from 'react';
import styles from "./BooksListItem.module.scss"
import {Book} from "../../../types/Book";

interface BooksListItemProps {
    book: Book
    number: number
}
const BooksListItem: FC<BooksListItemProps>= ({book, number}) => {
    return (
        <div className={styles.item}>
            <div className={styles.name}>{number}. {book.name}</div>
            <div className={styles.authors}>{book.authors.reduce((acc, next) => acc + ", " + next)}</div>
            <div className={styles.rate}>{book.rate}</div>
            <div className={styles.year}>{book.year}</div>
            <div className={styles.isbn}>{book.isbn}</div>
        </div>
    );
};

export default BooksListItem;