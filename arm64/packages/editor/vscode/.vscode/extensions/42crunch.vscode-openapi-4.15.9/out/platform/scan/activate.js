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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const lens_1 = require("./lens");
const commands_1 = __importDefault(require("./commands"));
const view_1 = require("./view");
const selectors = {
    json: { language: "json" },
    jsonc: { language: "jsonc" },
    yaml: { language: "yaml" },
};
function activate(context, platformContext, cache, configuration, store, memento, secrets, prefs) {
    const view = new view_1.ScanWebView(context.extensionPath, cache, configuration, store, memento, secrets, prefs);
    const scanCodelensProvider = new lens_1.ScanCodelensProvider(cache);
    let disposables = [];
    store.onConnectionDidChange(({ connected }) => {
        disposables.forEach((disposable) => disposable.dispose());
        if (connected) {
            disposables = Object.values(selectors).map((selector) => vscode.languages.registerCodeLensProvider(selector, scanCodelensProvider));
        }
        else {
            disposables = [];
        }
    });
    (0, commands_1.default)(cache, platformContext, store, view);
    return new vscode.Disposable(() => disposables.forEach((disposable) => disposable.dispose()));
}
exports.activate = activate;
//# sourceMappingURL=activate.js.map