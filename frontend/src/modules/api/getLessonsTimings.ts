import "reflect-metadata";
import Timing from "./types/timing";
import query from "./graphql/query";

export default async function getLessonsTimings (): Promise<Array<Timing>> {
    let result = await query("getLessonsTimings", Timing);

    if (result instanceof Array) return result;
    else return [];
}