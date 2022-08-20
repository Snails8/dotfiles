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
const vscode = __importStar(require("vscode"));
const yaml = __importStar(require("js-yaml"));
const preserving_json_yaml_parser_1 = require("@xliic/preserving-json-yaml-parser");
const replace_1 = require("../../edits/replace");
exports.default = (cache, platformContext, store, dataDictionaryView, dataDictionaryDiagnostics) => ({
    browseDataDictionaries: () => __awaiter(void 0, void 0, void 0, function* () {
        const formats = yield store.getDataDictionaries();
        yield dataDictionaryView.show();
        dataDictionaryView.sendShowDictionaries(formats);
    }),
    editorDataDictionaryUpdateAllProperties: (editor, edit, format, node, nodePath) => __awaiter(void 0, void 0, void 0, function* () {
        const document = editor.document;
        const parsed = cache.getParsedDocument(editor.document);
        const formats = yield store.getDataDictionaryFormats();
        const found = formats.filter((f) => f.name === format).pop();
        if (parsed !== undefined && found !== undefined) {
            const updated = Object.assign({}, node);
            for (const name of schemaProps) {
                delete updated[name];
                if (found.format[name] !== undefined) {
                    updated[name] = found.format[name];
                }
            }
            let text = "";
            if (editor.document.languageId === "yaml") {
                text = yaml.dump(updated, { indent: 2 }).trimEnd();
            }
            else {
                text = JSON.stringify(updated, null, 1);
            }
            const edit = (0, replace_1.replaceObject)(editor.document, parsed, nodePath, text);
            const workspaceEdit = new vscode.WorkspaceEdit();
            workspaceEdit.set(document.uri, [edit]);
            yield vscode.workspace.applyEdit(workspaceEdit);
        }
    }),
    editorDataDictionaryUpdateProperty: (editor, edit, format, node, property, nodePath) => __awaiter(void 0, void 0, void 0, function* () {
        const document = editor.document;
        const parsed = cache.getParsedDocument(editor.document);
        const formats = yield store.getDataDictionaryFormats();
        const found = formats.filter((f) => f.name === format).pop();
        if (parsed !== undefined && found !== undefined) {
            const updated = Object.assign(Object.assign({}, node), { [property]: found.format[property] });
            let text = "";
            if (editor.document.languageId === "yaml") {
                text = yaml.dump(updated, { indent: 2 }).trimEnd();
            }
            else {
                text = JSON.stringify(updated, null, 1);
            }
            const edit = (0, replace_1.replaceObject)(editor.document, parsed, nodePath, text);
            const workspaceEdit = new vscode.WorkspaceEdit();
            workspaceEdit.set(document.uri, [edit]);
            yield vscode.workspace.applyEdit(workspaceEdit);
        }
    }),
    editorDataDictionaryBulkUpdateProperties: (editor, edit) => __awaiter(void 0, void 0, void 0, function* () {
        const document = editor.document;
        const parsed = cache.getParsedDocument(editor.document);
        if (parsed === undefined) {
            return;
        }
        const formats = new Map();
        for (const format of yield store.getDataDictionaryFormats()) {
            formats.set(format.name, format);
        }
        const addMissingProperties = new Map();
        const edits = [];
        const diagnostics = dataDictionaryDiagnostics.get(document.uri) || [];
        // find all nodes with missing properties
        for (const diagnostic of diagnostics) {
            const format = formats.get(diagnostic.format);
            const pointer = (0, preserving_json_yaml_parser_1.joinJsonPointer)(diagnostic.path);
            if ((diagnostic["id"] === "data-dictionary-format-property-mismatch" ||
                diagnostic["id"] === "data-dictionary-format-property-missing") &&
                format &&
                !addMissingProperties.has(pointer)) {
                addMissingProperties.set(pointer, format.format);
            }
        }
        // update every node with missing properties
        for (const [pointer, format] of addMissingProperties) {
            const node = (0, preserving_json_yaml_parser_1.find)(parsed, pointer);
            if (node) {
                const updated = Object.assign({}, node);
                for (const name of schemaProps) {
                    delete updated[name];
                    if (format[name] !== undefined) {
                        updated[name] = format[name];
                    }
                }
                let text = "";
                if (editor.document.languageId === "yaml") {
                    text = yaml.dump(updated, { indent: 2 }).trimEnd();
                }
                else {
                    text = JSON.stringify(updated, null, 1);
                }
                const edit = (0, replace_1.replaceObject)(editor.document, parsed, (0, preserving_json_yaml_parser_1.parseJsonPointer)(pointer), text);
                edits.push(edit);
            }
        }
        const workspaceEdit = new vscode.WorkspaceEdit();
        workspaceEdit.set(document.uri, edits);
        yield vscode.workspace.applyEdit(workspaceEdit);
    }),
});
const schemaProps = [
    "type",
    "format",
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
//# sourceMappingURL=commands.js.map