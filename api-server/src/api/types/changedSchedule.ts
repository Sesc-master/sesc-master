import Schedule from "./schedule";
import {Field, Int, ObjectType} from "type-graphql";
import {ScheduleType} from "../types/scheculeType";

type ChangeMessage = "changed" | "deleted" | "added";

@ObjectType()
export default class ChangedSchedule {
    @Field(type => String)
    message: ChangeMessage

    @Field(type => String)
    type: ScheduleType;
    @Field(type => Int)
    ID: number;
    @Field(type => Int)
    weekday: number;

    @Field(type => Schedule, {nullable: true})
    lastSchedule?: Schedule;
    @Field(type => Schedule, {nullable: true})
    newSchedule?: Schedule;

    constructor(message: ChangeMessage, type: ScheduleType, ID: number, weekday: number, newSchedule: Schedule | undefined, lastSchedule: Schedule | undefined) {
        this.message = message;
        this.type = type;
        this.ID = ID;
        this.weekday = weekday;
        this.newSchedule = newSchedule
        this.lastSchedule = lastSchedule;
    }
}