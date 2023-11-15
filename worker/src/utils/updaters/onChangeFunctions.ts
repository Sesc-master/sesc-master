import {PubSubEngine} from "type-graphql";
import Announcement from "../../sesc/types/announcement";
import {Schedules} from "./updatersFunctions";
import {scheduleTypes} from "../../sesc/api/getSchedule";
import {IDsRecordsCache} from "../../caches";
import Schedule from "../../sesc/types/schedule";
import {isEqual} from "lodash";

export function announcementsOnChange(pubSub: PubSubEngine, rootName: string): (newAnnouncements: Array<Announcement>) => Promise<void> {
    return async (newAnnouncements: Array<Announcement>) => pubSub.publish(`${rootName.toUpperCase()}_UPDATED`, newAnnouncements);
}

export const schedulesOnChange = (pubSub: PubSubEngine, rootName: string) => async (newSchedules: Schedules, oldSchedules: Schedules) => {
    const topicName = `${rootName.toUpperCase()}_UPDATED`;
    const weekdays = await IDsRecordsCache.getValue().then(IDsRecords => new Set(IDsRecords.weekday.values()));

    for (const scheduleType of scheduleTypes) {
        const newScheduleOfCurrentType = newSchedules.schedules.get(scheduleType) ?? new Map<number, Map<number, Schedule>>(),
              oldScheduleOfCurrentType = oldSchedules?.schedules?.get(scheduleType) ?? new Map<number, Map<number, Schedule>>();

        const IDs = new Set([
            ...newScheduleOfCurrentType.keys(),
            ...oldScheduleOfCurrentType.keys()
        ]);

        IDs.forEach(ID => {
            const newWeekSchedule = newScheduleOfCurrentType.get(ID),
                  oldWeekSchedule = oldScheduleOfCurrentType.get(ID);

            if (newWeekSchedule && !oldWeekSchedule) weekdays.forEach(weekday => {
                const newDaySchedule = newWeekSchedule.get(weekday);
                if (newDaySchedule) {
                  pubSub.publish(topicName, {
                    message: "added",
                    type: scheduleType,
                    ID,
                    weekday,
                    lastSchedule: undefined,
                    newSchedule: newDaySchedule,
                  });
                }
            });
            else if (!newWeekSchedule && oldWeekSchedule) weekdays.forEach(weekday => {
                const oldDaySchedule = oldWeekSchedule.get(weekday);
                if (oldDaySchedule) {
                  pubSub.publish(topicName, {
                    message: "deleted",
                    type: scheduleType,
                    ID,
                    weekday,
                    lastSchedule: oldDaySchedule,
                    newSchedule: undefined,
                  });
                }
            });
            else if (newWeekSchedule && oldWeekSchedule) weekdays.forEach(weekday => {
                const newDaySchedule = newWeekSchedule.get(weekday),
                      oldDaySchedule = oldWeekSchedule.get(weekday);

                if (newDaySchedule && oldDaySchedule && !isEqual(newDaySchedule, oldDaySchedule)) {
                  pubSub.publish(topicName, {
                    message: "changed",
                    type: scheduleType,
                    ID,
                    weekday,
                    lastSchedule: oldDaySchedule,
                    newSchedule: newDaySchedule,
                  });
                }
                else if (newDaySchedule && !oldDaySchedule) {
                  pubSub.publish(topicName, {
                    message: "added",
                    type: scheduleType,
                    ID,
                    weekday,
                    lastSchedule: undefined,
                    newSchedule: newDaySchedule,
                  });
                }
                else if (!newDaySchedule && oldDaySchedule) {
                  pubSub.publish(topicName, {
                    message: "deleted",
                    type: scheduleType,
                    ID,
                    weekday,
                    lastSchedule: oldDaySchedule,
                    newSchedule: undefined,
                  });
                }
            });
        });
    }
}