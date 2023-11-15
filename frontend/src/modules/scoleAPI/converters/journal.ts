import {GoldinJournal} from "../types/Goldin/Journal";
import {Teacher} from "../types/Teacher";
import {Journal} from "../types/Journal";
import {SubjectNote} from "../types/SubjectNote";
import dateConvert from "../date/dateConverter";
import dateComparator from "../date/dateComparator";
import {Subjects} from "../types/Subjects";

export default function convertJournal(source: GoldinJournal | undefined, subjects: Subjects, teachers: Array<Teacher>): Journal | undefined{
    if (!source) return undefined;
    let result: Journal = new Map();
    source.forEach((journalNotes, teacher) => {
        let [className, subjectId, teacherLogin] = teacher.split("_");

        let subjectName = subjects.get(subjectId);
        let teacherName = teachers.find(teacherObject => teacherObject.login === teacherLogin)?.fio;

        if (!subjectName || !teacherName) return;

        result.set(subjectName, { teacher: teacherName, id: subjectId, notes: [] });
        journalNotes.forEach((note, day) => {
            let newNote: SubjectNote = {
                date: dateConvert(day),
                theme: note[0],
                hometask: note[1],
                coefficient: note[2],
            };
            if (note[3]) newNote.grades = note[3];
            //TS don't understand what now subjectName is only string
            result.get(subjectName as string)?.notes.push(newNote);
        });
        result.get(subjectName)?.notes.sort((firstNote, secondNote) =>
            dateComparator(firstNote.date, secondNote.date)
        );
    });
    return result;
}