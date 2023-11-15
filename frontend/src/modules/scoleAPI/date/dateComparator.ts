export default function dateComparator(firstDate: string, secondDate: string) {
    const monthsOrder = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8]

    let firstMonth = Number(firstDate.substring(3, 5));
    let secondMonth = Number(secondDate.substring(3, 5));

    if (firstMonth === secondMonth) {
        return Number(firstDate.substring(0, 2)) - Number(secondDate.substring(0, 2));
    }
    return monthsOrder.indexOf(firstMonth) - monthsOrder.indexOf(secondMonth);
}