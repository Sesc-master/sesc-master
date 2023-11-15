import {createStore, createEvent,} from "effector";

export const setSubjects = createEvent<string[]>()
export const setDiary = createEvent<{}>()
export const setIsLogin = createEvent<boolean>()
export const setTargetSubject = createEvent<string>()
export const setToken = createEvent<string>()
export const setIsDiaryLoading = createEvent<boolean>()
export const setTeacher = createEvent<string>()
export const setIsError = createEvent<boolean>()


export type IDiaryStore = {
    subjects: string [],
    diary: any,
    isLogin: boolean,
    targetSubject: string,
    token: string,
    isDiaryLoading: boolean,
    teacher: string,
    isError: boolean,
}

export const diaryStore = createStore<IDiaryStore>({
    subjects: [],
    diary: {},
    isLogin: false,
    targetSubject: '',
    token: '',
    isDiaryLoading: false,
    teacher: '',
    isError: false,
})
    .on(setDiary, (state, diary) => (
        {...state, diary}
    ))
    .on(setIsDiaryLoading, (state, isDiaryLoading) => (
        {...state, isDiaryLoading}
    ))
    .on(setToken, (state, token) => (
        {...state, token}
    ))
    .on(setTargetSubject, (state, targetSubject) => (
        {...state, targetSubject}
    ))
    .on(setIsLogin, (state, isLogin) => (
        {...state, isLogin}
    ))
    .on(setSubjects, (state, subjects) => (
        {...state, subjects}
    ))
    .on(setTeacher, (state, teacher) => (
        {...state, teacher}
    ))
    .on(setIsError, (state, isError) => (
        {...state, isError}
    ))
