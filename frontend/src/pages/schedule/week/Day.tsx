import React from "react";
import {setDay} from "../../../modules/effector/TimetableStore";
import {Tab, Typography} from '@mui/material/';

type IDay = {
    dayIndex: number,
    name: string,
}

const Day = (props : IDay) => {
    const date = new Date(new Date().getTime() +
        (((props.dayIndex + 1) - new Date().getDay()) *24*60*60*1000)).getDate();

    return(
        <Tab onClick={() => {setDay(props.dayIndex)}} style={{minWidth: 50, width: "calc(100% / 6)"}} value={props.dayIndex} label={
            <div>
                <Typography >{date}</Typography>
                <Typography >{props.name}</Typography>
            </div>
        }/>
    )
}

export default Day;