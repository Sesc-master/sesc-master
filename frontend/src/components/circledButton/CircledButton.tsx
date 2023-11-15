import React from 'react';
import {ICircledButton} from "./ICircledButton";
import styles from "./CircledButton.module.scss";

const CircledButton = ({text, handler} : ICircledButton) => {
    return (
        <button className={styles.button} type="button" onClick={handler}>{text}</button>
    );
};

export default CircledButton;