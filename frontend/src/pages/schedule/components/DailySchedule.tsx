import React from 'react';
import ScheduleItem from "./scheduleItem/ScheduleItem";
import {lessonTimes} from "../../../modules/event/lessonTimes";
import {TimetableElement} from "../../../modules/schedule/format";


const DailySchedule = ({schedule} : {schedule: Array<TimetableElement>}) => {
    return (
        <>
            {Array.from(schedule).map((el, index) => (
                <ScheduleItem key={index} schedule={el} time={lessonTimes[index]}/>
            ))}
        </>
    )
};

export default DailySchedule;
