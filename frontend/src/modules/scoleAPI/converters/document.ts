import {GoldinDocument} from "../types/Goldin/Document";
import {Document} from "../types/Document";

export default function convertDocument(source: GoldinDocument): Document {

    return {
        class: source.Uclass,
        pupil: source.pupil,
        type: source.vid,
        dateStart: source.start.split("-")[2] + '.' + source.start.split("-")[1],
        dateEnd: source.fin.split("-")[2] + '.' + source.fin.split("-")[1],
        prim: source.prim,
        id: source._id
    }
}