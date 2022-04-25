/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtensionConstants = void 0;
var ExtensionConstants;
(function (ExtensionConstants) {
    ExtensionConstants["extensionId"] = "shufo.vscode-blade-formatter";
    ExtensionConstants["firstActivationStorageKey"] = "firstActivation";
    ExtensionConstants["globalVersionKey"] = "vscode-blade-formatter-version";
    ExtensionConstants["displayName"] = "Laravel Blade Formatter";
})(ExtensionConstants = exports.ExtensionConstants || (exports.ExtensionConstants = {}));


/***/ }),

/***/ "./src/extension.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode_1 = __importDefault(__webpack_require__("vscode"));
const path_1 = __importDefault(__webpack_require__("path"));
const find_config_1 = __importDefault(__webpack_require__("find-config"));
const fs_1 = __importDefault(__webpack_require__("fs"));
const ignore_1 = __importDefault(__webpack_require__("ignore"));
const blade_formatter_1 = __webpack_require__("blade-formatter");
const extensionContext_1 = __webpack_require__("./src/extensionContext.ts");
const telemetry_1 = __webpack_require__("./src/telemetry.ts");
const runtimeConfig_1 = __webpack_require__("./src/runtimeConfig.ts");
const constants_1 = __webpack_require__("./src/constants.ts");
const { Range, Position } = vscode_1.default;
const vsctmModule = getCoreNodeModule("vscode-textmate");
const onigurumaModule = getCoreNodeModule("vscode-oniguruma");
const KNOWN_ISSUES = "Open known Issues";
const REPORT_ISSUE = "Report Issue";
const knownIssuesUrl = "https://github.com/shufo/vscode-blade-formatter/issues";
const newIssueUrl = "https://github.com/shufo/vscode-blade-formatter/issues/new";
const WASM_ERROR_MESSAGE = "Must invoke loadWASM first.";
let wasmInitialized = false;
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    showWelcomeMessage(context);
    (0, extensionContext_1.setExtensionContext)(context);
    telemetry_1.telemetry.send(telemetry_1.TelemetryEventNames.Startup);
    if (context.globalState.get(constants_1.ExtensionConstants.firstActivationStorageKey) === undefined) {
        telemetry_1.telemetry.send(telemetry_1.TelemetryEventNames.NewInstall);
        context.globalState.update(constants_1.ExtensionConstants.firstActivationStorageKey, false);
    }
    context.subscriptions.push(vscode_1.default.languages.registerDocumentFormattingEditProvider("blade", {
        provideDocumentFormattingEdits(document) {
            if (shouldIgnore(document.uri.fsPath)) {
                return document;
            }
            const extConfig = vscode_1.default.workspace.getConfiguration("bladeFormatter.format");
            if (!wasmInitialized) {
                // onigurumaModule.initCalled = false;
                wasmInitialized = true;
            }
            const originalText = document.getText();
            const lastLine = document.lineAt(document.lineCount - 1);
            const range = new Range(new Position(0, 0), lastLine.range.end);
            if (!extConfig.enabled) {
                return [new vscode_1.default.TextEdit(range, originalText)];
            }
            const runtimeConfig = (0, runtimeConfig_1.readRuntimeConfig)(document.uri.fsPath);
            const options = Object.assign({ vsctm: vsctmModule, oniguruma: onigurumaModule, indentSize: extConfig.indentSize, wrapLineLength: extConfig.wrapLineLength, wrapAttributes: extConfig.wrapAttributes, useTabs: extConfig.useTabs, sortTailwindcssClasses: extConfig.sortTailwindcssClasses }, runtimeConfig);
            return new Promise((resolve, reject) => {
                return new blade_formatter_1.Formatter(options)
                    .formatContent(originalText)
                    .then((text) => {
                    resolve([new vscode_1.default.TextEdit(range, text)]);
                })
                    .then(undefined, (err) => {
                    var _a;
                    if (err.message === WASM_ERROR_MESSAGE) {
                        return reject(err);
                    }
                    (_a = vscode_1.default.window) === null || _a === void 0 ? void 0 : _a.showErrorMessage(err.message, KNOWN_ISSUES, REPORT_ISSUE).then((selected) => {
                        if (selected === KNOWN_ISSUES) {
                            vscode_1.default.env.openExternal(vscode_1.default.Uri.parse(knownIssuesUrl));
                        }
                        if (selected === REPORT_ISSUE) {
                            vscode_1.default.env.openExternal(vscode_1.default.Uri.parse(newIssueUrl));
                        }
                    });
                    reject(err);
                });
            });
        },
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
/**
 * Returns a node module installed with VSCode, or null if it fails.
 */
function getCoreNodeModule(moduleName) {
    try {
        // @ts-ignore
        return require(`${vscode_1.default.env.appRoot}/node_modules.asar/${moduleName}`);
    }
    catch (err) {
    }
    try {
        // @ts-ignore
        return require(`${vscode_1.default.env.appRoot}/node_modules/${moduleName}`);
    }
    catch (err) {
    }
    return null;
}
function shouldIgnore(filepath) {
    var _a, _b;
    const ignoreFilename = ".bladeignore";
    try {
        const ignoreFilePath = (0, find_config_1.default)(ignoreFilename, {
            cwd: path_1.default.dirname(filepath),
        });
        const ignoreFileContent = fs_1.default.readFileSync(ignoreFilePath).toString();
        const ig = (0, ignore_1.default)().add(ignoreFileContent);
        return (_b = (_a = vscode_1.default.workspace) === null || _a === void 0 ? void 0 : _a.workspaceFolders) === null || _b === void 0 ? void 0 : _b.find((folder) => {
            return ig.ignores(path_1.default.relative(folder.uri.fsPath, filepath));
        });
    }
    catch (err) {
        return false;
    }
}
function showWelcomeMessage(context) {
    var _a, _b;
    let message = null;
    const previousVersion = context.globalState.get(constants_1.ExtensionConstants.globalVersionKey);
    const currentVersion = (_b = (_a = vscode_1.default.extensions.getExtension(constants_1.ExtensionConstants.extensionId)) === null || _a === void 0 ? void 0 : _a.packageJSON) === null || _b === void 0 ? void 0 : _b.version;
    const previousVersionArray = previousVersion ? previousVersion.split('.').map((s) => Number(s)) : [0, 0, 0];
    const currentVersionArray = currentVersion.split('.').map((s) => Number(s));
    if (previousVersion === undefined || previousVersion.length === 0) {
        message = `Thanks for using ${constants_1.ExtensionConstants.displayName}.`;
    }
    else if (currentVersion !== previousVersion && (
    // patch update
    (previousVersionArray[0] === currentVersionArray[0] && previousVersionArray[1] === currentVersionArray[1] && previousVersionArray[2] < currentVersionArray[2]) ||
        // minor update
        (previousVersionArray[0] === currentVersionArray[0] && previousVersionArray[1] < currentVersionArray[1]) ||
        // major update
        (previousVersionArray[0] < currentVersionArray[0]))) {
        message = `${constants_1.ExtensionConstants.displayName} updated to ${currentVersion}.`;
    }
    if (message) {
        vscode_1.default.window.showInformationMessage(message, '⭐️ Star on Github', '🐞 Report Bug')
            .then(function (val) {
            if (val === '🐞 Report Bug') {
                vscode_1.default.env.openExternal(vscode_1.default.Uri.parse('https://github.com/shufo/vscode-blade-formatter/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc'));
            }
            else if (val === '⭐️ Star on Github') {
                vscode_1.default.env.openExternal(vscode_1.default.Uri.parse('https://github.com/shufo/vscode-blade-formatter'));
            }
        });
        context.globalState.update(constants_1.ExtensionConstants.globalVersionKey, currentVersion);
    }
}


/***/ }),

/***/ "./src/extensionContext.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.asAbsolutePath = exports.getExtensionContext = exports.setExtensionContext = void 0;
const vscode_1 = __webpack_require__("vscode");
let extensionContext;
/**
 * Save a referece for this extension's context
 */
function setExtensionContext(context) {
    extensionContext = context;
}
exports.setExtensionContext = setExtensionContext;
/**
 * Return a reference for this extension's context
 */
function getExtensionContext() {
    return extensionContext;
}
exports.getExtensionContext = getExtensionContext;
/**
 * Transform relative path inside the extension folder
 * to absolute path.
 * @param relativePath relative path to the file
 * @returns Uri of the file
 */
function asAbsolutePath(relativePath) {
    return vscode_1.Uri.file(extensionContext.asAbsolutePath(relativePath));
}
exports.asAbsolutePath = asAbsolutePath;


/***/ }),

