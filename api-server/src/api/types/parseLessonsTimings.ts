import Timing from "./timing";

const lessonTimingRegExp = /rzd\[(\d+)]\s+=\s+"(\d{1,2}:\d{2})\s+-\s+(\d{1,2}:\d{2})"/gm;

export default function parseLessonsTimings (script: string): Array<Timing> {
    let lessons = new Array<Timing>();
    for (let lessonTimingMatch of script.matchAll(lessonTimingRegExp)) {
        let lessonIndex = parseInt(lessonTimingMatch[1]) - 1,
            lessonStart = lessonTimingMatch[2],
            lessonEnd = lessonTimingMatch[3];

        lessons[lessonIndex] = new Timing(lessonStart, lessonEnd);
    }
    return lessons;

}