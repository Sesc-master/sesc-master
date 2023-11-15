import React, { useState, useEffect } from "react";
import { getDocuments } from "../../../modules/scoleAPI/ScoleAPI";
import {useStore} from "effector-react";
import {diaryStore} from "../../../modules/effector/DiaryStore";
import {StorageKey} from "../../../modules/StorageKey";
import "./Documents.scss"
import Loading from "../../../components/loading/Loading";
import {Document} from "../../../modules/scoleAPI/types/Document";

const Documents = () => {
    const {token} = useStore(diaryStore)
    const [documents, setDocuments] = useState<Document[] | undefined>()

    const setDocumentsData = async () => {
        const {login, type} = JSON.parse(localStorage.getItem(StorageKey.Login) || '{}')
        let documents = await getDocuments(login, token, type)
        setDocuments(documents || [])
    }

    useEffect(() => {
        if (token) setDocumentsData()
    }, [])

    return (
        <>
            {!documents && <Loading />}
            {documents && <div className="documents-content">
                {documents?.map((document, index) => (
                    <div key={index} className="documents-text">
                        {`Освобождение с ${document?.dateStart?.split('-').join('.')} 
                        до ${document?.dateEnd?.split('-').join('.')}`}
                    </div>
                ))}
            </div>}
        </>
    );
}

export default Documents;