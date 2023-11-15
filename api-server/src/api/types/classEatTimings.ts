import EatTiming from "./eatTiming";
import {Field, ObjectType} from "type-graphql";

@ObjectType()
export default class ClassEatTimings {
    @Field(type => EatTiming)
    public breakfast: EatTiming;
    @Field(type => EatTiming)
    public dinner: EatTiming;
    @Field(type => EatTiming)
    public afternoonSnack: EatTiming;

    constructor(breakfast: EatTiming, dinner: EatTiming, afternoonSnack: EatTiming) {
        this.breakfast = breakfast;
        this.dinner = dinner;
        this.afternoonSnack = afternoonSnack;
    }
}