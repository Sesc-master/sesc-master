import React from 'react';
import styles from "./Loading.module.scss"
import {CircularProgress} from "@mui/material";

const Loading = () => {
    return (
        <div className={styles.loader}>
            <CircularProgress />
        </div>
    );
};

export default Loading;