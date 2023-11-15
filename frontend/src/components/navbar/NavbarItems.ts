import {Page} from '../projectRoot/Page'
import {IconName} from "../icon/IconName";

export type NavbarItem = {
    link: Page,
    iconName: IconName,
    value: string,
    isActive: boolean
}

export const defaultItems: NavbarItem[] = [
    {
        link: Page.Timetable,
        iconName: IconName.Timetable,
        value: 'Расписание',
        isActive: true
    },
    {
        link: Page.Diary,
        iconName: IconName.Diary,
        value: 'Дневник',
        isActive: true
    },
    {
        link: Page.EmptyAuditories,
        iconName: IconName.EmptyRoom,
        value: 'Свободные кабинеты',
        isActive: true
    },
    {
        link: Page.About,
        iconName: IconName.About,
        value: 'Главная',
        isActive: true
    },
]