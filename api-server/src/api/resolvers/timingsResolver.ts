import {Arg, Query, Resolver} from "type-graphql";
import Timing from "../types/timing";
import ClassEatTimings from "../types/classEatTimings";
import {calendarChartsCache, eatTimingsCache} from "../../caches";
import CalendarChart from "../types/calendarChart";

@Resolver()
export default class TimingsResolver {
    @Query(returns => [Timing])
    async getLessonsTimings(): Promise<Array<Timing>> {
        return calendarChartsCache.getValue().then(calendarCharts => calendarCharts.lessonsTimings);
    }

    @Query(returns => ClassEatTimings, {nullable: true})
    async getEatTimings(
        @Arg("class", returns => String) className: string
    ): Promise<ClassEatTimings | undefined> {
        return eatTimingsCache.getValue().then(eatTimings => eatTimings.get(className.toLowerCase()));
    }

    @Query(returns => CalendarChart)
    async getCalendarChart(): Promise<CalendarChart> {
        return calendarChartsCache.getValue().then(calendarCharts => calendarCharts.calendarChart);
    }
}
