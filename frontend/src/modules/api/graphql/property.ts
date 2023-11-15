import GraphQLType from "./type";

export default class GraphQLProperty {
    constructor(
        public name: string,
        public type?: GraphQLType
    ) {}

    public serialize(): string {
        let result = this.name;
        if (this.type) result += ' ' + this.type.serialize();
        return result;
    }
}