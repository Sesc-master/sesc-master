import React, {useState} from "react";
import Icon from "../../../components/icon/Icon";
import {IconName} from "../../../components/icon/IconName";
import "./AuditoriesPerLesson.scss";
import {ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";

type IAuditoriesPerLesson = {
    lesson: number,
    auditories: string [] | undefined
}

const AuditoriesPerLesson = (props : IAuditoriesPerLesson) => {
    const [isVisible, setVisibility] = useState(false)

    return(
        <>
            <ListItem disablePadding onClick={() =>{setVisibility(!isVisible)}}>
                <ListItemButton>
                    <ListItemIcon>
                        <Icon iconName={IconName.EmptyRoom}/>
                    </ListItemIcon>
                    <ListItemText primary={`свободны во время ${props.lesson} урока`}/>
                </ListItemButton>
            </ListItem>
            { isVisible && <Typography sx={{margin: "1em"}}>{props.auditories?.join(", ")}</Typography> }
        </>
    )
};

export default AuditoriesPerLesson;