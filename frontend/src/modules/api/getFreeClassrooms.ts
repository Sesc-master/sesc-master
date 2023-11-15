import query from "./graphql/query";

export default async function getFreeClassrooms(weekday: number) : Promise<Array<Array<string>>> {
    return await query("getFreeClassrooms", undefined, {weekday}) as Array<Array<string>>;
}