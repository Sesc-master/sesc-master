import {SubjectNote} from "./SubjectNote";

export type Subject = {
    teacher: string;
    id: string;
    notes: Array<SubjectNote>;
}