import {SubjectNote} from "./SubjectNote";
import {AvgMarks} from "./AvgMarks";

export type Subject = {
    teacher: string;
    id: string;
    notes: Array<SubjectNote>;
    avgMarks?: AvgMarks
}