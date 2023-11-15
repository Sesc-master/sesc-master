import getIDs from "../../sesc/api/getIDs";
import getCalendarChart, {CalendarCharts} from "../../sesc/api/getCalendarChart";
import getAnnouncements from "../../sesc/api/getAnnouncements";
import {FullSchedule} from "../../sesc/types/fullSchedule";
import getSchedule, {ScheduleType, scheduleTypes} from "../../sesc/api/getSchedule";
import Schedule from "../../sesc/types/schedule";
import {IDsRecords} from "../../sesc/parsers/parseIDs";
import getFullSchedule from "../../sesc/api/getFullSchedule";
import getEatTimings from "../../sesc/api/getEatTimings";
import { env } from "node:process";
import {queue} from "async";

export {getIDs, getCalendarChart, getAnnouncements};

const maxParallelRequests = Math.max(parseInt(env.SCHEDULES_MAX_PARALLEL_REQUESTS ?? "10"), 1);

export type Schedules = {
    fullSchedules: Map<number, FullSchedule>,
    schedules: Map<ScheduleType, Map<number, Map<number, Schedule>>>
}

type ScheduleGetTask = {
    scheduleType: ScheduleType;
    targetID: number;
    weekdayID: number;
}

export async function getSchedules (IDs: IDsRecords) {
    let result: Schedules = {fullSchedules: new Map(), schedules: new Map()};
    const requestsQueue = queue(async (task: ScheduleGetTask, callback) => {
        console.log(`start request to get schedule for type ${task.scheduleType} with ID: ${task.targetID} for weekday ${task.weekdayID}`);
        const schedule = await getSchedule(task.scheduleType, task.targetID, task.weekdayID);
        console.log(`finished request to get schedule for type ${task.scheduleType} with ID: ${task.targetID} for weekday ${task.weekdayID}`);

        if (!result.schedules.has(task.scheduleType)) result.schedules.set(task.scheduleType, new Map());
        if (!result.schedules.get(task.scheduleType)?.has(task.targetID)) result.schedules.get(task.scheduleType)?.set(task.targetID, new Map());
        result.schedules.get(task.scheduleType)?.get(task.targetID)?.set(task.weekdayID, schedule);

        callback();
    }, maxParallelRequests);

    if (!IDs.weekday.values) {
      return result;
    }

    for (const weekdayID of IDs.weekday.values()) {
        await getFullSchedule(weekdayID).then(weekFullSchedule => result.fullSchedules.set(weekdayID, weekFullSchedule));
        for (const scheduleType of scheduleTypes) {
            for (const targetID of IDs[scheduleType].values()) {
                await requestsQueue.pushAsync({scheduleType, targetID, weekdayID});
            }
        }
    }
    return result;
}

export const updater_getEatTimings = async (calendarCharts: CalendarCharts) => getEatTimings(calendarCharts.lessonsTimings);