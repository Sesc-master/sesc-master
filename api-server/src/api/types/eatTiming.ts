import "reflect-metadata";
import Timing from "./timing";
import {Field, Int, ObjectType} from "type-graphql";

@ObjectType()
export default class EatTiming extends Timing {
    @Field(type => Int)
    afterLesson: number;

    constructor(start: string, end: string, afterLesson: number) {
        super(start, end);
        this.afterLesson = afterLesson
    }
}
