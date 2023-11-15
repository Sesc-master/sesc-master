import React, {useState, useEffect, useMemo} from "react";
import {getAbsences, getDocuments} from "../../../modules/scoleAPI/ScoleAPI";
import {useStore} from "effector-react";
import {diaryStore} from "../../../modules/effector/DiaryStore";
import {StorageKey} from "../../../modules/StorageKey";
import "./SkippedLessons.module.scss"
import Loading from "../../../components/loading/Loading";
import Absence from "../../../modules/scoleAPI/absence/Absence";
import {IStatistics} from "../../../modules/scoleAPI/absence/Statistics";
import Statistics from "./statistics/Statistics";
import styles from "./SkippedLessons.module.scss"

const SkippedLessons = () : JSX.Element => {
    const [absences, setAbsences] = useState<Map<string, any> | undefined>()
    const {token} = useStore(diaryStore)
    const [documents, setDocuments] = useState<any[] | undefined>();

    const statistics = useMemo(() : IStatistics[] | undefined => {
            if (!absences || !documents) return undefined;

            const absence = new Absence(absences, documents);
            return absence.getYearStatistics();
    }, [absences, documents])

    const setAbsencesData = async () => {
        try {
            const {login, type} = JSON.parse(localStorage.getItem(StorageKey.Login) || '{}')
            const absences = new Map(await getAbsences(login, token, type) || [])
            setDocuments(await getDocuments(login, token, type))
            await setAbsences(absences)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (token) setAbsencesData()
    }, [token])

    return (
        <>
            {!absences && <Loading />}
            {absences &&
                <div className={styles.content}>
                    <Statistics statistics={statistics}/>
                    <div className={styles.hint}>
                        <circle className={styles.circle}></circle>
                        <h5 style={{margin: 0}}>- пропуски без освобождения</h5>
                    </div>
                    {Array.from(absences?.keys())?.map((subject, index) => (
                        <div className={styles.absence} key={index}>
                            <div className={styles.subject}>{subject}</div>
                            <div className={styles.dates}>
                                {absences.get(subject)?.map((absence : any) => {
                                    return `${absence.date}(${absence.abs}), `
                                })}
                            </div>
                        </div>
                    ))}
            </div>}
        </>
    );
}

export default SkippedLessons;
