"use strict";
/*
 Copyright (c) 42Crunch Ltd. All rights reserved.
 Licensed under the GNU Affero General Public License version 3. See LICENSE.txt in the project root for license information.
*/
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const preserving_json_yaml_parser_1 = require("@xliic/preserving-json-yaml-parser");
const object_1 = require("@xliic/preserving-json-yaml-parser/lib/visit/object");
function activate(cache, platformContext, store, collection) {
    cache.onDidActiveDocumentChange((document) => __awaiter(this, void 0, void 0, function* () {
        if (document === undefined) {
            return;
        }
        const formats = yield store.getDataDictionaryFormats();
        const formatMap = new Map();
        for (const format of formats) {
            formatMap.set(format.name, format);
        }
        const parsed = cache.getParsedDocument(document);
        if (parsed !== undefined) {
            lint(collection, formatMap, document, parsed);
        }
    }));
}
exports.activate = activate;
function lint(collection, formats, document, parsed) {
    const diagnostics = [];
    const path = [];
    (0, object_1.visitObject)(undefined, "fakeroot", parsed, {
        onObjectStart: function (parent, key, value, location) {
            path.push(key);
        },
        onObjectEnd: function () {
            path.pop();
        },
        onArrayStart: function (parent, key, value, location) {
            path.push(key);
        },
        onArrayEnd: function () {
            path.pop();
        },
        onValue: function (parent, key, value, text, location) {
            if (key === "x-42c-format" && typeof value === "string" && (location === null || location === void 0 ? void 0 : location.key) !== undefined) {
                const keyRange = new vscode.Range(document.positionAt(location.key.start), document.positionAt(location.key.end));
                const valueRange = new vscode.Range(document.positionAt(location.value.start), document.positionAt(location.value.end));
                diagnostics.push(...checkFormat(document, parsed, formats, value, keyRange, valueRange, parent, path.slice(1) // remove fakeroot
                ));
            }
        },
    });
    collection.set(document.uri, diagnostics);
}
const schemaProps = [
    "type",
    "readOnly",
    "writeOnly",
    "nullable",
    "example",
    "pattern",
    "minLength",
    "maxLength",
    "enum",
    "default",
    "exclusiveMinimum",
    "exclusiveMaximum",
    "minimum",
    "maximum",
    "multipleOf",
];
function checkFormat(document, root, formats, format, keyRange, valueRange, container, path) {
    const diagnostics = [];
    if (!formats.has(format)) {
        diagnostics.push({
            message: `Data Dictionary format '${format}' is not defined`,
            range: valueRange,
            severity: vscode.DiagnosticSeverity.Error,
            source: "vscode-openapi",
        });
        return diagnostics;
    }
    const dataFormat = formats.get(format).format;
    for (const prop of schemaProps) {
        if (dataFormat.hasOwnProperty(prop)) {
            if (container.hasOwnProperty(prop)) {
                // properties differ
                if (container[prop] !== dataFormat[prop]) {
                    const location = (0, preserving_json_yaml_parser_1.getLocation)(container, prop);
                    if (location !== undefined) {
                        const valueRange = new vscode.Range(document.positionAt(location.value.start), document.positionAt(location.value.end));
                        const diagnostic = {
                            id: "data-dictionary-format-property-mismatch",
                            message: `Data Dictionary requires value of '${dataFormat[prop]}'`,
                            range: valueRange,
                            severity: vscode.DiagnosticSeverity.Error,
                            source: "vscode-openapi",
                            path,
                            node: container,
                            property: prop,
                            format,
                        };
                        diagnostics.push(diagnostic);
                    }
                }
            }
            else {
                // property is missing
                const location = (0, preserving_json_yaml_parser_1.findLocationForPath)(root, path);
                if (location !== undefined) {
                    const valueRange = new vscode.Range(document.positionAt(location.key.start), document.positionAt(location.key.end));
                    const diagnostic = {
                        id: "data-dictionary-format-property-missing",
                        message: `Missing "${prop}" property defined in Data Dictionary`,
                        range: valueRange,
                        severity: vscode.DiagnosticSeverity.Information,
                        source: "vscode-openapi",
                        path,
                        node: container,
                        property: prop,
                        format,
                    };
                    diagnostics.push(diagnostic);
                }
            }
        }
    }
    return diagnostics;
}
//# sourceMappingURL=linter.js.map