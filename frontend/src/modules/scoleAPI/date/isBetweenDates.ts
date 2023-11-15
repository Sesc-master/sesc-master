import dateComparator from "./dateComparator";

export const isBetweenDates = (dates: string[], date: string) => {
    return dateComparator(date, dates[0]) >= 0 && dateComparator(date, dates[1]) <= 0
}