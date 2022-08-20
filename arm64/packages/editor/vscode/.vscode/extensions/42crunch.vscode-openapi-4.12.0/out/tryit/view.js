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
exports.TryItWebView = void 0;
const vscode = __importStar(require("vscode"));
const web_view_1 = require("../web-view");
const http_handler_1 = require("./http-handler");
const curl_handler_1 = require("./curl-handler");
const create_schema_handler_1 = require("./create-schema-handler");
class TryItWebView extends web_view_1.WebView {
    constructor(extensionPath, cache) {
        super(extensionPath, "scan", "Try It", vscode.ViewColumn.Two);
        this.cache = cache;
        this.responseHandlers = {
            sendRequest: http_handler_1.executeHttpRequest,
            sendCurl: curl_handler_1.executeCurlRequest,
            createSchema: (response) => __awaiter(this, void 0, void 0, function* () {
                (0, create_schema_handler_1.executeCreateSchemaRequest)(this.document, this.cache, response);
            }),
            saveConfig: (config) => __awaiter(this, void 0, void 0, function* () {
                vscode.workspace
                    .getConfiguration("openapi")
                    .update("tryit.insecureSslHostnames", config.insecureSslHostnames);
            }),
        };
    }
    sendTryOperation(document, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.document = document;
            return this.sendRequest({ command: "tryOperation", payload });
        });
    }
}
exports.TryItWebView = TryItWebView;
//# sourceMappingURL=view.js.map