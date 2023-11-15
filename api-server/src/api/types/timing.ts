import "reflect-metadata";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
export default class Timing {
    @Field(type => String)
    start: string;

    @Field(type => String)
    end: string

    constructor(start: string, end: string) {
        this.start = start; this.end = end;
    }
}
