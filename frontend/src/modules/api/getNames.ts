import {ScheduleType} from "./types/Schedule";
import query from "./graphql/query";

export default async function getNames (type: ScheduleType): Promise<Array<string>> {
    return await query("getNames", undefined, {type}) as Array<string>;
}