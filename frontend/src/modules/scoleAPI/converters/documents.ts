import {GoldinDocuments} from "../types/Goldin/Documents";
import {Documents} from "../types/Documents";
import convertDocument from "./document";

export default function convertDocuments(source: GoldinDocuments | undefined): Documents | undefined {
    if (source) return source.map(convertDocument);
    else return undefined;
}