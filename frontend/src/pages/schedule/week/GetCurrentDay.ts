export const getCurrentDay = () => {
    let targetDay = new Date().getDay();
    const hours = new Date().getHours()
    if (hours > 15) {
        if (targetDay === 6 || targetDay === 0)
            targetDay = 1
        else targetDay++
    }
    return targetDay
}