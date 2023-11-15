import {Arg, Int, Query, Resolver} from "type-graphql";
import {IDsRecordsCache} from "../../caches";
import {ScheduleType, scheduleTypes} from "../types/scheculeType";

@Resolver()
export default class IDsResolver {
    @Query(type => [String])
    async getNames(@Arg("type", type => String) type: ScheduleType): Promise<Array<string>> {
        return IDsRecordsCache.getValue().then(IDsRecords => Array.from(IDsRecords[type]?.keys()) ?? new Array());
    }

    @Query(type => Int, {nullable: true})
    async getID(
        @Arg("type", type => String) type: ScheduleType,
        @Arg("name", type => String) name: string
    ): Promise<number | undefined> {
        return IDsRecordsCache.getValue().then(IDsRecords => IDsRecords[type]?.get(name));
    }

    @Query(type => String, {nullable: true})
    async getName(
        @Arg("type", type => String) type: ScheduleType,
        @Arg("ID", type => Int) ID: number
    ): Promise<string | undefined> {
        if (!scheduleTypes.includes(type)) return undefined;
        else return IDsRecordsCache.getValue().then(IDsRecords => Array.from(IDsRecords[type].entries()).find(([name, id]) => id == ID)?.[0]);
    }
}