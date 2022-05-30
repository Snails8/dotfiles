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
exports.ScanReportWebView = void 0;
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
class ScanReportWebView {
    constructor(extensionPath) {
        this.style = ""; // FIXME
        this.script = vscode.Uri.file(path.join(extensionPath, "webview", "generated", "scan", "index.js"));
        /* FIXME
        this.style = readFileSync(
          path.join(extensionPath, "webview", "generated", "scan", "style.css"),
          { encoding: "utf-8" }
        );
        */
    }
    show(report) {
        if (!this.panel) {
            this.panel = this.createPanel();
        }
        // FIXME this.panel.webview.postMessage({ command: "show", report: sample });
    }
    createPanel() {
        const panel = vscode.window.createWebviewPanel("conformance-scan-report", "Conformance Scan Report", {
            viewColumn: vscode.ViewColumn.Two,
            preserveFocus: true,
        }, {
            enableScripts: true,
            retainContextWhenHidden: true,
        });
        panel.webview.html = this.getHtml(panel.webview.cspSource, panel.webview.asWebviewUri(this.script), this.style);
        panel.onDidDispose(() => (this.panel = undefined));
        panel.webview.onDidReceiveMessage((message) => {
            switch (message.command) {
                case "curl":
                    console.log("run curl", message.curl);
                    vscode.commands.executeCommand("openapi.platform.runCurl", message.curl);
                    break;
            }
        });
        return panel;
    }
    getHtml(cspSource, script, style) {
        return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="Content-Security-Policy"  content="default-src 'none';  img-src ${cspSource} https: data:; script-src ${cspSource} 'unsafe-inline'; style-src ${cspSource}  'unsafe-inline'; connect-src http: https:">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!-- style>{style}</style-->
      <style>
        body {
        background-color: #FEFEFE;
        }
      </style>
    </head>
    <body>
    <div id="root"></div>  
    <!--script src="{script}"></script-->
    <script>
    window.addEventListener("DOMContentLoaded", (event) => {
      console.log('content loaded');
      const vscode = acquireVsCodeApi();
      window.addEventListener('message', event => {
        console.log('got message', event);
        const message = event.data;
              switch (message.command) {
                  case 'show':
                      window.renderScanReport(vscode, message.report);
                      break;
              }
      });
      console.log("all done");
    });
    </script>
    </body>
    </html>`;
    }
}
exports.ScanReportWebView = ScanReportWebView;
//# sourceMappingURL=scan-report.js.map