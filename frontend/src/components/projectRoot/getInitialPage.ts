import {StorageKey} from "../../modules/StorageKey";
import {Page} from "./Page";

export const getInitialPage = () => {
    if (localStorage.getItem(StorageKey.InitialPage) !== null){
        return  localStorage.getItem(StorageKey.InitialPage) || "{}"
    }else {
        return Page.About
    }
}