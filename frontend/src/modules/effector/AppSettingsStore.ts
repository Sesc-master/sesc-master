import {createEvent, createStore} from "effector";
import {IModal} from "../Modal";
import {NavbarItem, defaultItems} from "../../components/navbar/NavbarItems";
import {Page} from "../../components/projectRoot/Page";
import {StorageKey} from "../StorageKey";

export const setModalView = createEvent<IModal>()
export const setNavbarItems = createEvent<NavbarItem[]>()
export const setInitialPage = createEvent<Page>()
export const setIsPWA = createEvent<boolean>()
export const setIsFullClassesListModal = createEvent<boolean>()


export type IAppSettingsStore = {
    modalView: IModal,
    navbarItems: NavbarItem[],
    initialPage: Page,
    isPWA: boolean
    isFullClassesListModal: boolean
}

export const appSettingsStore = createStore<IAppSettingsStore>({
    modalView: '',
    navbarItems: defaultItems,
    initialPage: Page.About,
    isPWA: false,
    isFullClassesListModal: Boolean(localStorage.getItem(StorageKey.IsFullClassesList))
})
    .on(setModalView, (state, modalView) => (
        {...state, modalView}
    ))
    .on(setNavbarItems, (state,navbarItems) => (
        {...state, navbarItems}
    ))
    .on(setInitialPage, (state, initialPage) => (
        {...state, initialPage}
    ))
    .on(setIsPWA, (state, isPWA) => (
        {...state, isPWA}
    ))
    .on(setIsFullClassesListModal, (state, isFullClassesListModal) => {
        localStorage.setItem(StorageKey.IsFullClassesList, isFullClassesListModal ? "true" : "");
        return {...state, isFullClassesListModal}
    })
