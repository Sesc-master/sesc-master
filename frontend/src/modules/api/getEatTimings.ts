import ClassEatTimings from "./types/classEatTimings";
import query from "./graphql/query";

export default async function getEatTimings(className: string): Promise<ClassEatTimings | undefined> {
    const result = await query("getEatTimings", ClassEatTimings, {class: className});

    if (result instanceof Array) return undefined;

    return result;
}