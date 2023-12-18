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
import {YearTimings} from "./types/YearTimings";

function convertRoleForAPI(role: Role): string {
    if (role == "parent") return "par";
    else return role;
}

export const getJournalVars = async () => {
  try {
    const code = await fetch('https://lycreg.urfu.ru/js/ini.js')
      .then((res) => res.text());

    eval(`try { ${code}
        window.STPER = STPER;
        window.roleNames = roleNames;
        window.subjDef = subjDef;
    } catch {}`);

    const parseDate = (dateString: string): Date => {
      const [day, month] = dateString.split('.').map(Number);

      if (new Date().getMonth() + 1 >= 1 && new Date().getMonth() + 1 <= 7) {
        if (month >= 1 && month <= 7) {
          return new Date(new Date().getFullYear(), month - 1, day);
        } else {
          return new Date(new Date().getFullYear() - 1, month - 1, day);
        }
      } else {
        if (month >= 1 && month <= 7) {
          return new Date(new Date().getFullYear() + 1, month - 1, day);
        } else {
          return new Date(new Date().getFullYear(), month - 1, day);
        }
      }
    };
    const STPERArray = (window as any).STPER;

    console.log(STPERArray);

    const yearTimings: YearTimings = {
      firstQuarter: {
        name: STPERArray[0][0],
        start: parseDate(STPERArray[0][2]),
        end: parseDate(STPERArray[0][3]),
        originalDates: [STPERArray[0][2], STPERArray[0][3]]
      },
      secondQuarter: {
        name: STPERArray[1][0],
        start: parseDate(STPERArray[1][2]),
        end: parseDate(STPERArray[1][3]),
        originalDates: [STPERArray[1][2], STPERArray[1][3]]
      },
      firstSemester: {
        name: STPERArray[2][0],
        start: parseDate(STPERArray[2][2]),
        end: parseDate(STPERArray[2][3]),
        originalDates: [STPERArray[2][2], STPERArray[2][3]]
      },
      thirdQuarter: {
        name: STPERArray[3][0],
        start: parseDate(STPERArray[3][2]),
        end: parseDate(STPERArray[3][3]),
        originalDates: [STPERArray[3][2], STPERArray[3][3]]
      },
      fourthQuarter: {
        name: STPERArray[4][0],
        start: parseDate(STPERArray[4][2]),
        end: parseDate(STPERArray[4][3]),
        originalDates: [STPERArray[4][2], STPERArray[4][3]]
      },
      secondSemester: {
        name: STPERArray[5][0],
        start: parseDate(STPERArray[5][2]),
        end: parseDate(STPERArray[5][3]),
        originalDates: [STPERArray[5][2], STPERArray[5][3]]
      },
      year: {
        name: STPERArray[6][0],
        start: parseDate(STPERArray[6][2]),
        end: parseDate(STPERArray[6][3]),
        originalDates: [STPERArray[6][2], STPERArray[6][3]]
      }
    };

    return {
      yearTimings: yearTimings as YearTimings,
      roleNames: (window as any).roleNames as Array<string []>,
      subjectNames: new Map(Object.entries((window as any).subjDef)) as Subjects
    }
  } catch {
    return {
      yearTimings: null,
      roleNames: null,
      subjectNames: null
    }
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
    return scoleRequest("subjList", login, token, role).then(async subjects => {
        if (subjects) {
            const { subjectNames } = await getJournalVars();
            (subjectNames || defaultSubjects).forEach((name, id) => subjects.set(id, name));
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