import React, {ChangeEvent, FC, useState} from 'react';
import styles from "./MyInput.module.scss"

interface MyInputProps {
    value?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    warningMessage: string
    checkCorrect: (input: string) => boolean
    placeholder?: string
}


const MyInput: FC<MyInputProps> = ({onChange, warningMessage, checkCorrect, placeholder, value}) => {
    const [currValue, setCurrValue] = useState<string>("")
    const [isCorrect, setIsCorrect] = useState<boolean>(false)

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrValue(e.target.value)
        onChange(e)
        if (checkCorrect(e.target.value)) {
            setIsCorrect(true)
        } else {
            setIsCorrect(false)
        }
    }
    return (
        <div>
            <div style={{display: isCorrect ? "none" : "block"}} className={styles.warning}>{warningMessage}</div>
            <input placeholder={placeholder} type="text" value={value} onChange={handleInput} className={styles.input}/>
        </div>

    );
};

export default MyInput;