import {GoldinAbsences} from "../types/Goldin/Absences";
import {Absences} from "../types/Absences";
import {Subjects} from "../types/Subjects";
import convertAbsent from "./absent";

export default function convertAbsences(source: GoldinAbsences | undefined, subjects: Subjects): Absences | undefined {
    if (!source) return undefined;

    let result = new Map();
    source.forEach(absent => {
        let subject = subjects.get(absent.s);
        let absentObject = convertAbsent(absent, subjects);
        if (absentObject) {
            if (result.has(subject)) result.get(subject)?.push(absentObject);
            else result.set(subject, [absentObject]);
        }
    });
    return result;
}