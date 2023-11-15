import {Role} from "./types/Role";
import {Subjects} from "./types/Subjects";
import {Absences} from "./types/Absences";
import convertAbsences from "./converters/absences";
import reviver from "../JSONReviver";
import {Documents} from "./types/Documents";
import convertDocuments from "./converters/documents";
import {Teacher} from "./types/Teacher";
import {Journal} from "./types/Journal";
import convertJournal from "./converters/journal";
import {Notes} from "./types/Notes";
import convertNotes from "./converters/notes";
import {ReportCard} from "./types/ReportCard";
import convertReportCard from "./converters/reportCard";
import {LoginInfo} from "./types/LoginInfo";
import {Captcha} from "./types/Captcha";

function convertRoleForAPI(role: Role): string {
    if (role == "parent") return "par";
    else return role;
}

async function scoleRequest(methodName: string, login: string, token: string, role: Role, args?: Array<string>, reviverObjects?: Array<Array<string>>): Promise<any | "none"> {
    let requestBody: any = {
        f: methodName,
        l: login,
        p: token,
        t: convertRoleForAPI(role)
    }
    if (args) requestBody.z = args;

    return fetch("https://lycreg.urfu.ru", {
        method: "POST",
        body: JSON.stringify(requestBody)}
    ).then(response => response.text()).then(body => {
        if (body === "none") return undefined;
        else return JSON.parse(body, reviver(reviverObjects));
    });
}


const defaultSubjects: Map<string, string> = new Map([
    ["s110", "Русский язык"],
    ["s120", "Литература"],
    ["s210", "Английский язык"],
    ["s220", "Немецкий язык"],
    ["s230", "Французский язык"],
    ["s310", "Искусство"],
    ["s320", "МХК"],
    ["s330", "Музыка"],
    ["s410", "Математика"],
    ["s420", "Алгебра"],
    ["s430", "Алгебра и начала анализа"],
    ["s440", "Геометрия"],
    ["s450", "Информатика"],
    ["s510", "История"],
    ["s520", "История России"],
    ["s530", "Всеобщая история"],
    ["s540", "Обществознание"],
    ["s550", "Экономика"],
    ["s560", "Право"],
    ["s570", "География"],
    ["s610", "Физика"],
    ["s620", "Астрономия"],
    ["s630", "Химия"],
    ["s640", "Биология"],
    ["s710", "Технология"],
    ["s810", "Физическая культура"],
    ["s820", "ОБЖ"]
]);

var subjectListCache: Subjects = new Map();

export async function getSubjectList(login: string, token: string, role: Role): Promise<Subjects | undefined> {
    return scoleRequest("subjList", login, token, role).then(subjects => {
        if (subjects) {
            defaultSubjects.forEach((name, id) => subjects.set(id, name));
            subjectListCache = subjects;
            return subjects;
        }
        else return undefined;
    });
}

var teachersListCache: Array<Teacher> = [];

export async function getTeachersList(login: string, token: string, role: Role): Promise<Array<Teacher> | undefined> {
    return scoleRequest("teachList", login, token, role, undefined, [["login", "fio"]]).then(teachers => {
        if (teachers) {
            teachersListCache = teachers;
            return teachers;
        }
        else return undefined;
    })
}


export async function getCaptcha(): Promise<Captcha> {
    let headers: Headers;
    return fetch("https://lycreg.urfu.ru/cpt.a")
        .then(response => {
            headers = response.headers
            return response.blob()
        })
        .then(blob => {
            return new Promise(resolve => {
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () : any => {
                    resolve({
                        ID: Number(headers.get("x-cpt")),
                        data: reader.result as string
                    });
                }
            });
        });
}

export async function login(login: string, password: string, role: Role, captcha: number | string, captchaID: number | string): Promise<LoginInfo | undefined> {
    return fetch("https://lycreg.urfu.ru/", {
        method: "POST",
        body: JSON.stringify({
            f: "login",
            l: login,
            p: password,
            t: convertRoleForAPI(role),
            c: captcha.toString(),
            ci: captchaID.toString()
        })}).then(response => response.text()).then(body => {
        if (body == "none") return undefined;
        else return JSON.parse(body, reviver([["roles", "token"]]));
    });
}

export async function getJournal(login: string, token: string, role: Role, subjects: Subjects = subjectListCache, teachers: Array<Teacher> = teachersListCache): Promise<Journal | undefined> {
    return scoleRequest("jrnGet", login, token, role, [], [])
        .then(goldinJournal => convertJournal(goldinJournal, subjects, teachers));
}

export async function getNotes(login: string, token: string, role: Role, pupil: string | "" = login): Promise<Notes | undefined> {
    return scoleRequest("notesGet", login, token, role, [pupil], [["dt", "r", "rf", "t", "a", "af", "_id"]])
        .then(convertNotes);
}

export async function getReportCard(login: string, token: string, role: Role, subjects: Subjects = subjectListCache, target: string = login): Promise<ReportCard | undefined> {
    return scoleRequest("tabelGet", login, token, role, [target], [])
        .then(goldinReportCard => convertReportCard(goldinReportCard, subjects));
}

export async function getDocuments(login: string, token: string, role: Role, target: string = "pupil"): Promise<Documents | undefined> {
    return scoleRequest("sprGet", login, token, role, [target], [[
        "Uclass", "pupil", "vid", "start", "fin", "prim", "_id"
    ]]).then(convertDocuments);
}

export async function getAbsences(login: string, token: string, role: Role, subjects: Subjects = subjectListCache, pupil: string = login, className?: string): Promise<Absences | undefined> {
    return scoleRequest("absentGet", login, token, role, [className || "", pupil || ""], [["d", "s", "p", "abs"]])
        .then(goldinAbsences => convertAbsences(goldinAbsences, subjects));
}