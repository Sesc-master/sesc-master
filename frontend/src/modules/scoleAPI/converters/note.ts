import {GoldinNote} from "../types/Goldin/Note";
import {Note} from "../types/Note";
import dateConvert from "../date/dateConverter";

export default function convertNote(source: GoldinNote): Note {
    return {
        author: source.af,
        authorLogin: source.a,
        to: source.rf,
        toID: source.r,
        text: source.t,
        date: dateConvert(source.dt),
        id: source._id
    }
}