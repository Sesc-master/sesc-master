import SESCRequest from "../request";
import {FullSchedule} from "../types/fullSchedule";

const methodType = 11;

export default async function getFullSchedule(weekday: number): Promise<FullSchedule> {
    return SESCRequest(`https://lyceum.urfu.ru/?type=${methodType}&scheduleType=all&weekday=${weekday}`)
        .then(response => new Map(Object.entries(JSON.parse(response)["auditories"])));
}