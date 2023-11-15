import { Schedule } from "../api/types/Schedule";
import ScheduleLesson from "../api/types/ScheduleLesson";

const maxLessons = 7, maxSubgroups = 2;

export class TimetableElement {
    lessons: Array<ScheduleLesson | undefined> = new Array<ScheduleLesson | undefined>();
}

export function format (schedule: Schedule) : Array<TimetableElement>{
    let timetableItems = new Array<TimetableElement>()

    for (let i = 0; i < maxLessons; i++) {
        timetableItems.push(new TimetableElement());
    }

    schedule.lessons.forEach(element => {
        if (element.subgroup === 0) {
            timetableItems[element.number - 1].lessons = [element];
        }
        else {
            if (timetableItems[element.number - 1].lessons.length != maxSubgroups) {
                timetableItems[element.number - 1].lessons = new Array(maxSubgroups).fill(undefined);
            }
            timetableItems[element.number - 1].lessons[element.subgroup - 1] = element;
        }
    });

    schedule.diffs.forEach(element => {
        element.isChanged = true;

        if (element.subgroup === 0) {
            timetableItems[element.number - 1].lessons = [element];
        }
        else {
            if (timetableItems[element.number - 1].lessons.length != maxSubgroups) {
                timetableItems[element.number - 1].lessons = new Array(maxSubgroups).fill(undefined);
            }
            timetableItems[element.number - 1].lessons[element.subgroup - 1] = element;
        }
    });

    timetableItems.forEach(timetableItem => {
       if (timetableItem.lessons.length == 0) timetableItem.lessons = [undefined];
    });

    return timetableItems;
}
