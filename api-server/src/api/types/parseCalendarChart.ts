import DatesRange from "./datesRange";
import CalendarChart from "./calendarChart";

const dateRegExp = /cgd(\d+)\s*=\s*"(\d+\.\d+)"/gm;

export default function parseCalendarChart (script: string): CalendarChart {
    let dates = new Array<string>(11);
    for(let match of script.matchAll(dateRegExp)) {
        let dateNumber = parseInt(match[1]);
        dates[dateNumber !== 0 ? dateNumber - 1 : 9] = match[2];
    }
    dates[10] = dates[0]; // Cycle dates for parsing

    let quarters = new Array<DatesRange>(4),
        holidays = new Array<DatesRange>(4),
        sessions = new Array<DatesRange>(2);

    for (let halfYear = 0; halfYear < 2; halfYear++) {
        quarters[2 * halfYear]     = new DatesRange(dates[5 * halfYear], dates[5 * halfYear + 1]);
        holidays[2 * halfYear]     = new DatesRange(dates[5 * halfYear + 1], dates[5 * halfYear + 2]);
        quarters[2 * halfYear + 1] = new DatesRange(dates[5 * halfYear + 2], dates[5 * halfYear + 3]);
        sessions[halfYear]         = new DatesRange(dates[5 * halfYear + 3], dates[5 * halfYear + 4]);
        holidays[2 * halfYear + 1] = new DatesRange(dates[5 * halfYear + 4], dates[5 * halfYear + 5]);
    }

    return {quarters, holidays, sessions};
}