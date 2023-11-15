import {Schedule, ScheduleType} from "./types/Schedule";
import query from "./graphql/query";

export default async function getSchedule(type: ScheduleType, weekday: number, name: string): Promise<Schedule | undefined> {
    const result = await query("getScheduleByName", Schedule, {
        type, weekday, name
    });

    if (result instanceof Array) return undefined;
    else return result;
}