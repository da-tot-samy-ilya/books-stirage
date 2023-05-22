import React, {FC} from 'react';
import styles from "./AuthorsListItem.module.scss"

interface AuthorsListItemProps {
    name: string
}
const AuthorsListItem: FC<AuthorsListItemProps>= ({name}) => {
    return (
        <div className={styles.item}>{name}</div>
    );
};

export default AuthorsListItem;