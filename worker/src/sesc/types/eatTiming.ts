import "reflect-metadata";
import Timing from "./timing";

export default interface EatTiming extends Timing {
    afterLesson: number;
}
