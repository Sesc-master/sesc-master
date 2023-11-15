import DatesRange from "./datesRange";

export default interface CalendarChart {
    quarters: Array<DatesRange>;
    holidays: Array<DatesRange>;
    sessions: Array<DatesRange>;
}