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
exports.AuditReportWebView = void 0;
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
const theme_1 = require("@xliic/common/theme");
const fs_1 = require("fs");
const client_1 = require("./client");
const util_1 = require("./util");
class AuditReportWebView {
    constructor(extensionPath, cache) {
        this._disposables = [];
        this.cache = cache;
        this.script = vscode.Uri.file(path.join(extensionPath, "webview", "generated", "audit", "index.js"));
        this.style = (0, fs_1.readFileSync)(path.join(extensionPath, "webview", "generated", "audit", "style.css"), { encoding: "utf-8" });
    }
    prefetchKdb() {
        this.kdb = (0, client_1.getArticles)();
    }
    getKdb() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.kdb !== undefined) {
                return this.kdb;
            }
            this.prefetchKdb();
            return this.kdb;
        });
    }
    show(report) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.panel) {
                this.panel = yield this.createPanel(yield this.getKdb());
            }
            this.panel.webview.postMessage({ command: "showFullReport", report });
        });
    }
    showIds(report, uri, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.panel) {
                this.panel = yield this.createPanel(yield this.getKdb());
            }
            this.panel.webview.postMessage({ command: "showPartialReport", report, uri, ids });
        });
    }
    showIfVisible(report) {
        if (this.panel && this.panel.visible) {
            this.panel.webview.postMessage({ command: "showFullReport", report });
        }
    }
    showNoReport() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.panel && this.panel.visible) {
                this.panel.webview.postMessage({ command: "showNoReport" });
            }
        });
    }
    focusLine(uri, pointer, line) {
        return __awaiter(this, void 0, void 0, function* () {
            let editor = undefined;
            // check if document is already open
            for (const visibleEditor of vscode.window.visibleTextEditors) {
                if (visibleEditor.document.uri.toString() == uri) {
                    editor = visibleEditor;
                }
            }
            if (!editor) {
                // if not already open, load and show it
                const document = yield vscode.workspace.openTextDocument(vscode.Uri.parse(uri));
                editor = yield vscode.window.showTextDocument(document, vscode.ViewColumn.One);
            }
            let lineNo;
            const root = this.cache.getParsedDocument(editor.document);
            if (root) {
                // use pointer by default
                lineNo = (0, util_1.getLocationByPointer)(editor.document, root, pointer)[0];
            }
            else {
                // fallback to line no
                lineNo = parseInt(line, 10);
            }
            const textLine = editor.document.lineAt(lineNo);
            editor.selection = new vscode.Selection(lineNo, 0, lineNo, 0);
            editor.revealRange(textLine.range, vscode.TextEditorRevealType.AtTop);
        });
    }
    dispose() {
        var _a;
        (_a = this.panel) === null || _a === void 0 ? void 0 : _a.dispose();
        this.panel = undefined;
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
    createPanel(kdb) {
        const panel = vscode.window.createWebviewPanel("security-audit-report", "Security Audit Report", {
            viewColumn: vscode.ViewColumn.Two,
            preserveFocus: true,
        }, {
            enableScripts: true,
            retainContextWhenHidden: true,
        });
        panel.webview.html = this.getHtml(panel.webview.cspSource, kdb, panel.webview.asWebviewUri(this.script), this.style);
        vscode.window.onDidChangeActiveColorTheme((event) => {
            var _a;
            const kind = event.kind === vscode.ColorThemeKind.Light ? "light" : "dark";
            (_a = this.panel) === null || _a === void 0 ? void 0 : _a.webview.postMessage({ command: "changeTheme", kind });
        }, null, this._disposables);
        panel.onDidDispose(() => this.dispose(), null, this._disposables);
        return new Promise((resolve, reject) => {
            panel.webview.onDidReceiveMessage((message) => {
                switch (message.command) {
                    case "started":
                        resolve(panel);
                        return;
                    case "copyIssueId":
                        vscode.env.clipboard.writeText(message.id);
                        const disposable = vscode.window.setStatusBarMessage(`Copied ID: ${message.id}`);
                        setTimeout(() => disposable.dispose(), 1000);
                        return;
                    case "goToLine":
                        this.focusLine(message.uri, message.pointer, message.line);
                        return;
                    case "openLink":
                        vscode.env.openExternal(vscode.Uri.parse(message.href));
                        return;
                }
            }, null, this._disposables);
        });
    }
    getHtml(cspSource, kdb, script, style) {
        const themeKind = vscode.window.activeColorTheme.kind == vscode.ColorThemeKind.Light ? "light" : "dark";
        return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="Content-Security-Policy"  content="default-src 'none';  img-src ${cspSource} https: data:; script-src ${cspSource} 'unsafe-inline'; style-src ${cspSource}  'unsafe-inline'; connect-src http: https:">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${style}</style>
      <style type="text/css">
        ${customCssProperties()}
      </style>
    </head>
    <body>
    <div id="root"></div>
    <script type="application/json" id="kdb">${JSON.stringify(kdb)}</script>
  
    <script src="${script}"></script>
    <script>
    window.addEventListener("DOMContentLoaded", (event) => {
      const kdb = JSON.parse(document.getElementById("kdb").textContent);
      const vscode = acquireVsCodeApi();
      window.renderAuditReport(vscode, kdb, {kind: "${themeKind}"});
      vscode.postMessage({command: "started"});
    });
    </script>
    </body>
    </html>`;
    }
}
exports.AuditReportWebView = AuditReportWebView;
function customCssProperties() {
    const vscodeColorMap = {
        foreground: "--vscode-foreground",
        background: "--vscode-editor-background",
        disabledForeground: "--vscode-disabledForeground",
        border: "--vscode-editorGroup-border",
        focusBorder: "--vscode-focusBorder",
        buttonBorder: "--vscode-button-border",
        buttonBackground: "--vscode-button-background",
        buttonForeground: "--vscode-button-foreground",
        buttonHoverBackground: "--vscode-button-hoverBackground",
        buttonSecondaryBackground: "--vscode-button-secondaryBackground",
        buttonSecondaryForeground: "--vscode-button-secondaryForeground",
        buttonSecondaryHoverBackground: "--vscode-button-secondaryHoverBackground",
        inputBackground: "--vscode-input-background",
        inputForeground: "--vscode-input-foreground",
        inputBorder: "--vscode-input-border",
        tabBorder: "--vscode-tab-border",
        tabActiveBackground: "--vscode-tab-activeBackground",
        tabActiveForeground: "--vscode-tab-activeForeground",
        tabInactiveBackground: "--vscode-tab-inactiveBackground",
        tabInactiveForeground: "--vscode-tab-inactiveForeground",
        dropdownBackground: "--vscode-dropdown-background",
        dropdownBorder: "--vscode-dropdown-border",
        dropdownForeground: "--vscode-dropdown-foreground",
        checkboxBackground: "--vscode-checkbox-background",
        checkboxBorder: "--vscode-checkbox-border",
        checkboxForeground: "--vscode-checkbox-foreground",
        errorForeground: "--vscode-errorForeground",
        errorBackground: "--vscode-inputValidation-errorBackground",
        errorBorder: "--vscode-inputValidation-errorBorder",
        sidebarBackground: "--vscode-sideBar-background",
        listActiveSelectionBackground: "--vscode-list-activeSelectionBackground",
        listActiveSelectionForeground: "--vscode-list-activeSelectionForeground",
        listHoverBackground: "--vscode-list-hoverBackground",
        contrastActiveBorder: "--vscode-contrastActiveBorder",
    };
    const props = theme_1.ThemeColorNames.map((name) => createColorProperty(name, vscodeColorMap[name])).join("\n");
    return `:root { ${props} }`;
}
function createColorProperty(name, vsCodeVariable) {
    const variable = theme_1.ThemeColorVariables[name];
    const customVariable = theme_1.ThemeColorVariables[name] + "-custom";
    return `${variable}: var(${customVariable}, var(${vsCodeVariable}));`;
}
//# sourceMappingURL=report.js.map