import React, {FC, ReactNode} from 'react';
import styles from "./MyButton.module.scss"
import {isDisabled} from "@testing-library/user-event/dist/utils";
interface IMyButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    children: ReactNode | string
    hasMarginLeft?: string
    hasMarginTop?: string
    isDisabled?: boolean
}
const MyButton: FC<IMyButtonProps> = ({children, onClick, hasMarginLeft, hasMarginTop, isDisabled}) => {
    return (
        <button className={ isDisabled ? styles.button__disabled : styles.button} type="submit" onClick={ !isDisabled ? onClick : (e) => {e.preventDefault()}} style={{marginLeft: hasMarginLeft, marginTop: hasMarginTop}}>{children}</button>
    );
};

export default MyButton;