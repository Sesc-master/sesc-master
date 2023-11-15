import React from "react";
import Options from "../../components/options/Options";
import {setTargetSubject, diaryStore} from "../../modules/effector/DiaryStore";
import {setModalView} from "../../modules/effector/AppSettingsStore";
import {useStore} from "effector-react";

const Subjects = () => {
    const {subjects} = useStore(diaryStore)

    return (
        <>
            <Options options={subjects} setOption={(subject) => {
                setTargetSubject(subject)
                setModalView('')
            }}/>
        </>
    );
}

export default Subjects;