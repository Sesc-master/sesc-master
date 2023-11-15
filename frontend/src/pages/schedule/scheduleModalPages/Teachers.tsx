import React, {useEffect, useState} from "react";
import Options from "../../../components/options/Options";
import {setModalView} from "../../../modules/effector/AppSettingsStore";
import {setTeacher, setIsTeacher, timetableStore, setTeachers} from "../../../modules/effector/TimetableStore";
import Loading from "../../../components/loading/Loading";
import {useLoadTimetable} from "../../../hooks/useLoadTimetable";
import getNames from "../../../modules/api/getNames";
import {useStore} from "effector-react";

const Teachers = () => {
    const {teachers} = useStore(timetableStore);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    if (teachers.length == 0) useEffect(() => {
        setIsLoading(true)

        getNames("teacher")
            .then(teachers => {
                setIsLoading(false);
                setTeachers(teachers);
            })
    }, [])

    return (
        <>
            <Options options={teachers} setOption={(teacher) => {
                setModalView('')
                setTeacher(teacher)
                setIsTeacher(true)
                useLoadTimetable("", teacher, true)
            }}/>
            {isLoading && <Loading />}
        </>
    );
}

export default Teachers;