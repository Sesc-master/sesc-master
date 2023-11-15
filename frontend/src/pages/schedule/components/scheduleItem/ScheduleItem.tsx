import React from "react";
import {TimetableElement} from "../../../../modules/schedule/format";
import Lesson from "./lesson/Lesson";
import styles from "../Components.module.scss"
import Time from "./time/Time";

type IScheduleItem = {
    time : string [],
    schedule: TimetableElement
}

const ScheduleItem = ({time, schedule}: IScheduleItem) => {
    return (
        <div className={styles.task}>
            <Time time={time}/>
            {schedule.lessons.map((lesson, index) => (<Lesson key={index} lesson={lesson}/>))}
        </div>
    )
}

export default ScheduleItem;
