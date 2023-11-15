import {StorageKey} from "../modules/StorageKey";
import {setIsDiaryLoading} from "../modules/effector/DiaryStore";
import {useLoadDiary} from "./useLoadDiary";
import {setNavbarItems} from "../modules/effector/AppSettingsStore";
import {setGrade, setIsTeacher, setTeacher} from "../modules/effector/TimetableStore";
import {useLoadTimetable} from "./useLoadTimetable";

export const useLoadUserData = () => {
	if (localStorage.getItem(StorageKey.Login) !== null){
		const {login, password, type} =
			JSON.parse(localStorage.getItem(StorageKey.Login) || "{}")
		setIsDiaryLoading(true)
		useLoadDiary(login, password, type);
	}

	if (localStorage.getItem(StorageKey.NavbarItems) !== null){
		const navbarItems : any = JSON.parse(localStorage.getItem(StorageKey.NavbarItems) || "{}")
		setNavbarItems(navbarItems)
	}

	if (localStorage.getItem(StorageKey.Timetable) !== null) {
		const {teacher, grade, isTeacher} = JSON.parse(localStorage.getItem(StorageKey.Timetable) || "{}");
		setTeacher(teacher);
		setGrade(grade);
		setIsTeacher(isTeacher);
		useLoadTimetable(grade, teacher, isTeacher);
	}
}