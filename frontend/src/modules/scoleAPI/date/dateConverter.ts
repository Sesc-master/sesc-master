export default function dateConvert (dateInput: string, full: boolean = false): string {
    if (dateInput.includes("-")) {
        let dateArray = dateInput.split("-");
        let year = dateArray[0];
        let monthNum = Number(dateArray[1]);
        let day = dateArray[2];
        let month = monthNum > 8 ? monthNum - 9 : monthNum + 3;
        return `${month}${day}`
    }
    else if (dateInput.includes(".")) {
        let dateArray = dateInput.split(".");
        let day = dateArray[0];
        let monthNum = Number(dateArray[1]);
        let month = monthNum > 8 ? monthNum - 9 : monthNum + 3;
        return `${month}${day}`
    }
    else {
        let monthNum = Number(dateInput.substr(1, 1));
        let day = dateInput.substr(2, 2);
        let month = String(monthNum < 4 ? monthNum + 9 : monthNum - 3);
        month = month.toString().padStart(2, "0");
        if (full) {
            let dateObject = new Date();
            let year = dateObject.getFullYear();
            let currentmonth = dateObject.getMonth() + 1;
            if (monthNum < 4 && currentmonth < 8) year--;
            return `${year}-${month}-${day}`
        }
        else return `${day}.${month}`
    }
}