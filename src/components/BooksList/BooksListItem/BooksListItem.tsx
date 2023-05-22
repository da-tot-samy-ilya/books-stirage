import React, {FC} from 'react';
import styles from "./BooksListItem.module.scss"
import {Book} from "../../../types/Book";
import remove from "./img/remove.svg"
interface BooksListItemProps {
    book: Book
    number: number
    removeBook: (id: number) => void

    removable?: boolean
}
const BooksListItem: FC<BooksListItemProps>= ({book, number, removeBook, removable}) => {
    return (
        <div className={styles.item}>
            <div className={styles.name}>{removable ? `${number+1}. ${book.name}` : `${book.name}`}</div>
            <div className={styles.authors}>{book.authors.reduce((acc, next) => acc + ", " + next)}</div>
            <div className={styles.rate}>{book.rate}</div>
            <div className={styles.year}>{book.year || "-"}</div>
            <div className={styles.isbn}>{book.isbn || "-"}</div>
            <div style={{display: removable ? "flex" : "none"}} onClick={() => removeBook(book.id)} className={styles.delete}><img src={remove} alt=""/></div>
        </div>
    );
};

export default BooksListItem;