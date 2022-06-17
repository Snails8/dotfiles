"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
const php_parser_1 = require("php-parser");
const Namespace_1 = require("./Namespace");
const parser = new php_parser_1.Engine({
    parser: {
        extractDoc: false,
    },
    ast: {
        withPositions: true
    },
    lexer: {
        comment_tokens: false
    }
});
class Builder {
    constructor(sourceCode) {
        this.sourceCode = sourceCode;
        this.parsedContent = parser.parseCode(this.sourceCode, '');
    }
    build() {
        return {
            namespaces: new Namespace_1.Namespace(this.parsedContent.children),
        };
    }
}
exports.Builder = Builder;
//# sourceMappingURL=Builder.js.map