export type GoldinDocument = {
    Uclass: string;
    pupil: string;
    vid: "med" | "mp" | "par" | "out" | "adm" | "tut" | "etc",
    start: string;
    fin: string;
    prim: string;
    _id: string
}