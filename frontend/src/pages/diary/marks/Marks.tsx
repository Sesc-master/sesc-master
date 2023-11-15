import React, { useState, useEffect } from "react";
import {getReportCard} from "../../../modules/scoleAPI/ScoleAPI";
import MarksTable from "./marksTable/MarksTable";
import {useStore} from "effector-react";
import {diaryStore} from "../../../modules/effector/DiaryStore";
import {StorageKey} from "../../../modules/StorageKey";
import "./Marks.scss"
import Loading from "../../../components/loading/Loading";


const Marks = () => {
    const {token} = useStore(diaryStore)
    const {login, type} = JSON.parse(localStorage.getItem(StorageKey.Login) || '{}')
    const [marks, setMarks] = useState<Map<string, any> | undefined>()

    const setMarksData = async () => {
        const marks = new Map(await getReportCard(login, token, type) || [])
        setMarks(marks)
    }

    useEffect(() => {
        if (token) setMarksData()
    }, [token])

    return (
        <>
            {!marks && <Loading />}
            {marks && <div className='marks-content'>
                {Array.from(marks?.keys())?.map((subject : any, index) => {
                    return ( 
                        <div key={index}>
                            <MarksTable marks={marks?.get(subject)} subject={subject} />
                        </div>
                    )
                })}
            </div>}
        </>
    );
}

export default Marks;