export type Document = {
    class: string;
    pupil: string;
    type: "med" | "mp" | "par" | "out" | "adm" | "tut" | "etc";
    dateStart: string;
    dateEnd: string;
    prim: string;
    id: string;
}