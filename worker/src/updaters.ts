import Updater from "./utils/updater";
import {announcementsCache, calendarChartsCache, eatTimingsCache, IDsRecordsCache, schedulesCache} from "./caches";
import {
    getAnnouncements,
    getCalendarChart,
    getIDs,
    getSchedules,
    updater_getEatTimings
} from "./utils/updaters/updatersFunctions";
import { env } from "node:process";


const tz = env.TZ ?? "Asia/Yekaterinburg";


export const IDsUpdater = new Updater(getIDs, IDsRecordsCache, "IDs", {
    month: 8,
    date: 1,
    hour: 7,
    minute: 0,
    tz
});

export const calendarChartsUpdater = new Updater(getCalendarChart, calendarChartsCache, "Calendar_charts", {
    month: 8,
    date: 1,
    hour: 7,
    minute: 0,
    tz
});

export const announcementsUpdater = new Updater(getAnnouncements, announcementsCache, "Announcements", {
    hour: 7,
    minute: 0,
    tz
});

export const schedulesUpdater = new Updater(getSchedules, schedulesCache, "Schedules", {
    minute: [30, 0],
    tz
}, IDsUpdater);

export const eatTimingsUpdater = new Updater(updater_getEatTimings, eatTimingsCache, "Eat_timings", {
    month: 8,
    date: 1,
    hour: 7,
    minute: 0,
    tz
}, calendarChartsUpdater);


export const rootUpdaters: Array<Updater<any, any>> = [IDsUpdater, calendarChartsUpdater, eatTimingsUpdater];