/***/ "./src/runtimeConfig.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.readRuntimeConfig = void 0;
const find_config_1 = __importDefault(__webpack_require__("find-config"));
const path_1 = __importDefault(__webpack_require__("path"));
const fs_1 = __importDefault(__webpack_require__("fs"));
const jtd_1 = __importDefault(__webpack_require__("ajv/dist/jtd"));
const ajv = new jtd_1.default();
const configFileNames = [".bladeformatterrc.json", ".bladeformatterrc"];
function readRuntimeConfig(filePath) {
    const configFilePath = findConfigFile(filePath);
    if (configFilePath === null) {
        return undefined;
    }
    const configFileContent = fs_1.default.readFileSync(configFilePath).toString();
    const schema = {
        optionalProperties: {
            indentSize: { type: "int32" },
            wrapLineLength: { type: "int32" },
            wrapAttributes: {
                enum: [
                    'auto',
                    'force',
                    'force-aligned ',
                    'force-expand-multiline',
                    'aligned-multiple',
                    'preserve',
                    'preserve-aligned'
                ]
            },
            endWithNewline: { type: 'boolean' },
            useTabs: { type: 'boolean' },
            sortTailwindcssClasses: { type: 'boolean' },
        },
        additionalProperties: true,
    };
    const parse = ajv.compileParser(schema);
    return parse(configFileContent);
}
exports.readRuntimeConfig = readRuntimeConfig;
function findConfigFile(filePath) {
    for (let i = 0; i < configFileNames.length; i++) {
        const result = (0, find_config_1.default)(configFileNames[i], {
            cwd: path_1.default.dirname(filePath),
            home: false,
        });
        if (result) {
            return result;
        }
    }
    return null;
}


