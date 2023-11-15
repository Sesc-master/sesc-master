import {getDiary} from "../modules/scoleAPI/GetDiary";
import {
    setDiary,
    setIsDiaryLoading,
    setIsError,
    setIsLogin,
    setSubjects,
    setToken,
    setTargetSubject
} from "../modules/effector/DiaryStore";
import {StorageKey} from "../modules/StorageKey";
import {Role} from "../modules/scoleAPI/types/Role";

export const useLoadDiary = (login: string, password: string, type: Role) => {
    getDiary(login, password, type)
        .then((response : any) => {
            if (response && response.journal){
                setSubjects([...response.journal.keys()]);
                setTargetSubject([...response.journal.keys()][0])
                setDiary(response.journal);
                setIsLogin(true);
                localStorage.setItem(StorageKey.Login, JSON.stringify({
                    login: login,
                    password: password,
                    type: type
                }));
                setToken(response.token);
            } else if (localStorage.getItem(StorageKey.Login) === null) {
                setIsError(true);
            }
            setIsDiaryLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setIsError(true);
            setIsDiaryLoading(false);
        })
}