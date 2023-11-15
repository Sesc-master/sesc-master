import {ScheduleType} from "../api/getSchedule";
import {Lesson} from "./lesson";

export default interface Schedule {
    type: ScheduleType;
    lessons: Array<Lesson>;
    diffs: Array<Lesson>;
}