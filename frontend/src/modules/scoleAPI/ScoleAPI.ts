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
import {parseYearTimings} from "./iniParsing/yearTimings";
import {parseDefaultSubjects} from "./iniParsing/defaultSubjects";
import {parseRolesNames} from "./iniParsing/rolesNames";
import {parseAbsentDocsNames} from "./iniParsing/absentDocs";
import {resolve_captcha, MonochromePicture, load_raw_num_masks} from "scole-captcha-resolver";
import RAW_NUM_MASKS from "./raw_num_masks";

const JOURNAL_URL = "https://lycreg.urfu.ru";

function convertRoleForAPI(role: Role): string {
    if (role == "parent") return "par";
    else return role;
}


export async function getJournalVars() {
    try {
        let script = await fetch(`${JOURNAL_URL}/js/ini.js`)
            .then(response => response.text());

        return {
            yearTimings: parseYearTimings(script),
            roleNames: parseRolesNames(script),
            subjectNames: parseDefaultSubjects(script),
            absentDocsNames: parseAbsentDocsNames(script)
        }
  }
  catch {
        return {yearTimings: null, roleNames: null, subjectNames: null, absentDocsNames: null}
  }
}

async function scoleRequest(methodName: string, login: string, token: string, role: Role, args?: Array<string>, reviverObjects?: Array<Array<string>>): Promise<any | "none"> {
    let requestBody: any = {
        f: methodName,
        l: login,
        p: token,
        t: convertRoleForAPI(role)
    }
    if (args) requestBody.z = args;

    return fetch(JOURNAL_URL, {
        method: "POST",
        body: JSON.stringify(requestBody)}
    ).then(response => response.text()).then(body => {
        if (body === "none") return undefined;
        else return JSON.parse(body, reviver(reviverObjects));
    });
}

var subjectListCache: Subjects = new Map();

export async function getSubjectList(login: string, token: string, role: Role): Promise<Subjects | undefined> {
    return scoleRequest("subjList", login, token, role).then(async subjects => {
        if (subjects) {
            const { subjectNames } = await getJournalVars();
            subjectNames?.forEach((name, id) => subjects.set(id, name));
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
    const captcha_response = await fetch(`${JOURNAL_URL}/cpt.a`);
    const ID = parseInt(captcha_response.headers.get("x-cpt") || "");
    const captcha = await captcha_response.arrayBuffer();
    const captcha_monochrome_picture = MonochromePicture.from_png(captcha),
        data = resolve_captcha(captcha_monochrome_picture, load_raw_num_masks(RAW_NUM_MASKS));

    return { ID, data }
}

export async function login(login: string, password: string, role: Role, captcha: number | string, captchaID: number | string): Promise<LoginInfo | undefined> {
    return fetch(JOURNAL_URL, {
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
    const { yearTimings } = await getJournalVars();

    if (yearTimings) {
        return scoleRequest("jrnGet", login, token, role, [], [])
            .then(goldinJournal => convertJournal(goldinJournal, subjects, teachers, yearTimings));
    }

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