import React from "react";
import styles from "./Option.module.scss"
import {List, ListItem} from "@mui/material";

type ISetOptions = (option: string) => void;

type IOptions = {
    options: string [],
    setOption : ISetOptions
}

const Options = ({options, setOption}: IOptions) => {
    return (
        <>
            <List>
                {options?.map((option, index) =>
                    (<ListItem key={index} onClick={() => setOption(option)} className={styles.option}>
                        {option}
                    </ListItem>))}
            </List>
            <div className="end"/>
        </>
    );
}

export default Options;