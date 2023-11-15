import SESCRequest from "../request";

export const scheduleTypes = ["group", "auditory", "teacher"] as const;
export type ScheduleType = typeof scheduleTypes[number];

const methodType = 11;

export default async function getSchedule(scheduleType: ScheduleType, targetID: number, weekday: number | string) {
    return SESCRequest(`https://lyceum.urfu.ru/?type=${methodType}&scheduleType=${scheduleType}&weekday=${weekday}&${scheduleType}=${targetID}`)
        .then(response => JSON.parse(response));
}
