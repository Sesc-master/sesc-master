import React, { useState, useEffect } from "react";
import { getNotes } from "../../../modules/scoleAPI/ScoleAPI";
import TextWithLinks from "../../../components/textWithLinks/TextWithLinks";
import {useStore} from "effector-react";
import {diaryStore} from "../../../modules/effector/DiaryStore";
import {StorageKey} from "../../../modules/StorageKey";
import "./Notes.scss"
import Loading from "../../../components/loading/Loading";

const Notes = () => {
    const {token} = useStore(diaryStore)
    const {login, type} = JSON.parse(localStorage.getItem(StorageKey.Login) || '{}')
    const [notes, setNotes] = useState<Array<any> | undefined>()

    const setNotesData = async () => {
        let notes = await getNotes(login, token, type) || []
        notes?.sort((a, b) => {
            return Number(a.date.split(" ")[0]) - Number(b.date.split(" ")[0])
        })
        setNotes(notes)
    }

    useEffect( () => {
        if (token) setNotesData();
    }, [])

    return (
        <>
            {!notes && <Loading />}
            {notes && <div className="notes-content">
                {notes.map((note, index) => (
                    <div key={index} className="notes-note">
                        <div className="notes-author">{note.author}</div>
                        <div className="notes-text">
                            <TextWithLinks str={note.text}/>
                        </div>
                    </div>
                ))}
            </div>}
        </>
    );
}

export default Notes;