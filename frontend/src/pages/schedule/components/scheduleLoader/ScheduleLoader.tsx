import React from 'react';
import ScheduleLoaderItem from "./ScheduleLoaderItem";
import {lessonTimes} from "../../../../modules/event/lessonTimes"

const ScheduleLoader = () => {
    return (
        <>
            {lessonTimes.map((time, index) => (
              <ScheduleLoaderItem key={index}/>
            ))}
        </>
    );
};

export default ScheduleLoader;
