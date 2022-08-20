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
exports.WebView = void 0;
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
class WebView {
    constructor(extensionPath, viewId, viewTitle, column) {
        this.viewId = viewId;
        this.viewTitle = viewTitle;
        this.column = column;
        this.script = vscode.Uri.file(path.join(extensionPath, "webview", "generated", viewId, "index.js"));
        this.style = vscode.Uri.file(path.join(extensionPath, "webview", "generated", viewId, "style.css"));
    }
    isActive() {
        return this.panel !== undefined;
    }
    sendRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.panel) {
                yield this.panel.webview.postMessage(request);
            }
            else {
                throw new Error(`Can't send message to ${this.viewId}, webview not initialized`);
            }
        });
    }
    handleResponse(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const handler = this.responseHandlers[response.command];
            if (handler) {
                const request = yield handler(response.payload);
                if (request !== undefined) {
                    this.sendRequest(request);
                }
            }
            else {
                throw new Error(`Unable to find response handler for command: ${response.command} in ${this.viewId} webview`);
            }
        });
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.panel) {
                const panel = yield this.createPanel();
                panel.onDidDispose(() => (this.panel = undefined));
                panel.webview.onDidReceiveMessage((message) => __awaiter(this, void 0, void 0, function* () {
                    this.handleResponse(message);
                }));
                this.panel = panel;
            }
            else if (!this.panel.visible) {
                this.panel.reveal();
            }
        });
    }
    createPanel() {
        const panel = vscode.window.createWebviewPanel(this.viewId, this.viewTitle, {
            viewColumn: this.column,
            preserveFocus: true,
        }, {
            enableScripts: true,
            retainContextWhenHidden: true,
        });
        if (process.env["XLIIC_WEB_VIEW_DEV_MODE"] === "true") {
            panel.webview.html = this.getDevHtml(panel.webview.cspSource, panel.webview.asWebviewUri(this.script), panel.webview.asWebviewUri(this.style));
        }
        else {
            panel.webview.html = this.getHtml(panel.webview.cspSource, panel.webview.asWebviewUri(this.script), panel.webview.asWebviewUri(this.style));
        }
        return new Promise((resolve, reject) => {
            panel.webview.onDidReceiveMessage((message) => {
                if (message.command === "started") {
                    resolve(panel);
                }
            });
        });
    }
    getDevHtml(cspSource, script, style) {
        return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="Content-Security-Policy"  content="default-src 'none';  img-src ${cspSource} https: data:; script-src ${cspSource} http://localhost:3000/ 'unsafe-inline'; style-src ${cspSource} http://localhost:3000/ 'unsafe-inline'; connect-src http: https: ws:">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <base href="http://localhost:3000/">
      <script type="module" src="/@vite/client"></script>
      <script type="module">
      import RefreshRuntime from "/@react-refresh"
      RefreshRuntime.injectIntoGlobalHook(window)
      window.$RefreshReg$ = () => {}
      window.$RefreshSig$ = () => (type) => type
      window.__vite_plugin_react_preamble_installed__ = true
      </script>
      <style>
        ${customCssProperties()}
      </style>
    </head>
    <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx?t=${Date.now()}"></script>
    <script>
      window.addEventListener("DOMContentLoaded", (event) => {
        const vscode = acquireVsCodeApi();
        window.renderWebView(vscode);
        vscode.postMessage({command: "started"});
      });
    </script>
    </body>
    </html>`;
    }
    getHtml(cspSource, script, style) {
        return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="Content-Security-Policy"  content="default-src 'none';  img-src ${cspSource} https: data:; script-src ${cspSource} 'unsafe-inline'; style-src ${cspSource}  'unsafe-inline'; connect-src http: https:">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="${style}" rel="stylesheet">
      <style>
        ${customCssProperties()}
      </style>
    </head>
    <body>
    <div id="root"></div>  
    <script src="${script}"></script>
    <script>
      window.addEventListener("DOMContentLoaded", (event) => {
        const vscode = acquireVsCodeApi();
        window.renderWebView(vscode);
        vscode.postMessage({command: "started"});
      });
    </script>
    </body>
    </html>`;
    }
}
exports.WebView = WebView;
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
    };
    const props = Object.entries(vscodeColorMap)
        .map(([name, vscode]) => {
        return createColorProperty(name, vscode);
    })
        .join("\n");
    return `:root { ${props} }`;
}
function createColorProperty(name, vscode) {
    return `--xliic-${name}: var(--xliic-custom-${name}, var(${vscode}));`;
}
//# sourceMappingURL=web-view.js.map