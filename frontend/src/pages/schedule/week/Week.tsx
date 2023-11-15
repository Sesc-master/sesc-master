import React from "react";
import Day from "./Day";
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import {useStore} from "effector-react";
import {timetableStore} from "../../../modules/effector/TimetableStore";

const Week = () => {
    let names = ["MON", "TUE", "WED", "THU", "FRI", "SAT"]
    const {day} = useStore(timetableStore);

    return (
        <Box sx={{width: "100%", displey: "flex", justifyContent: "space-around"}}>
            <Tabs variant="fullWidth" value={day}>
                {names.map((element, index) => (
                    <Day key={index} name={element}
                         dayIndex={index}/>))}
            </Tabs>
        </Box>
    );
};

export default Week;