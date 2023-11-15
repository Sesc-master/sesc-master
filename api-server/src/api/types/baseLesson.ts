import {Field, ObjectType} from "type-graphql";

@ObjectType()
export default class BaseLesson {
    @Field(type => String)
    subject!: string;
    @Field(type => String)
    teacher!: string;
    @Field(type => String)
    group!: string;
}