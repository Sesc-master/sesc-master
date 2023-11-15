import Timing from "./timing";
import Field from "../graphql/field";

export default class EatTiming extends Timing {
    @Field()
    public start: string;
    @Field()
    public end: string;
    @Field()
    public afterLesson: number;
}