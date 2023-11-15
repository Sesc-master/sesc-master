import {Arg, Int, Query, Resolver, Root, Subscription} from "type-graphql";
import Schedule from "../types/schedule";
import {IDsRecordsCache, schedulesCache} from "../../caches";
import {ScheduleType, scheduleTypes} from "../types/scheculeType";
import BaseLesson from "../types/baseLesson";
import UpdatedSchedule from "../types/changedSchedule";

@Resolver()
export default class SchedulesResolver {
    @Query(type => Schedule, {nullable: true, deprecationReason: "Use `getScheduleByName` instead"})
    async getSchedule(
        @Arg("type", returns => String) scheduleType: ScheduleType,
        @Arg("weekday", returns => Int) weekday: number,
        @Arg("ID", returns => Int) ID: number
    ): Promise<Schedule | undefined> {
        if (!scheduleTypes.includes(scheduleType)) return undefined;
        else return schedulesCache.getValue().then(schedules => schedules.schedules.get(scheduleType)?.get(ID)?.get(weekday));
    }

    @Query(type => Schedule, {nullable: true})
    async getScheduleByName(
        @Arg("type", returns => String) scheduleType: ScheduleType,
        @Arg("weekday", returns => Int) weekday: number,
        @Arg("name", returns => String) name: string
    ): Promise<Schedule | undefined> {
        if (!scheduleTypes.includes(scheduleType)) return undefined;

        const ID = await IDsRecordsCache.getValue().then(IDsRecords => IDsRecords[scheduleType].get(name));
        if (!ID) return undefined;
        
        return this.getSchedule(scheduleType, weekday, ID);
    }

    @Subscription(type => UpdatedSchedule, {
        topics: "SCHEDULES_UPDATED"
    })
    updatedSchedules(
        @Root() updatedSchedule: UpdatedSchedule
    ): UpdatedSchedule {
        return updatedSchedule;
    }

    @Query(type => [[String]], {nullable: true})
    async getFreeClassrooms(
        @Arg("weekday", returns => Int) weekday: number,
    ): Promise<Array<Array<string>> | undefined> {
        const {fullSchedules} = await schedulesCache.getValue(),
            weekdayFullSchedule = fullSchedules.get(weekday) ?? new Map<string, Array<BaseLesson | false>>();

        let weekdayFreeClassrooms = Array.from(Array(7), () => new Array<string>());
        weekdayFullSchedule.forEach((lessons, auditory) => {
            if (auditory == "Нет") return;
            lessons.forEach((lesson, lessonIndex) => {
                if (lesson === false) weekdayFreeClassrooms[lessonIndex].push(auditory);
            })
        });

        return weekdayFreeClassrooms;
    }
}