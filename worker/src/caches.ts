import Cache from "./utils/cache";
import {CalendarCharts} from "./sesc/api/getCalendarChart";
import {IDsRecords} from "./sesc/parsers/parseIDs";
import Announcement from "./sesc/types/announcement";
import {Schedules} from "./utils/updaters/updatersFunctions";
import {ClassesEatTimings} from "./sesc/parsers/parseEatTimings";

export const calendarChartsCache = new Cache<CalendarCharts>('calendarChartsCache');
export const IDsRecordsCache = new Cache<IDsRecords>('IDsRecordsCache');
export const announcementsCache = new Cache<Array<Announcement>>('announcementsCache');
export const schedulesCache = new Cache<Schedules>('schedulesCache');
export const eatTimingsCache = new Cache<ClassesEatTimings>('eatTimingsCache');