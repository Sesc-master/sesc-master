import {createEvent, createStore} from "effector";

export const setGrade = createEvent<string>()
export const setIsTimetableLoading = createEvent<boolean>()
export const setWeekSchedule = createEvent<Array<any>>()
export const setIsError = createEvent<boolean>()
export const setIsTeacher = createEvent<boolean>()
export const setTeacher = createEvent<string>()
export const setDay = createEvent<number>()
export const setClasses = createEvent<Array<string>>()
export const setTeachers = createEvent<Array<string>>()

export type ITimtabelStore = {
    grade: string,
    isTimetableLoading: boolean,
    weekSchedule: Array<any>,
    isError: boolean,
    isTeacher: boolean,
    teacher: string,
    day: number
    classes: Array<string>,
    teachers: Array<string>
}

export const timetableStore = createStore<ITimtabelStore>({
    isTimetableLoading: false,
    weekSchedule: [],
    isError: false,
    isTeacher: false,
    teacher: '',
    grade: "",
    day: 0,
    classes: [
        "8А", "8В",
        "9А", "9Б", "9В", "9Г", "9Е",
        "10А", "10Б", "10В", "10Г", "10Д", "10Е", "10З", "10К", "10Л", "10М", "10Н", "10С",
        "11А", "11Б", "11В", "11Г", "11Д", "11Е", "11З", "11К", "11Л", "11М", "11Н", "11С"
    ],
    teachers: []
})
    .on(setGrade, (state, grade) => (
        {...state, grade}
    ))
    .on(setIsTimetableLoading, (state, isTimetableLoading) => (
        {...state, isTimetableLoading}
    ))  
    .on(setWeekSchedule, (state, weekSchedule) => (
        {...state, weekSchedule}
    ))  
    .on(setIsError, (state, isError) => (
        {...state, isError}
    ))
    .on(setIsTeacher, (state, isTeacher) => (
        {...state, isTeacher}
    ))
    .on(setTeacher, (state, teacher) => (
        {...state, teacher}
    ))
    .on(setDay, (state, day) => (
        {...state, day}
    ))
    .on(setClasses, (state, classes) => (
        {...state, classes}
    ))
    .on(setTeachers, (state, teachers) => (
        {...state, teachers}
    ))