import React, {FC} from 'react';
import styles from "./BooksList.module.scss"
import {Book} from "../../types/Book";

interface BooksListProps {
    books: Book[]
}


const BooksList: FC<BooksListProps> = ({books}) => {

    return (
        <div>

        </div>
    );
};

export default BooksList;