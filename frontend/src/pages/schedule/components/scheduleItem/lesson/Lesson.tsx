import React from "react";
import ScheduleLesson from "../../../../../modules/api/types/ScheduleLesson";
import {useStore} from "effector-react";
import {timetableStore} from "../../../../../modules/effector/TimetableStore";
import styles from "../../Components.module.scss"
import Typography from "@mui/material/Typography";

type ILesson = {
    lesson: ScheduleLesson | undefined,
}

const Lesson = ({lesson}: ILesson) => {
    const {isTeacher} = useStore(timetableStore);

    return (
        <div className={styles.lesson}>
            {lesson ? (
                <>
                    <Typography fontSize="15px" fontWeight={"bold"}>{lesson?.subject}
                        {lesson.isChanged ? <span style={{color: "rgb(240, 92, 68)"}}>*</span> : null}
                    </Typography>
                    <Typography fontSize="12px">{isTeacher ? lesson?.group : lesson?.teacher.split(" ")[0]} {lesson?.auditory}</Typography>
                </>
            ) : (
                <>
                    <Typography >—</Typography>
                </>
            )}
        </div>
    );
}

export default Lesson;
