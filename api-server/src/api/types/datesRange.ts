import {Field, ObjectType} from "type-graphql";

@ObjectType()
export default class DatesRange {
    @Field(type => String)
    public readonly start: string;
    @Field(type => String)
    public readonly end: string;

    constructor(start: string, end: string) {
        this.start = start;
        this.end = end;
    }
}