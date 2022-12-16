"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletionItemProvider = void 0;
const vscode = __importStar(require("vscode"));
const preserving_json_yaml_parser_1 = require("@xliic/preserving-json-yaml-parser");
const types_1 = require("./types");
const path_1 = __importDefault(require("path"));
const targetMapping = {
    [types_1.OpenApiVersion.Unknown]: undefined,
    [types_1.OpenApiVersion.V2]: {
        schema: "/definitions",
        items: "/definitions",
        parameters: "/parameters",
        responses: "/responses",
        properties: "/definitions",
    },
    [types_1.OpenApiVersion.V3]: {
        schema: "/components/schemas",
        responses: "/components/responses",
        parameters: "/components/parameters",
        examples: "/components/examples",
        requestBody: "/components/requestBodies",
        callbacks: "/components/callbacks",
        headers: "/components/headers",
        links: "/components/links",
        items: "/components/schemas",
        properties: "/components/schemas",
    },
};
class CompletionItemProvider {
    constructor(context, cache) {
        this.context = context;
        this.cache = cache;
        this.version = types_1.OpenApiVersion.Unknown;
        cache.onDidActiveDocumentChange((document) => __awaiter(this, void 0, void 0, function* () {
            if (document && cache.getDocumentVersion(document) !== types_1.OpenApiVersion.Unknown) {
                this.parsed = cache.getLastGoodParsedDocument(document);
                this.version = cache.getDocumentVersion(document);
            }
        }));
    }
    provideCompletionItems(document, position, token, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const line = document.lineAt(position).text;
            if (!this.parsed || !line.includes("$ref")) {
                return undefined;
            }
            const nodePath = findPathAtOffset(this.parsed, document.offsetAt(position), document.languageId);
            const targetPointer = findTargetPointer(this.version, nodePath);
            const refContext = yield getRefContext(this.parsed, line, document.uri, this.cache);
            if (targetPointer && refContext) {
                const targetNode = targetPointer && (0, preserving_json_yaml_parser_1.find)(refContext.parsed, targetPointer);
                if (targetNode) {
                    // YAML and JSON editors are slightly different in terms of completions
                    // depending on the editor completion might be not shown if
                    // completion items dont start with present/absent quotes, etc
                    if (document.languageId === "yaml") {
                        const openingQuote = refContext.pointer === "" ? refContext.openingQuote : "";
                        return Object.keys(targetNode).map((key) => {
                            return new vscode.CompletionItem(`${openingQuote}#${targetPointer}/${key}${refContext.closingQuote}`, vscode.CompletionItemKind.Reference);
                        });
                    }
                    else {
                        return Object.keys(targetNode).map((key) => {
                            return new vscode.CompletionItem(`"${refContext.filename}#${targetPointer}/${key}"`, vscode.CompletionItemKind.Reference);
                        });
                    }
                }
            }
        });
    }
}
exports.CompletionItemProvider = CompletionItemProvider;
function getRefContext(parsed, line, baseUri, cache) {
    return __awaiter(this, void 0, void 0, function* () {
        const refRe = /^\S+\s+(['"]?)([^"^'^\s]*)(['"]?)$/;
        const match = line.trim().match(refRe);
        if (match) {
            const [_, openingQuote, content, closingQuote] = match;
            // TODO unquoted
            if (content === "") {
                return { parsed, openingQuote, closingQuote: "", filename: "", pointer: "" };
            }
            if (content.startsWith("#")) {
                return { parsed, openingQuote, closingQuote: "", filename: "", pointer: content };
            }
            const filename = content.substring(0, content.indexOf("#"));
            const pointer = content.substring(content.indexOf("#"), content.length);
            const normalized = path_1.default.normalize(path_1.default.join(path_1.default.dirname(baseUri.fsPath), filename));
            const uri = baseUri.with({ path: normalized });
            try {
                // stat uri, if it does not exists an exception is thrown
                yield vscode.workspace.fs.stat(uri);
                const document = yield vscode.workspace.openTextDocument(uri);
                const parsed = cache.getLastGoodParsedDocument(document);
                if (parsed) {
                    return { parsed, openingQuote, closingQuote: "", filename, pointer };
                }
            }
            catch (ex) {
                return undefined;
            }
        }
        else {
            return { parsed, openingQuote: '"', closingQuote: '"', filename: "", pointer: "" };
        }
    });
}
function findPathAtOffset(parsed, offset, languageId) {
    const { end } = (0, preserving_json_yaml_parser_1.getRootRange)(parsed);
    // if offset is beyond the range of the root node
    // which could happen in case of incomplete yaml node with
    // bunch of spaces at the end;
    // look for the node at the end of the root node range
    let [node, nodePath] = (0, preserving_json_yaml_parser_1.findNodeAtOffset)(parsed, offset > end ? end : offset);
    if (languageId === "yaml") {
        // workaround implicit null issue for the YAML like this ```$ref:```
        const [betterNode, betterNodePath] = (0, preserving_json_yaml_parser_1.findNodeAtOffset)(parsed, offset > end ? end - 1 : offset - 1);
        if (betterNode && betterNode.hasOwnProperty("$ref") && betterNode["$ref"] === null) {
            return betterNodePath;
        }
    }
    return nodePath;
}
function findTargetPointer(version, nodePath) {
    const mapping = targetMapping[version];
    if (mapping) {
        return mapping[nodePath[nodePath.length - 1]] || mapping[nodePath[nodePath.length - 2]];
    }
}
//# sourceMappingURL=completion.js.map