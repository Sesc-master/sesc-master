import React from 'react';
import {useLoadTimetable} from "../../../../hooks/useLoadTimetable";
import {useStore} from "effector-react";
import {timetableStore} from "../../../../modules/effector/TimetableStore";
import styles from "./Error.module.scss"
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";

const Error = () => {
    const {isTeacher, teacher, grade} = useStore(timetableStore);

    return (
        <div className={styles.container}>
            <Typography variant="h6" className={styles.text}>Что-то пошло не так...</Typography>
            <Button
                onClick={() => useLoadTimetable(grade, teacher, isTeacher)}
                color={"primary"}
                variant="contained"
            >
                Перезагрузить
            </Button>
        </div>
    );
};

export default Error;