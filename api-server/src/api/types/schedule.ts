import {ScheduleType} from "./scheculeType";
import {Lesson} from "./lesson";
import {Field, ObjectType} from "type-graphql";
import {FullSchedule} from "./fullSchedule";

export type Schedules = {
  fullSchedules: Map<number, FullSchedule>,
  schedules: Map<ScheduleType, Map<number, Map<number, Schedule>>>
}

@ObjectType()
export default class Schedule {
    @Field(type => String)
    public readonly type: ScheduleType;
    @Field(type => [Lesson])
    public readonly lessons: Array<Lesson>;
    @Field(type => [Lesson])
    public readonly diffs: Array<Lesson>;

    constructor(type: ScheduleType, lessons: Array<Lesson>, diffs: Array<Lesson>) {
        this.type = type;
        this.lessons = lessons;
        this.diffs = diffs;
    }
}