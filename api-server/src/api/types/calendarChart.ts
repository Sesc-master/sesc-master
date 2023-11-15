import DatesRange from "./datesRange";
import {Field, ObjectType} from "type-graphql";
import Timing from "./timing";

@ObjectType()
export default class CalendarChart {
    @Field(type => [DatesRange])
    public readonly quarters!: Array<DatesRange>;
    @Field(type => [DatesRange])
    public readonly holidays!: Array<DatesRange>;
    @Field(type => [DatesRange])
    public readonly sessions!: Array<DatesRange>;
}

export type CalendarCharts = {
  calendarChart: CalendarChart, lessonsTimings: Array<Timing>
}