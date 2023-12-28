import {YearTimings} from "../types/YearTimings";

const STUDY_PERIODS_DEFINITION_REGEXP = /STPER\s*=\s*\[((\s*\[\s*"[^"]+"\s*,\s*"[^"]+"\s*,\s*"\d{2}\.\d{2}"\s*,\s*"\d{2}\.\d{2}"\s*\]\s*,)*\s*\[\s*"[^"]+"\s*,\s*"[^"]+"\s*,\s*"\d{2}\.\d{2}"\s*,\s*"\d{2}\.\d{2}"\s*\])\s*\]/m
const STUDY_PERIOD_REGEXP = /\["([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"(\d{2}\.\d{2})"\s*,\s*"(\d{2}\.\d{2})"\]/gm

function parseDate (dateString: string): Date  {
    const [day, month] = dateString.split('.').map(Number);

    if (new Date().getMonth() + 1 >= 1 && new Date().getMonth() + 1 <= 7) {
        if (month >= 1 && month <= 7) {
            return new Date(new Date().getFullYear(), month - 1, day);
        } else {
            return new Date(new Date().getFullYear() - 1, month - 1, day);
        }
    } else {
        if (month >= 1 && month <= 7) {
            return new Date(new Date().getFullYear() + 1, month - 1, day);
        } else {
            return new Date(new Date().getFullYear(), month - 1, day);
        }
    }
};

export function parseYearTimings(script: string): YearTimings {
    let studyPeriodsDefinition = script.match(STUDY_PERIODS_DEFINITION_REGEXP)?.[1] || "";
    const STPERArray = Array.from(studyPeriodsDefinition.matchAll(STUDY_PERIOD_REGEXP))
        .map(value => [value[1], value[2], value[3], value[4]]);

    return {
        firstQuarter: {
            name: STPERArray[0][1],
            start: parseDate(STPERArray[0][2]),
            end: parseDate(STPERArray[0][3]),
            originalDates: [STPERArray[0][2], STPERArray[0][3]]
        },
        secondQuarter: {
            name: STPERArray[1][1],
            start: parseDate(STPERArray[1][2]),
            end: parseDate(STPERArray[1][3]),
            originalDates: [STPERArray[1][2], STPERArray[1][3]]
        },
        firstSemester: {
            name: STPERArray[2][1],
            start: parseDate(STPERArray[2][2]),
            end: parseDate(STPERArray[2][3]),
        originalDates: [STPERArray[2][2], STPERArray[2][3]]
        },
        thirdQuarter: {
            name: STPERArray[3][1],
            start: parseDate(STPERArray[3][2]),
            end: parseDate(STPERArray[3][3]),
            originalDates: [STPERArray[3][2], STPERArray[3][3]]
        },
        fourthQuarter: {
            name: STPERArray[4][1],
            start: parseDate(STPERArray[4][2]),
            end: parseDate(STPERArray[4][3]),
            originalDates: [STPERArray[4][2], STPERArray[4][3]]
        },
        secondSemester: {
            name: STPERArray[5][1],
            start: parseDate(STPERArray[5][2]),
            end: parseDate(STPERArray[5][3]),
            originalDates: [STPERArray[5][2], STPERArray[5][3]]
        },
        year: {
            name: STPERArray[6][1],
            start: parseDate(STPERArray[6][2]),
            end: parseDate(STPERArray[6][3]),
            originalDates: [STPERArray[6][2], STPERArray[6][3]]
        }
    };
}
