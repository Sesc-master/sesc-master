import "reflect-metadata";
import GraphQLType from "./type";
import {ClassConstructor} from "class-transformer";
import GraphQLProperty from "./property";

export const graphQLTypes = new Map<ClassConstructor<any>, GraphQLType>();

const Field = (type?: ClassConstructor<any>) => (object: Object, propertyName: string) => {
    let graphQLType = graphQLTypes.get(object.constructor as ClassConstructor<any>);

    let property;
    if (type) property = new GraphQLProperty(propertyName, graphQLTypes.get(type));
    else property = new GraphQLProperty(propertyName);

    if (!property) return;

    if (graphQLType) graphQLType.fields.push(property);
    else graphQLTypes.set(object.constructor as ClassConstructor<any>, new GraphQLType([property]));
};

export default Field;
