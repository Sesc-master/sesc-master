import React from "react";
import styles from "../Components.module.scss"
import {Skeleton} from "@mui/material";

const ScheduleLoaderItem = () => {
    return (
        <div className={styles.task}>
            <Skeleton className={styles.date} variant={'rectangular'} height={'60px'}/>
            <Skeleton className={styles.lesson} variant={'rectangular'} height={'60px'}/>
        </div>
    )
};

export default ScheduleLoaderItem;
