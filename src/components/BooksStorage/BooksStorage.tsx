import React, {FC, useState} from 'react';
import styles from "./BooksStorage.module.scss"
import {Book} from "../../types/Book";
import BooksForm from "../BooksForm/BooksForm";
import BooksList from "../BooksList/BooksList";
import Recommendation from "../Recomendation/Recommendation";
import MySelect from "../UI/selects/MySelect/MySelect";
import MyButton from "../UI/buttons/MyButton/MyButton";
import MyLoader from "../UI/loaders/MyLoader/MyLoader";

interface BooksStorageProps {
    books: Book[]
    addBook: (book: Book) => void
    removeBook: (id: number) => void
    isLoading: boolean
}


const BooksStorage: FC<BooksStorageProps> = ({books, removeBook, addBook, isLoading}) => {
    const [groupBy, setGroupBy] = useState<string>("year")
    const [isVisibleAddForm, setIsVisibleAddForm] = useState(false)
    const years = Array
        .from(new Set(books
            .map(el => el.year)
            .filter(el => el !== null)))
        .sort((a,b) => (b || 0) - (a || 0))
    const authors = Array.from(new Set(books.map(el => el.authors).flat())).sort()
    const rates = Array.from(new Set(books.map(el => el.rate))).sort((a, b) => a-b)

    const booksWithoutYear = books.filter(el => el.year === null)

    return (
        <div className={styles.container}>
            <BooksForm mode="create" hideForm={() => setIsVisibleAddForm(false)} isVisible={isVisibleAddForm} addBook={addBook}/>
            <div className="fit_container">
                <div style={{height: "30px"}}></div>
                <MyButton  onClick={() => setIsVisibleAddForm(true)}>Add Book</MyButton>



                    <div>
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
                                : <div style={{display: "flex", justifyContent: "center"}}>
                                    {isLoading
                                        ? <MyLoader/>
                                        : <div className={styles.emptyWarn}>Storage is empty :(</div>
                                    }
                                    </div>

                            }
                        </div>
                    </div>

            </div>

        </div>

    );
};

export default BooksStorage;