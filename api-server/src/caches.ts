import Cache from "./utils/cache";
import {CalendarCharts} from "./api/types/calendarChart";
import {IDsRecords} from "./api/types/parseIDs";
import Announcement from "./api/types/announcement";
import {Schedules} from "./api/types/schedule";
import {ClassesEatTimings} from "./api/types/parseEatTimings";

export const calendarChartsCache = new Cache<CalendarCharts>('calendarChartsCache');
export const IDsRecordsCache = new Cache<IDsRecords>('IDsRecordsCache');
export const announcementsCache = new Cache<Array<Announcement>>('announcementsCache');
export const schedulesCache = new Cache<Schedules>('schedulesCache');
export const eatTimingsCache = new Cache<ClassesEatTimings>('eatTimingsCache');