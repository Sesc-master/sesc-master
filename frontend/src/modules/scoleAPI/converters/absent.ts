import { GoldinAbsent } from "../types/Goldin/Absent";
import { Absent } from "../types/Absent";
import dateConvert from "../date/dateConverter";
import {Subjects} from "../types/Subjects";

export default function convertAbsent(source: GoldinAbsent | undefined, subjects: Subjects): Absent | undefined {
    if (!source) return undefined;
    let subject = subjects.get(source.s);
    if (subject)
        return  {
            date: dateConvert(source.d),
            subject: subject,
            subjectID: source.s,
            pupil: source.p,
            abs: source.abs
        }
    else return undefined;
}