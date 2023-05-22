import React, {FC, useEffect, useState} from 'react';
import styles from "./AuthorsList.module.scss"
import AuthorsListItem from "./AuthorsListItem/AuthorsListItem";
import MyInput from "../UI/inputs/MyInput/MyInput";
import MyButton from "../UI/buttons/MyButton/MyButton";

interface AuthorsListProps {
    onAdd: (authors: string[]) => void
    authors: string[]
    checkGlobalCorrect: (s: string[]) => void
}


const AuthorsList: FC<AuthorsListProps> = ({onAdd, authors, checkGlobalCorrect}) => {
    // const [authors, setAuthors] = useState<string[]>([])
    const [inputVal, setInputVal] = useState<string>("")
    const [isCorrect, setIsCorrect] = useState<boolean>(false)
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        onAdd([...authors, inputVal])
        setIsCorrect(false)
        checkGlobalCorrect(authors)
        setInputVal("")
    }
    const checkCorrect = (str: string): boolean => {
        let val = str !== "" && !authors.includes(str)
        setIsCorrect(val)
        return val
    }
    return (
        <div>
            <div className={styles.list}>
                {authors.map((el, i) => <AuthorsListItem key={el} name={`${i+1}. ${el}`}/>)}
            </div>
            <MyInput
                value={inputVal}
                placeholder="New author"
                warningMessage="Author`s names have to be nonempty and unique"
                checkCorrect={checkCorrect}
                onChange={(e) => setInputVal(e.target.value)}/>
            <div style={{height: "10px"}}></div>
            <MyButton isDisabled={!isCorrect} onClick={onClick}>Add</MyButton>
        </div>
    );
};

export default AuthorsList;