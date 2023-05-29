"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const plugin = {
    test(value) {
        return value && typeof value.kind === "string";
    },
    serialize(value, _config, indentation) {
        return (indentation +
            graphql_1.print(value)
                .trim()
                .replace(/\n/g, "\n" + indentation));
    },
};
exports.default = plugin;
//# sourceMappingURL=astSerializer.js.map