/***/ }),

/***/ "./src/telemetry.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.telemetry = exports.TelemetryEventNames = void 0;
const vscode_1 = __importDefault(__webpack_require__("vscode"));
const vscode_extension_telemetry_1 = __importDefault(__webpack_require__("vscode-extension-telemetry"));
const extensionContext_1 = __webpack_require__("./src/extensionContext.ts");
var TelemetryEventNames;
(function (TelemetryEventNames) {
    /**
     * Extension startup event.
     */
    TelemetryEventNames["Startup"] = "STARTUP";
    /**
     * First ever extension activation.
     */
    TelemetryEventNames["NewInstall"] = "NEW_INSTALL";
})(TelemetryEventNames = exports.TelemetryEventNames || (exports.TelemetryEventNames = {}));
const extensionId = "shufo.vscode-blade-formatter";
class Telemetry {
    constructor(extensionVersion) {
        // set your APP_INSIGHT_INSTRUMENT_KEY to `.env` file
        const key = "7374e5e8-42df-4610-a3d9-99e0338f9037";
        this.reporter = new vscode_extension_telemetry_1.default(extensionId, extensionVersion, key);
    }
    /**
     * Check if it's allowed to send the telemetry.
     */
    canSend() {
        // Don't send telemetry when developing or testing the extension
        if ((0, extensionContext_1.getExtensionContext)().extensionMode !== vscode_1.default.ExtensionMode.Production) {
            return false;
        }
        // Don't send telemetry when user disabled it in Settings
        if (!vscode_1.default.env.isTelemetryEnabled) {
            return false;
        }
        return true;
    }
    /**
     * Send custom events.
     *
     * @param eventName sent message title
     * @param payload custom properties to add to the message
     */
    send(eventName, payload) {
        if (!this.canSend()) {
            return;
        }
        // @ts-ignore
        this.reporter.sendTelemetryEvent(eventName, payload);
    }
    /**
     * Send caught or uncaught errors.
     *
     * @param eventName sent message title
     * @param error error object of the uncaught exception
     */
    sendError(eventName, error) {
        if (!this.canSend()) {
            return;
        }
        if (error) {
            this.reporter.sendTelemetryException(error, {
                name: eventName,
            });
        }
        else {
            this.reporter.sendTelemetryEvent(eventName);
        }
    }
    dispose() {
        this.reporter.dispose();
    }
}
function getExtensionVersion() {
    var _a;
    return ((_a = vscode_1.default.extensions.getExtension(extensionId)) === null || _a === void 0 ? void 0 : _a.packageJSON.version) || 'unknown version';
}
/**
 * Methods to report telemetry over Application Insights (Exceptions or Custom Events).
 */
exports.telemetry = new Telemetry(getExtensionVersion());


/***/ }),

/***/ "ajv/dist/jtd":
/***/ ((module) => {

module.exports = require("ajv/dist/jtd");

/***/ }),

/***/ "blade-formatter":
/***/ ((module) => {

module.exports = require("blade-formatter");

/***/ }),

/***/ "find-config":
/***/ ((module) => {

module.exports = require("find-config");

/***/ }),

/***/ "ignore":
/***/ ((module) => {

module.exports = require("ignore");

/***/ }),

/***/ "vscode":
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),

/***/ "vscode-extension-telemetry":
/***/ ((module) => {

module.exports = require("vscode-extension-telemetry");

/***/ }),

/***/ "fs":
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/extension.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map