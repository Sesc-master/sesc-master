import {ClassConstructor, plainToClass} from "class-transformer";
import {graphQLTypes} from "./field";
import 'reflect-metadata';

export default async function query <T extends Object> (
    name: string,
    returns?: ClassConstructor<T>,
    args?: Object,
    endpoint: string = "/graphql"
): Promise<T | Array<T>> {
    let query = name;

    if (args ) query += '(' + Array.from(Object.entries(args)).map(([name, value]) => {
        if (typeof value == "string") return `${name}: \"${value}\"`;
        else return `${name}: ${value}`;
    }).join(',') + ')';

    if (returns && graphQLTypes.has(returns)) {
        query += '{' + graphQLTypes.get(returns)?.fields.map(field => field.serialize()).join('\n') + '}'
    }

    return fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({query: `{${query}}`})
    })
        .then(response => response.text())
        .then(response => JSON.parse(response).data[name])
        .then(data => {
            if (returns) return plainToClass(returns, data);
            else return data;
        });
}