import React, {FC, useState} from 'react';
import styles from"./MySelect.module.scss"
interface IMySelectItem {
    id: any,
    name: string
}
interface IMySelectProps {
    options: IMySelectItem[]
    onChangeSuper: (e: React.ChangeEvent<HTMLSelectElement>) => void
    hasMarginLeft?: string
    hasMarginTop?: string
}


const MySelect: FC<IMySelectProps> = ({options, onChangeSuper, hasMarginLeft, hasMarginTop}) => {
    const [chosenValue, setChosenValue] = useState("none")

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setChosenValue(e.target.value)
        onChangeSuper(e)
    }


    return (
        <select onChange={onChange} className={styles.select} name="" id="" style={{marginLeft: hasMarginLeft, marginTop: hasMarginTop}}>
            {options.map(el => <option id={el.id.toString()} key={el.id} value={el.id}>{el.name}</option>)}

        </select>
    );
};

export default MySelect;