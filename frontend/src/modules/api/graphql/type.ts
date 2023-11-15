import GraphQLProperty from "./property";

export default class GraphQLType {
    constructor(
        public fields: Array<GraphQLProperty> = [],
    ) {

    }

    public serialize(): string {
        return " { " + this.fields.map(field => field.serialize()).join("\n") + " }";
    }
}