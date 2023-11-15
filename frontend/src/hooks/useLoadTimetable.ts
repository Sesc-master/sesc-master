import {
    setWeekSchedule,
    setIsTimetableLoading,
    setIsError,
} from '../modules/effector/TimetableStore'
import {StorageKey} from "../modules/StorageKey";
import {getWeekSchedule} from "../modules/schedule/getWeekSchedule";

export const useLoadTimetable = async (grade: string, teacher: string, isTeacher: boolean = false) => {
    try {
        localStorage.setItem(StorageKey.Timetable ,JSON.stringify({grade, teacher, isTeacher}));

        const key = isTeacher ? teacher : grade;

        setIsTimetableLoading(true)
        setIsError(false)

        const weekSchedule = await getWeekSchedule(key, isTeacher)
        setWeekSchedule(weekSchedule)

        setIsTimetableLoading(false)
    } catch {
        setIsError(true)
        setIsTimetableLoading(false)
    }
}
