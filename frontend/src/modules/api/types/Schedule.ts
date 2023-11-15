import ScheduleLesson from "./ScheduleLesson";
import Field from "../graphql/field";
import {Type} from "class-transformer";

export type ScheduleType = "group" | "teacher" | "auditory";

export class Schedule {
    @Field()
    type: ScheduleType;
    @Field(ScheduleLesson)
    @Type(() => ScheduleLesson)
    lessons: Array<ScheduleLesson>;
    @Field(ScheduleLesson)
    @Type(() => ScheduleLesson)
    diffs: Array<ScheduleLesson>;
}