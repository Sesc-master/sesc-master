import {lessonTimes} from "./lessonTimes";

type IEventData = {
    order: number,
    start: number,
    end: number,
};

export type IEvent = {
    type: string,
    timeToEnd: number | undefined,
    percent: number | undefined,
    order: number
}

export class Event {
    private getNow = () => {
        const date = new Date();
        return date.getSeconds() + date.getMinutes() * 60
            + date.getHours() * 60 * 60;
    }

    private getCurrentLesson = () : IEventData | undefined => {
        const now = this.getNow();

        for (let i = 0; i <= lessonTimes.length - 1; i++) {
            const times = lessonTimes[i];
            const start = Number(times[0].split(":")[0]) * 60 * 60 +
                Number(times[0].split(":")[1]) * 60;
            const end = Number(times[1].split(":")[0]) * 60 * 60+
                Number(times[1].split(":")[1]) * 60;

            if (now >= start && now <= end){
                return {
                    order: i,
                    end,
                    start
                }
            }
        }
    };

    private getCurrentBreak = () : IEventData | undefined => {
        const now = this.getNow();

        for (let i = 0; i < lessonTimes.length - 1; i++){
            const start = Number(lessonTimes[i][1].split(":")[0]) * 60 * 60 +
                Number(lessonTimes[i][1].split(":")[1]) * 60;
            const end = Number(lessonTimes[i + 1][0].split(":")[0]) * 60 * 60 +
                Number(lessonTimes[i + 1][0].split(":")[1]) * 60;

            if (now >= start && now <= end){
                return {
                    order: i,
                    end,
                    start
                }
            }
        }
    };

    private getTimeToEnd(event: IEventData | undefined) : number | undefined{
        if (!event) {
            return undefined;
        }
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const seconds = new Date().getSeconds();

        return event.end - (hours * 60 * 60 + minutes * 60 + seconds);
    }

    private getEventLength = (event: IEventData | undefined) => {
        if (!event) {
            return undefined;
        }
        return event?.end - event?.start;
    }

    private getPercentOfEvent = (event: IEventData | undefined) => {
        const eventLength = this.getEventLength(event);
        const timeToEnd = this.getTimeToEnd(event);
        if (!eventLength || !timeToEnd) {
            return undefined;
        }
        return (eventLength - timeToEnd) /  eventLength * 100;
    }

    public getCurrentEvent = () : IEvent | undefined => {
        const $lesson = this.getCurrentLesson();
        const $break = this.getCurrentBreak();
        if ($lesson) {
            return {
                type: "урок",
                timeToEnd: this.getTimeToEnd($lesson),
                percent: this.getPercentOfEvent($lesson),
                order: $lesson.order
            };
        } else if ($break) {
            return {
                type: "перемена",
                timeToEnd: this.getTimeToEnd($break),
                percent: this.getPercentOfEvent($break),
                order: $break.order
            };
        } else {
            return undefined;
        }
    };
}
