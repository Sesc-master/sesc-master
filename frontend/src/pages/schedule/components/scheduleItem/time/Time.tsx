import React from 'react';
import styles from "../../Components.module.scss";
import Typography from "@mui/material/Typography";

const Time = ({time}: {time: string[]}) => {
    return (
        <div className={styles.date}>
            <Typography fontWeight={"bold"} fontSize={"15px"}>
                {time[0]}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={"15px"}>
                {time[1]}
            </Typography>
        </div>
    );
};

export default Time;