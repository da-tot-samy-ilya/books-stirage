import { initializeApp } from "firebase/app";
import {deleteDoc, setDoc, collection, updateDoc, doc, getFirestore, getDocs} from "firebase/firestore";
import {Book} from "./types/Book";

export class Firebase {
    static firebaseConfig = {
        apiKey: "AIzaSyAH_AKOAVGgwb5BrGhSxt2jcqRVOWFOnDk",
        authDomain: "books-storage-dd2bf.firebaseapp.com",
        projectId: "books-storage-dd2bf",
        storageBucket: "books-storage-dd2bf.appspot.com",
        messagingSenderId: "465405003620",
        appId: "1:465405003620:web:c4d0c127c06ca5ccbe9c71",
        measurementId: "G-SHGYJD16T1"
    };
    app
    db
    constructor() {
        this.app =initializeApp(Firebase.firebaseConfig)
        this.db = getFirestore(this.app);
    }
    getAllBooks = async () => await getDocs(collection(this.db, "books"))

    createbook = async (book: Book) => {
        await setDoc(doc(this.db, "books", book.id.toString()), this.bookToFirestore(book))
    }
    updateBook = async (book: Book) => await updateDoc(doc(this.db, "books", book.id.toString()), this.bookToFirestore(book));

    deleteBook = async (id: number)=> await deleteDoc(doc(this.db, "books", id.toString()));

    bookToFirestore = (book: Book) => JSON.parse(JSON.stringify(book))

    firestoreToBook = (obj: any) => new Book(obj.name, obj.authors, obj.year, obj.rate, obj.isbn, obj.id)
}