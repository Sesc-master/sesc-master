import getSchedule from "../api/getSchedule";

export async function getWeekSchedule(key: string, isTeacher?: boolean) {
    const type = isTeacher ? 'teacher' : 'group';

    return await Promise.all(Array.from({length: 6}, (_, dayIndex) => {
        return getSchedule(type, dayIndex + 1, key)
            .catch(() => undefined)
    }));
}