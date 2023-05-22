import React, {useState} from 'react';
import styles from "./BooksStorage.module.scss"
import {Book} from "../../types/Book";
import BooksForm from "../BooksForm/BooksForm";
const BooksStorage = () => {
    const [books, setBooks] = useState<Book[]>([])

    const addBook = (book: Book) => {
        setBooks([...books, book])
    }
    return (
        <div>
            <BooksForm addBook={addBook}/>
        </div>
    );
};

export default BooksStorage;