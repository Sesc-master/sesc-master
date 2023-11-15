import Schedule from "./schedule";
import {ScheduleType} from "../api/getSchedule";

type ChangeMessage = "changed" | "deleted" | "added";
export interface ChangedSchedule {
    message: ChangeMessage
    type: ScheduleType;
    ID: number;
    weekday: number;
    lastSchedule?: Schedule;
    newSchedule?: Schedule;
}