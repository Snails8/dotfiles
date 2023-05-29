"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const plugin = {
    test(value) {
        return value && graphql_1.isNamedType(value);
    },
    serialize(value) {
        return graphql_1.printType(value);
    },
};
exports.default = plugin;
//# sourceMappingURL=graphQLTypeSerializer.js.map