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
const create_schema_handler_1 = require("./create-schema-handler");
const ENV_DEFAULT_KEY = "openapi-42crunch.environment-default";
const ENV_SECRETS_KEY = "openapi-42crunch.environment-secrets";
class TryItWebView extends web_view_1.WebView {
    constructor(extensionPath, cache, memento, secret, prefs) {
        super(extensionPath, "scan", "Try It", vscode.ViewColumn.Two);
        this.cache = cache;
        this.memento = memento;
        this.secret = secret;
        this.prefs = prefs;
        this.responseHandlers = {
            sendRequest: http_handler_1.executeHttpRequest,
            createSchema: (response) => __awaiter(this, void 0, void 0, function* () {
                (0, create_schema_handler_1.executeCreateSchemaRequest)(this.document, this.cache, response);
            }),
            saveConfig: (config) => __awaiter(this, void 0, void 0, function* () {
                vscode.workspace
                    .getConfiguration("openapi")
                    .update("tryit.insecureSslHostnames", config.insecureSslHostnames);
            }),
            saveEnv: (env) => __awaiter(this, void 0, void 0, function* () {
                if (env.name === "default") {
                    this.memento.update(ENV_DEFAULT_KEY, env.environment);
                }
                else if (env.name === "secrets") {
                    this.secret.store(ENV_SECRETS_KEY, JSON.stringify(env.environment));
                }
            }),
            savePrefs: (prefs) => __awaiter(this, void 0, void 0, function* () {
                this.prefs[this.document.uri.toString()] = prefs;
            }),
        };
    }
    sendTryOperation(document, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.document = document;
            const defaultEnv = this.memento.get(ENV_DEFAULT_KEY, {});
            const secretsEnv = JSON.parse((yield this.secret.get(ENV_SECRETS_KEY)) || "{}");
            this.sendRequest({ command: "loadEnv", payload: { default: defaultEnv, secrets: secretsEnv } });
            const prefs = this.prefs[this.document.uri.toString()];
            if (prefs) {
                this.sendRequest({ command: "loadPrefs", payload: prefs });
            }
            return this.sendRequest({ command: "tryOperation", payload });
        });
    }
}
exports.TryItWebView = TryItWebView;
//# sourceMappingURL=view.js.map