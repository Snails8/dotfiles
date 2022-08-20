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
    createPanel() {
        const panel = vscode.window.createWebviewPanel(this.viewId, this.viewTitle, {
            viewColumn: this.column,
            preserveFocus: true,
        }, {
            enableScripts: true,
            retainContextWhenHidden: true,
        });
        panel.webview.html = this.getHtml(panel.webview.cspSource, panel.webview.asWebviewUri(this.script), panel.webview.asWebviewUri(this.style));
        return new Promise((resolve, reject) => {
            panel.webview.onDidReceiveMessage((message) => {
                if (message.command === "started") {
                    resolve(panel);
                }
            });
        });
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
        :root {
          --xliic-foreground: var(
            --xliic-custom-foreground,
            var(--vscode-editor-foreground)
          );
          --xliic-background: var(
            --xliic-custom-background,
            var(--vscode-editor-background)
          );
          --xliic-button-background: var(
            --xliic-custom-button-background,
            var(--vscode-button-background)
          );
          --xliic-button-foreground: var(
            --xliic-custom-button-foreground,
            var(--vscode-button-foreground)
          );
          --xliic-button-hoverBackground: var(
            --xliic-custom-button-hoverBackground,
            var(--vscode-button-hoverBackground)
          );
        }
        #root .btn-primary {
          --bs-btn-bg: var(--xliic-button-background);
          --bs-btn-hover-bg: var(--xliic-button-hoverBackground);
          --bs-btn-color: var(--xliic-button-foreground);
          --bs-btn-hover-color: var(--xliic-button-foreground);
          --bs-btn-border-color: var(--xliic-button-background);
          --bs-btn-hover-border-color: var(--xliic-button-hoverBackground);
        }
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
//# sourceMappingURL=web-view.js.map