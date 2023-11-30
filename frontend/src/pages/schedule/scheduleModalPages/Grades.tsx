import React, {useMemo, useState} from "react";

import Options from "../../../components/options/Options"
import {appSettingsStore, setModalView} from "../../../modules/effector/AppSettingsStore";
import {setGrade, setIsTeacher, timetableStore} from '../../../modules/effector/TimetableStore'
import {useLoadTimetable} from '../../../hooks/useLoadTimetable'
import {useStore} from "effector-react";


const Grades = () => {
    const [classNumber, setClassNumber] = useState("");
    const {classes} = useStore(timetableStore);
    const isFullClassesListModal = useMemo(() => true, []);
    const classesNumbers = useMemo(() => Array.from(new Set(classes.map(className => className.slice(0, -1)))), []);
    const isClassesList = useMemo(() => isFullClassesListModal || (classNumber !== ""), []);
    const selectableClasses = useMemo(() => isFullClassesListModal ? classes : classes.filter(className => className.startsWith(classNumber)), []);

    return (
        <>
            {isClassesList ? <Options options={selectableClasses} setOption={
                (grade) => {
                    setGrade(grade);
                    setModalView("");
                    setIsTeacher(false);
                    useLoadTimetable(grade, "", false)}}/>
                : <Options options={classesNumbers} setOption={
                    (option) => setTimeout(() => setClassNumber(option), 100)
                }/>
            }
        </>
    );
}

export default Grades;