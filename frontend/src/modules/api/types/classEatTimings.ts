import EatTiming from "./eatTiming";
import Field from "../graphql/field";
import {Type} from "class-transformer";

export default class ClassEatTimings {
    @Field(EatTiming)
    @Type(() => EatTiming)
    public breakfast: EatTiming;
    @Field(EatTiming)
    @Type(() => EatTiming)
    public dinner: EatTiming;
    @Field(EatTiming)
    @Type(() => EatTiming)
    public afternoonSnack: EatTiming;
}