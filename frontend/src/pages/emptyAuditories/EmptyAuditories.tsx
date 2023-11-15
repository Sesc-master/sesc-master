import React, {useEffect, useState} from "react";
import getFreeClassrooms from "../../modules/api/getFreeClassrooms";
import AuditoriesPerLesson from "./auditoriesPerLesson/AuditoriesPerLesson"
import "./EmptyAuditories.scss";
import {List, ListSubheader} from "@mui/material";


const EmptyAuditory = () => {
    let [auditories, setAuditories]= useState<string[][]>([])

    useEffect(() => {
        const day = new Date().getDay()
        getFreeClassrooms(day === 0 ? 1 : day).then((result) => {setAuditories(result)})
    }, [])
    
    return (
        <>
            <List
                subheader={
                    <ListSubheader>
                        Свободные кабинеты
                    </ListSubheader>
                }
            >
                {[...new Array(7)]?.map((value, index) => (
                    <AuditoriesPerLesson auditories={auditories[index]} lesson={index + 1} />
                ))}
            </List>
        </>
    );
}

export default EmptyAuditory;