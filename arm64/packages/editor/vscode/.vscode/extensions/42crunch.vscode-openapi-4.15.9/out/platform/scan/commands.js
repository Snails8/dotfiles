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
const preserving_json_yaml_parser_1 = require("@xliic/preserving-json-yaml-parser");
exports.default = (cache, platformContext, store, view) => {
    vscode.commands.registerTextEditorCommand("openapi.platform.editorRunSingleOperationScan", (editor, edit, uri, path, method) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        try {
            yield editorRunSingleOperationScan(editor, edit, cache, store, view, uri, path, method);
        }
        catch (ex) {
            if (((_a = ex === null || ex === void 0 ? void 0 : ex.response) === null || _a === void 0 ? void 0 : _a.statusCode) === 409 &&
                ((_c = (_b = ex === null || ex === void 0 ? void 0 : ex.response) === null || _b === void 0 ? void 0 : _b.body) === null || _c === void 0 ? void 0 : _c.code) === 109 &&
                ((_e = (_d = ex === null || ex === void 0 ? void 0 : ex.response) === null || _d === void 0 ? void 0 : _d.body) === null || _e === void 0 ? void 0 : _e.message) === "limit reached") {
                vscode.window.showErrorMessage("You have reached your maximum number of APIs. Please contact support@42crunch.com to upgrade your account.");
            }
            else {
                vscode.window.showErrorMessage("Failed to scan: " + ex.message);
            }
        }
    }));
};
function editorRunSingleOperationScan(editor, edit, cache, store, view, uri, path, method) {
    return __awaiter(this, void 0, void 0, function* () {
        const bundle = yield cache.getDocumentBundle(editor.document);
        if (bundle && !("errors" in bundle)) {
            //const oas = extractSingleOperation(method as HttpMethod, path as string, bundle.value);
            // extracting the entire path here, 'cause scan will generate requests
            // for all possible HTTP Verbs and test the responses against the OAS
            const oas = extractSinglePath(path, bundle.value);
            const rawOas = (0, preserving_json_yaml_parser_1.stringify)(oas);
            const api = yield store.createTempApi(rawOas);
            const audit = yield store.getAuditReport(api.desc.id);
            if ((audit === null || audit === void 0 ? void 0 : audit.openapiState) !== "valid") {
                yield store.deleteApi(api.desc.id);
                throw new Error("OpenAPI has failed Security Audit. Please run API Security Audit, fix the issues and try running the Scan again.");
            }
            yield store.createDefaultScanConfig(api.desc.id);
            const configs = yield store.getScanConfigs(api.desc.id);
            const c = yield store.readScanConfig(configs[0].scanConfigurationId);
            const config = JSON.parse(Buffer.from(c.scanConfiguration, "base64").toString("utf-8"));
            yield store.deleteApi(api.desc.id);
            if (config !== undefined) {
                yield view.show();
                view.sendScanOperation(editor.document, {
                    oas: oas,
                    rawOas: rawOas,
                    path: path,
                    method: method,
                    config,
                });
            }
        }
    });
}
function extractSingleOperation(method, path, oas) {
    var _a;
    const visited = new Set();
    crawl(oas, oas["paths"][path][method], visited);
    if (oas["paths"][path]["parameters"]) {
        crawl(oas, oas["paths"][path]["parameters"], visited);
    }
    const cloned = (0, preserving_json_yaml_parser_1.simpleClone)(oas);
    delete cloned["paths"];
    delete cloned["components"];
    // copy single path and path parameters
    cloned["paths"] = { [path]: { [method]: oas["paths"][path][method] } };
    if (oas["paths"][path]["parameters"]) {
        cloned["paths"][path]["parameters"] = oas["paths"][path]["parameters"];
    }
    // copy security schemes
    if ((_a = oas === null || oas === void 0 ? void 0 : oas["components"]) === null || _a === void 0 ? void 0 : _a["securitySchemes"]) {
        cloned["components"] = { securitySchemes: oas["components"]["securitySchemes"] };
    }
    copyByPointer(oas, cloned, Array.from(visited));
    return cloned;
}
function extractSinglePath(path, oas) {
    var _a;
    const visited = new Set();
    crawl(oas, oas["paths"][path], visited);
    if (oas["paths"][path]["parameters"]) {
        crawl(oas, oas["paths"][path]["parameters"], visited);
    }
    const cloned = (0, preserving_json_yaml_parser_1.simpleClone)(oas);
    delete cloned["paths"];
    delete cloned["components"];
    // copy single path and path parameters
    cloned["paths"] = { [path]: oas["paths"][path] };
    // copy security schemes
    if ((_a = oas === null || oas === void 0 ? void 0 : oas["components"]) === null || _a === void 0 ? void 0 : _a["securitySchemes"]) {
        cloned["components"] = { securitySchemes: oas["components"]["securitySchemes"] };
    }
    copyByPointer(oas, cloned, Array.from(visited));
    return cloned;
}
function crawl(root, current, visited) {
    if (typeof current !== "object") {
        return;
    }
    for (const [key, value] of Object.entries(current)) {
        if (key === "$ref") {
            const path = value.substring(1, value.length);
            if (!visited.has(path)) {
                visited.add(path);
                const ref = resolveRef(root, path);
                crawl(root, ref, visited);
            }
        }
        else {
            crawl(root, value, visited);
        }
    }
}
function resolveRef(root, pointer) {
    const path = (0, preserving_json_yaml_parser_1.parseJsonPointer)(pointer);
    let current = root;
    for (let i = 0; i < path.length; i++) {
        current = current[path[i]];
    }
    return current;
}
function copyByPointer(src, dest, pointers) {
    const sortedPointers = [...pointers];
    sortedPointers.sort();
    for (const pointer of sortedPointers) {
        const path = (0, preserving_json_yaml_parser_1.parseJsonPointer)(pointer);
        copyByPath(src, dest, path);
    }
}
function copyByPath(src, dest, path) {
    let currentSrc = src;
    let currentDest = dest;
    for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        currentSrc = currentSrc[key];
        if (currentDest[key] === undefined) {
            if (Array.isArray(currentSrc[key])) {
                currentDest[key] = [];
            }
            else {
                currentDest[key] = {};
            }
        }
        currentDest = currentDest[key];
    }
    const key = path[path.length - 1];
    // check if the last segment of the path that is being copied is already set
    // which might be the case if we've copied the parent of the path already
    if (currentDest[key] === undefined) {
        currentDest[key] = currentSrc[key];
    }
}
//# sourceMappingURL=commands.js.map