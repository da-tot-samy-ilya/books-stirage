import React, {useEffect, useState} from 'react';
import BooksStorage from "./components/BooksStorage/BooksStorage";
import EditBook from "./components/EditBook/EditBook";
import {Book} from "./types/Book";
import { Routes, Route } from 'react-router-dom';
import {Firebase} from "./firebase";
import {bindReporter} from "web-vitals/dist/modules/lib/bindReporter";
import MyLoader from "./components/UI/loaders/MyLoader/MyLoader";

function App() {
    const [books, setBooks] = useState<Book[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const firebase = new Firebase()

    useEffect(() => {
        setIsLoading(true)
        getBooks()
    }, [])

    const getBooks = async () => {
        const data = await firebase.getAllBooks()
        const arr = data
            .docs
            .map(el => ({...el.data(), id: el.id}))
            .map(el => firebase.firestoreToBook(el))
        setBooks(arr)
        setIsLoading(false)
    }

    const addBook = async (book: Book) => {
        setBooks([...books, book])
        await firebase.createbook(book)
    }
    const changeBook = async (book: Book) => {
        await removeBook(book.id)
        await addBook(book)
        await firebase.updateBook(book)
    }
    const removeBook = async (id: number) => {
        setBooks([...books.filter(el => el.id !== id)])
        await firebase.deleteBook(id)
    }

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<BooksStorage isLoading={isLoading} books={books} addBook={addBook} removeBook={removeBook}/>} />
                <Route path='/edit/:id' element={<EditBook books={books} changeBook={changeBook}/>} />
            </Routes>

        </div>
  );
}

export default App;
