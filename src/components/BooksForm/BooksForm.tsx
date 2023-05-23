import React, {FC, useState} from 'react';
import ISBN from "node-isbn"
import styles from "./BooksForm.module.scss"
import MyInput from "../UI/inputs/MyInput/MyInput";
import AuthorsList from "../AuthorsList/AuthorsList";
import MyButton from "../UI/buttons/MyButton/MyButton";
import {Book} from "../../types/Book";
import {Link, useNavigate} from "react-router-dom";

interface BooksFormProps {
    addBook: (book: Book) => void
    isVisible: boolean
    hideForm: () => void
    book?: Book
    mode: "edit" | "create"

    currBookId?: number
}


const BooksForm: FC<BooksFormProps> = ({addBook, isVisible, hideForm, book, mode, currBookId}) => {
    const [name, setName] = useState<string>(book ? book.name : "")
    const [authors, setAuthors] = useState<string[]>(book ? book.authors : [])
    const [year, setYear] = useState<number | null>(book ? book.year : null)
    const [rate, setRate] = useState<number | null>(book ? book.rate : null)
    const [isbn, setIsbn] = useState<string | null>(book ? book.isbn : null)

    const [isCorrectName, setIsCorrectName] = useState(mode === "edit")
    const [isCorrectAuthors, setIsCorrectAuthors] = useState(mode === "edit")
    const [isCorrectYear, setIsCorrectYear] = useState(true)
    const [isCorrectRate, setIsCorrectRate] = useState(true)
    const [isCorrectIsbn, setIsCorrectIsbn] = useState(true)

    const [isCorrectIsbnReal, setIsCorrectIsbnReal] = useState<boolean | null>(null)

    const [isbnWarn, setIsbnWarn] = useState("")
    const [isLoadingISBN, setIsLoadingISBN] = useState(false)
    let isCorrectFields = isCorrectName && isCorrectAuthors && isCorrectYear && isCorrectRate && isCorrectIsbn

    const navigate = useNavigate();

    const onCreateBook = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        addBook(new Book(name, authors, year, rate || 0, isbn, currBookId))
        navigate("/")
        if (mode === "create") {
            setName("")
            setAuthors([])
            setYear(null)
            setRate(null)
            setIsbn(null)
            setIsCorrectAuthors(false)
            setIsCorrectName(false)
            hideForm()
        }
    }
    const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        hideForm()
        navigate("/")
    }
    const checkISBN = async (e: React.MouseEvent<HTMLButtonElement>, isbn: string) => {
        setIsLoadingISBN(true)
        e.preventDefault()
        await ISBN.resolve(isbn, function (err, book) {
            if (err) {
                setIsbnWarn("This ISBN is not found!")
                setIsCorrectIsbnReal(false)
                setIsLoadingISBN(false)
            } else {
                setIsbnWarn(`This ISBN is correct, its name is: ${book.title}`)
                setIsCorrectIsbnReal(true)
                setIsLoadingISBN(false)
            }
        });
    }
    return (
        <div style={{display: isVisible ? "block" : "none"}} className={styles.form_wrap}>
            <form className={styles.form}>
                <MyInput
                    value={name}
                    placeholder="Name"
                    warningMessage="Name can`t be empty or longer 100 symbols"
                    checkCorrect={str => {let a = str !== "" && str.length <= 100; setIsCorrectName(a); return a}}
                    onChange={e => setName(e.target.value)}/>
                <div style={{height: "15px"}}></div>
                <AuthorsList
                    authors={authors}
                    checkGlobalCorrect={(authors: string[] )=> {setIsCorrectAuthors(authors.length >= 0)}}
                    onAdd={strings => setAuthors(strings)}/>
                <div style={{height: "15px"}}></div>
                <MyInput
                    value={(year || "").toString()}
                    placeholder="Year"
                    warningMessage="Year can`t be not number or earlier than 1800"
                    checkCorrect={str => {let a = !isNaN(+str) && +str >= 1800; setIsCorrectYear(a); return a }}
                    onChange={e => setYear(+e.target.value)}/>
                <div style={{height: "15px"}}></div>
                <MyInput
                    value={(rate || "").toString()}
                    placeholder="Rate"
                    warningMessage="Rate have to be number from 0 to 10"
                    checkCorrect={str => {let a = !isNaN(+str)&& +str >= 0 && +str <= 10;setIsCorrectRate(a); return a}}
                    onChange={e => setRate(+e.target.value)}/>
                <div style={{height: "15px"}}></div>
                <MyInput
                    value={isbn || ""}
                    placeholder="ISBN"
                    warningMessage="ISBN cant be empty"
                    checkCorrect={str => {setIsCorrectIsbn(str !== ""); return isCorrectIsbn }}
                    onChange={e => setIsbn(e.target.value)}/>
                <div style={{height: "10px"}}></div>
                <MyButton isDisabled={isLoadingISBN} onClick={(e) => checkISBN(e, isbn || "")}>Check ISBN</MyButton>
                <div style={{marginTop: "10px", color: "#528cff", fontWeight: "600"}}>{
                    isCorrectIsbnReal !== null || isLoadingISBN
                    ? !isLoadingISBN
                        ? isbnWarn
                        : "loading....."
                    : ""}</div>
                <div style={{height: "30px"}}></div>
                <div style={{display: "flex"}}>
                    <MyButton onClick={onCancel}>Cancel</MyButton>
                    <div style={{width: "10px"}}></div>
                    <MyButton isDisabled={!isCorrectFields} onClick={onCreateBook}>{mode === "create" ? "Create book" : "Change book"}</MyButton>
                </div>

            </form>
        </div>
    );
};

export default BooksForm;