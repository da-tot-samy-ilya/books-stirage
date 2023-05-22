import React, {FC} from 'react';
import styles from "./Recomendation.module.scss"
import {Book} from "../../types/Book";
import BooksListItem from "../BooksList/BooksListItem/BooksListItem";

interface RecommendationProps {
    books: Book[]
}
const Recommendation: FC<RecommendationProps> = ({books}) => {
    const currYear = new Date().getFullYear()
    const maxRate = Math.max(...books.map(el => el.rate))
    const getRecomendation = (books: Book[]) => {
        const filtered = books.filter(el => (currYear - (el.year || currYear) >= 3) && (el.rate === maxRate))
        if (filtered.length > 1) {
            return filtered[Math.floor(Math.random()*filtered.length)]
        }
        else if (filtered.length === 1) {
            return filtered[0]
        }
        return null
    }
    const recomendation = getRecomendation(books)
    return (
        <div className={styles.recomendation}>
            <div className={styles.header}>We recommend you this book:</div>
            {recomendation ? <BooksListItem book={recomendation} removeBook={() => {}} number={1}/> : <div style={{marginTop: "10px"}}>Nothing :(</div>}
        </div>
    );
};

export default Recommendation;