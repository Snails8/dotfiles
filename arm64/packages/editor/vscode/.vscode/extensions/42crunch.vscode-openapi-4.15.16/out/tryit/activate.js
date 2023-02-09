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
const view_1 = require("./view");
const lens_1 = require("./lens");
const selectors = {
    json: { language: "json" },
    jsonc: { language: "jsonc" },
    yaml: { language: "yaml" },
};
function activate(context, cache, configuration, memento, secret, prefs) {
    let tryIt = null;
    let previewUpdateDelay;
    configuration.track("previewUpdateDelay", (delay) => {
        previewUpdateDelay = delay;
    });
    const wrap = (fn) => {
        return (...args) => fn(...args);
    };
    function debounce(fn) {
        return (...args) => {
            let timer;
            return new Promise((resolve) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    resolve(fn(...args));
                }, previewUpdateDelay);
            });
        };
    }
    const debouncedTryIt = debounce(showTryIt);
    const view = new view_1.TryItWebView(context.extensionPath, cache, memento, secret, prefs);
    cache.onDidChange((document) => __awaiter(this, void 0, void 0, function* () {
        const uri = document.uri.toString();
        if (tryIt !== null && tryIt.documentUri.toString() === uri) {
            const bundle = yield cache.getDocumentBundle(document);
            if (bundle && !("errors" in bundle)) {
                const versions = getBundleVersions(bundle);
                if (isBundleVersionsDifferent(versions, tryIt.versions)) {
                    tryIt.versions = versions;
                    debouncedTryIt(view, document, bundle, tryIt.path, tryIt.method);
                }
            }
        }
    }));
    vscode.commands.registerCommand("openapi.tryOperation", (uri, path, method) => __awaiter(this, void 0, void 0, function* () {
        tryIt = { documentUri: uri, path, method, versions: {} };
        startTryIt(view, cache, tryIt);
    }));
    vscode.commands.registerCommand("openapi.tryOperationWithExample", (uri, path, method, preferredMediaType, preferredBodyValue) => __awaiter(this, void 0, void 0, function* () {
        tryIt = {
            documentUri: uri,
            path,
            method,
            versions: {},
            preferredMediaType,
            preferredBodyValue,
        };
        startTryIt(view, cache, tryIt);
    }));
    const tryItCodeLensProvider = new lens_1.TryItCodelensProvider(cache);
    for (const selector of Object.values(selectors)) {
        vscode.languages.registerCodeLensProvider(selector, tryItCodeLensProvider);
    }
}
exports.activate = activate;
function startTryIt(view, cache, tryIt) {
    return __awaiter(this, void 0, void 0, function* () {
        const document = yield vscode.workspace.openTextDocument(tryIt.documentUri);
        const bundle = yield cache.getDocumentBundle(document);
        if (!bundle || "errors" in bundle) {
            vscode.commands.executeCommand("workbench.action.problems.focus");
            vscode.window.showErrorMessage("Failed to try it, check OpenAPI file for errors.");
        }
        else {
            tryIt.versions = getBundleVersions(bundle);
            yield view.show();
            showTryIt(view, document, bundle, tryIt.path, tryIt.method, tryIt.preferredMediaType, tryIt.preferredBodyValue);
        }
    });
}
function showTryIt(view, document, bundle, path, method, preferredMediaType, preferredBodyValue) {
    return __awaiter(this, void 0, void 0, function* () {
        if (view.isActive()) {
            const oas = extractSingleOperation(method, path, bundle.value);
            yield view.show();
            const insecureSslHostnames = vscode.workspace.getConfiguration("openapi").get("tryit.insecureSslHostnames") ||
                [];
            view.sendTryOperation(document, {
                oas,
                path,
                method,
                preferredMediaType,
                preferredBodyValue,
                config: {
                    insecureSslHostnames,
                },
            });
        }
    });
}
function isBundleVersionsDifferent(versions, otherVersions) {
    for (const [uri, version] of Object.entries(versions)) {
        if (otherVersions[uri] !== version) {
            return true;
        }
    }
    if (Object.keys(otherVersions).length !== Object.keys(versions).length) {
        return true;
    }
    return false;
}
function getBundleVersions(bundle) {
    const versions = {
        [bundle.document.uri.toString()]: bundle.document.version,
    };
    bundle.documents.forEach((document) => {
        versions[document.uri.toString()] = document.version;
    });
    return versions;
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
//# sourceMappingURL=activate.js.map