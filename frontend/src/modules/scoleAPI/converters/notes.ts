import {Notes} from "../types/Notes";
import {GoldinNotes} from "../types/Goldin/Notes";
import convertNote from "./note";
import dateComparator from "../date/dateComparator";

export default function convertNotes(source: GoldinNotes | undefined): Notes | undefined{
    if (source) return source.map(convertNote)
        .sort((firstNote, secondNote) => dateComparator(firstNote.date, secondNote.date));
    else return undefined;
}