export default interface ICache<T> {
    getValue(): Promise<T>;

    updateValue(newValue: T): Promise<boolean>;
}