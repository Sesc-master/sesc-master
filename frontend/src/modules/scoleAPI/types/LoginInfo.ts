import {Role} from "./Role";

export type LoginInfo = {
    roles: Array<Role>;
    token: string
}