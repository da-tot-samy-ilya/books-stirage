import React, {FC} from 'react';
import {Book} from "../../types/Book";

import BooksForm from "../BooksForm/BooksForm";
import {useParams} from "react-router-dom";


interface EditBookProps {
    changeBook: (book: Book) => void
    books: Book[]
}
const EditBook: FC<EditBookProps> = ({books, changeBook}) => {

    const {id} = useParams()
    const book = books.find(el => el.id.toString() === id)
    return (
        <div>
            {
                book
                ?
                <BooksForm
                    hideForm={() => {}}
                    book={book}
                    addBook={(book) => changeBook(book)}
                    mode="edit"
                    currBookId={book.id}
                    isVisible={true}/>
                :
                <div>This book doesnt exist :(</div>
            }
        </div>


    );
};

export default EditBook;