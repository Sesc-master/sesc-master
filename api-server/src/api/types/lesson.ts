import BaseLesson from "./baseLesson";
import {Field, Int, ObjectType} from "type-graphql";

@ObjectType()
export class Lesson extends BaseLesson {
    public readonly uid!: number;
    @Field(type => String)
    public readonly auditory!: string;
    @Field(type => Int)
    public readonly subgroup!: number;
    @Field(type => Int)
    public readonly number!: number;
    @Field(type => Int)
    public readonly weekday!: number;
    @Field(type => String, {nullable: true})
    public readonly date?: string;
}