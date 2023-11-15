import {Subjects} from "../types/Subjects";
import {GoldinReportCard} from "../types/Goldin/ReportCard";
import {ReportCard} from "../types/ReportCard";

export default function convertReportCard(source: GoldinReportCard | undefined, subjects: Subjects): ReportCard | undefined {
    if (source) {
        let result = new Map();
        source.forEach((grades, subjectId) => {
            let subjectName = subjects.get(subjectId);
            if (subjectName) {
                result.set(subjectName, new Array<string | undefined>(7));
                grades.forEach((grade, date) => {
                    //TS can't understand what now subjectName is only string and what result[subjectName] exist
                    (result.get(subjectName as string) as Array<string | undefined>)[date.charCodeAt(date.length - 1) - "a".charCodeAt(0)] = grade;
                });
            }
        });
        return result;
    }
    else return undefined;
}