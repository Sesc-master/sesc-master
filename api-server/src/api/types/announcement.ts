import {Field, ObjectType} from "type-graphql";

@ObjectType()
export default class Announcement {
    @Field(type => String)
    public readonly name: string;
    @Field(type => String)
    public readonly dateStart: string;
    @Field(type => String)
    public readonly dateEnd: string;
    @Field(type => [String])
    public readonly paragraphs: Array<string>;

    public constructor(name: string, dateStart: string, dateEnd: string, paragraphs: Array<string>) {
        this.name = name;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.paragraphs = paragraphs;
    }
}