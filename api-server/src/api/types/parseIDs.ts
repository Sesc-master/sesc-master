import {HTMLElement} from "node-html-parser";

export const IDsTypes = ["group", "auditory", "teacher", "weekday"] as const;

export type IDsType = typeof IDsTypes[number];
export type IDsRecords = Record<IDsType, Map<string, number>>;

const ignoringValues: Array<string> = ["Выберите класс", "Выберите аудиторию", "Выберите преподавателя", "Выберите день", "Нет", "Учитель"];

export default function parseIDs (page: HTMLElement): IDsRecords {
    let IDs = Object.fromEntries(IDsTypes.map(IDType => [IDType, new Map<string, number>()])) as IDsRecords;

    page.getElementsByTagName("form")[0]
        .getElementsByTagName("select")
        // @ts-ignore I can't use string as searchElement in includes method of IDsTypes (readonly array of literals)
        .filter(element => IDsTypes.includes(element.attributes["data-name"]))
        .forEach(select => {
            let IDType = select.attributes["data-name"] as IDsType;
            select.getElementsByTagName("option")
                .filter(option => !ignoringValues.includes(option.text))
                .forEach(option => {
                    let name = option.text;
                    let id = parseInt(option.attributes["value"]);
                    IDs[IDType].set(name, id);
                });
        });

    return IDs;
}