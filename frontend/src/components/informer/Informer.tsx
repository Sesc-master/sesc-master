import React, {useEffect, useState} from 'react';
import {Event, IEvent} from "../../modules/event/Event";
import styles from "./Informer.module.scss";
import {LinearProgress} from "@mui/material";

const Informer = () => {
    const [event, setEvent] = useState<IEvent | undefined>();

    useEffect(() => {
        const interval = setInterval(() => {
            setEvent(new Event().getCurrentEvent())
        }, 250)
        return () => clearInterval(interval);
    }, [])

    const formatTime = (sec: number) => {
        const minutes = Math.floor(sec / 60) >= 10 ?
            Math.floor(sec / 60) : "0" + Math.floor(sec / 60);
        const seconds = Math.floor(sec % 60) >= 10 ?
            Math.floor(sec % 60) : "0" + Math.floor(sec % 60);

        return `${minutes}:${seconds}`;
    }

    return (
        <>
            {event && (
                <section className={styles.content}>
                    <div className={styles.text}>
                        {event?.order + 1} {event?.type}, {formatTime(Number(event?.timeToEnd))}
                    </div>
                    <LinearProgress variant="determinate" value={event?.percent}/>
                </section>
            )}
        </>
    );
};

export default Informer;