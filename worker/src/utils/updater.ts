import {Job, RecurrenceRule, RecurrenceSpecDateRange, RecurrenceSpecObjLit, scheduleJob} from "node-schedule"
import ICache from "./ICache";

export default class Updater<T, U> {
    public readonly jobName: string;
    public readonly updateJob: Job;
    public onChange?: (newValue: T, oldValue: T) => Promise<void>;
    private upperUpdater!: Updater<U, any>;
    private lowerUpdaters: Array<Updater<any, T>> = [];

    constructor(
        public updateFunction: (parameter: U) => Promise<T>,
        public readonly cache: ICache<T>,
        public readonly name: string,
        public readonly jobRule: string | number | RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit | Date,
        requiredUpdater?: Updater<U, any>
    ) {
        this.jobName = `${name}_updater_job`;
        this.updateJob = scheduleJob(this.jobName, this.jobRule, () => this.update());
        if (requiredUpdater) this.setRequiredUpdater(requiredUpdater);
    }

    public setRequiredUpdater(requiredUpdater: Updater<U, any>) {
        this.upperUpdater = requiredUpdater;
        requiredUpdater.lowerUpdaters.push(this);
        return this;
    }

    public async update(): Promise<void> {
        const upperValue = await this.upperUpdater?.cache.getValue();
        const lastValue = await this.cache.getValue();
        const newValue = await this.updateFunction(upperValue);

        if (await this.cache.updateValue(newValue)) {
            if (this.onChange) await this.onChange(newValue, lastValue);
            return Promise.all(this.lowerUpdaters.map(lowerUpdater => lowerUpdater.update())).then(() => void 0);
        }
        else return new Promise<void>(resolve => resolve());
    }
}