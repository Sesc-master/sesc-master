import {GoldinJournal} from "../types/Goldin/Journal";
import {Teacher} from "../types/Teacher";
import {Journal} from "../types/Journal";
import {SubjectNote} from "../types/SubjectNote";
import dateConvert from "../date/dateConverter";
import dateComparator from "../date/dateComparator";
import {Subjects} from "../types/Subjects";
import {JournalTiming, YearTimings} from "../types/YearTimings";
import {AvgMarks} from "../types/AvgMarks";
import {isBetweenDates} from "../date/isBetweenDates";
import {Subject} from "../types/Subject";

const countAvg = (notes: Array<SubjectNote>) => {
  let sum = 0;
  let counter = 0;

  for (const note of notes) {
    const numericMarks = note.grades?.split(' ').filter((mark) => !isNaN(Number(mark)))

    if (!numericMarks) {
      continue;
    }

    for (const numericMark of numericMarks) {
      if (numericMarks) {
        counter += +note.coefficient;
        sum += +note.coefficient * Number(numericMark);
      }
    }
  }

  return Number((sum / counter).toFixed(2));
}

const getAvgMarksForNotes = (notes: Array<SubjectNote>, yearTimings: YearTimings): AvgMarks => {
  return Object.entries(yearTimings).reduce((prev, [key, value]) => {
    const mark = countAvg(notes.filter((note) => {
          return isBetweenDates((value as JournalTiming).originalDates, note.date)
    }));

    return {
      ...prev,
      [key]: {
          mark: isNaN(mark) ? '-' : mark,
          timing: value
      }
    }
  }, {}) as AvgMarks;
}

export default function convertJournal(source: GoldinJournal | undefined, subjects: Subjects, teachers: Array<Teacher>, yearTimings?: YearTimings): Journal | undefined{
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

        if (yearTimings && result.get(subjectName)?.notes) {
            (result.get(subjectName) as Subject).avgMarks = getAvgMarksForNotes(
                result.get(subjectName)?.notes as SubjectNote [],
                yearTimings
            );
        }
    });


    return result;
}