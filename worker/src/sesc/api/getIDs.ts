import SESCRequest from "../request";
import { parse } from "node-html-parser";
import parseIDs, {IDsRecords} from "../parsers/parseIDs";

export default async function getIDs (): Promise<IDsRecords> {
    return SESCRequest("https://lyceum.urfu.ru/ucheba/raspisanie-zanjatii")
        .then(pageBody => parse(pageBody))
        .then(parseIDs);
}
