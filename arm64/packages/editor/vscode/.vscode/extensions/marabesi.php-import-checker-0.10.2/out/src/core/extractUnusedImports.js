"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUnusedImports = void 0;
const nextVersionExtractUnusedImports_1 = require("./nextVersionExtractUnusedImports");
function extractUnusedImports(text, configuration) {
    return (0, nextVersionExtractUnusedImports_1.newExtractor)(text, configuration);
}
exports.extractUnusedImports = extractUnusedImports;
//# sourceMappingURL=extractUnusedImports.js.map