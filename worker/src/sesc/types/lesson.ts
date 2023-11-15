import BaseLesson from "./baseLesson";

export interface Lesson extends BaseLesson {
    uid: number;
    auditory: string;
    subgroup: number;
    number: number;
    weekday: number;
    date?: string;
}