import SESCRequest from "../request";
import {parse} from "node-html-parser";
import parseEatTimings from "../parsers/parseEatTimings";
import Timing from "../types/timing";

export default async function getEatTimings (lessonsTimings: Array<Timing>) {
    return SESCRequest("https://lyceum.urfu.ru/ucheba/raspisanie-zvonkov")
        .then(parse)
        .then(page => parseEatTimings(page, lessonsTimings));
}