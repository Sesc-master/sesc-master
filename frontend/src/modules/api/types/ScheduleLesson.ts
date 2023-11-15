import Field from "../graphql/field";

export default class ScheduleLesson {
    @Field()
    subject: string;
    @Field()
    teacher: string;
    @Field()
    group: string;
    @Field()
    auditory: string;
    @Field()
    subgroup: number;
    @Field()
    number: number;
    isChanged: boolean = false;
};