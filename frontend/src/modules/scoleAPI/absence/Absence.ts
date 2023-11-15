import {Absences} from "../types/Absences";
import {Documents} from "../types/Documents";
import {isBetweenDates} from "../date/isBetweenDates"
import {academicDates} from "../date/academicDates";
import {Absent} from "../types/Absent";
import {IStatistics} from "./Statistics";

class Absence {
    absences : Absences | undefined;
    documents : Documents | undefined;

    constructor(absences: Absences, documents: Documents) {
        this.absences = absences;
        this.documents = documents;
    }

    public isSkip = (date: string) => {
        if (!this.documents || !this.documents.length){
            return false;
        }

        for (let i = 0; i < this.documents.length; i++) {
            const start = this.documents[i].dateStart;
            const end = this.documents[i].dateEnd;

            if (isBetweenDates([start, end], date)){
                return false;
            }
        }
        return true;
    }

    public getYearStatistics = () : IStatistics[] => {
        const statistics: IStatistics[] = [];

        Object.values(academicDates).forEach(({dates, name : period}) => {
            let allLessons = 0;
            let skippedLessons = 0;
            Array.from(this.absences?.values() || []).forEach((absent: Absent[]) => {
                Object.values(absent).forEach(({date, abs}: Absent) => {
                    if (this.isSkip(date) && isBetweenDates(dates, date)) {
                        skippedLessons += abs;
                    }
                    if (isBetweenDates(dates, date)){
                        allLessons += abs;
                    }
                })
            })
            statistics.push({period, allLessons, skippedLessons})
        })

        return statistics;
    }
}

export default Absence;