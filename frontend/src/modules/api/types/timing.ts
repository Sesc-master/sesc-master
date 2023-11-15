import "reflect-metadata";
import Field from "../graphql/field";

export default class Timing {
    @Field()
    public start: string;
    @Field()
    public end: string;
}