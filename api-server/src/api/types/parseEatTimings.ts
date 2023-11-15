import {HTMLElement} from "node-html-parser";
import EatTiming from "./eatTiming";
import Timing from "./timing";
import ClassEatTimings from "./classEatTimings";

const timeRegExp = /\d{1,2}:\d{2}/g, classesRegExp = /(\d{1,2})([а-яё]+)/g;

type AddToAllTask = {
    eatType: string, eatTiming: EatTiming
};

export type ClassesEatTimings = Map<string, ClassEatTimings>;

export default function parseEatTimings(page: HTMLElement, timings: Array<Timing>): ClassesEatTimings {
    let table = page.querySelector("table.eat");
    if (!table) return new Map();

    let eatType: string | undefined;
    let allKnownClasses = new Set<string>();
    let classesEatTimings = new Map<string, Partial<ClassEatTimings>>();
    let addToAllTasks = new Array<AddToAllTask>();

    table.getElementsByTagName("tr").forEach(row => {
        let cells = row.getElementsByTagName("td");
        if (cells.length === 1) {
            eatType = cells[0].text.toLowerCase().trim();
        }
        else if (cells.length === 2) {
            let times = cells[0].text.match(timeRegExp),
                startTime = times?.[0],
                afterLesson = timings.findIndex(timing => timing.end == startTime),
                endTime;

            if (times && times.length > 1) endTime = times[1];
            else if (afterLesson != -1) endTime = timings[afterLesson + 1]?.start;

            let eatTiming: EatTiming | undefined;
            if (startTime && endTime && afterLesson != -1) eatTiming = new EatTiming(startTime, endTime, afterLesson);
            else return;

            let classes = new Array<string>();
            for (let classesGroups of cells[1].text.matchAll(classesRegExp)) {
                let classesNumber = classesGroups[1];
                for (let classLetter of classesGroups[2]) {
                    let className = `${classesNumber}${classLetter}`;
                    classes.push(className);
                    allKnownClasses.add(className);
                    if (eatTiming && eatType) addEatTiming(className, eatTiming, eatType, classesEatTimings);
                }
            }

            if (classes.length == 0 && eatType) addToAllTasks.push({eatType, eatTiming});
        }
    });

    addToAllTasks.forEach(addToAllTask =>
        allKnownClasses.forEach(className =>
            addEatTiming(className, addToAllTask.eatTiming, addToAllTask.eatType, classesEatTimings)
        )
    );

    let fullClassesEatTimings = new Array<[string, ClassEatTimings]>();
    classesEatTimings.forEach((classEatTimings, className) => {
        if (typeof classEatTimings.breakfast !== "undefined"
            && typeof classEatTimings.dinner !== "undefined"
            && typeof classEatTimings.afternoonSnack !== "undefined"
        ) {
            fullClassesEatTimings.push([className, {
                breakfast: classEatTimings.breakfast,
                dinner: classEatTimings.dinner,
                afternoonSnack: classEatTimings.afternoonSnack
            }]);
        }
    });

    return new Map(fullClassesEatTimings);
}

function addEatTiming (
    className: string,
    eatTiming: EatTiming,
    eatType: string,
    classesEatTimings: Map<string, Partial<ClassEatTimings>>
) {
    let classEatTimings: Partial<ClassEatTimings> | undefined = classesEatTimings.get(className);
    if (classEatTimings === undefined) classEatTimings = {};

    switch (eatType) {
        case "завтрак":
            classEatTimings.breakfast = eatTiming;
            break;
        case "обед":
            classEatTimings.dinner = eatTiming;
            break;
        case "полдник":
            classEatTimings.afternoonSnack = eatTiming;
            break;
    }
    classesEatTimings.set(className, classEatTimings);
}