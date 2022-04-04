"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Namespace = void 0;
const lodash_1 = require("lodash");
function walker(nodes) {
    const namespaces = [];
    function walk(nodes) {
        if (nodes && nodes.kind === 'usegroup') {
            namespaces.push(nodes);
        }
        if (nodes.children) {
            nodes.children.forEach((node) => walk(node));
        }
        if (nodes.length) {
            nodes.forEach((node) => walk(node));
        }
    }
    walk(nodes);
    return namespaces;
}
class Namespace {
    constructor(ast) {
        this.ast = ast;
        this.useTree = walker(this.ast);
    }
    normalizeUseStatements() {
        const extractUseItems = (0, lodash_1.flatMap)(this.useTree.map((usegroup) => usegroup.items));
        return extractUseItems
            .map((use) => {
            if (use.alias) {
                use.name = `${use.name}\\${use.alias.name}`;
                use.loc = use.alias.loc;
                return use;
            }
            return use;
        });
    }
}
exports.Namespace = Namespace;
//# sourceMappingURL=Namespace.js.map