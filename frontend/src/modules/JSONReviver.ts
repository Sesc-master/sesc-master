export default function reviver(APIObjectsProperties?: Array<Array<string>>) {
    return (key: string, value: any): any => {
        if (value === undefined || value === null) return;
        else if (typeof value == "object" && !(value instanceof Array)) {
            if (APIObjectsProperties) {
                let isObject = APIObjectsProperties.some(possibleObjectProperties => {
                    return possibleObjectProperties.every(property => value.hasOwnProperty(property))
                });
                if (isObject) return value;
                else return new Map(Object.entries(value));
            }
            return new Map(Object.entries(value));
        }
        else return value;
    }
}