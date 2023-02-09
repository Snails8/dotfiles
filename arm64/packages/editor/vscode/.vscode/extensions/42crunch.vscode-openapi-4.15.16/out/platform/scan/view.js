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
exports.ScanWebView = void 0;
const vscode = __importStar(require("vscode"));
const env_1 = require("@xliic/common/messages/env");
const web_view_1 = require("../../web-view");
const http_handler_1 = require("../../tryit/http-handler");
const env_2 = require("./env");
class ScanWebView extends web_view_1.WebView {
    constructor(extensionPath, cache, configuration, store, memento, secret, prefs) {
        super(extensionPath, "scan", "Scan", vscode.ViewColumn.Two);
        this.cache = cache;
        this.configuration = configuration;
        this.store = store;
        this.memento = memento;
        this.secret = secret;
        this.prefs = prefs;
        this.responseHandlers = {
            runScan: (config) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e;
                try {
                    return yield runScan(this.store, this.memento, this.secret, config, this.configuration.get("platformConformanceScanImage"));
                }
                catch (ex) {
                    if (((_a = ex === null || ex === void 0 ? void 0 : ex.response) === null || _a === void 0 ? void 0 : _a.statusCode) === 409 &&
                        ((_c = (_b = ex === null || ex === void 0 ? void 0 : ex.response) === null || _b === void 0 ? void 0 : _b.body) === null || _c === void 0 ? void 0 : _c.code) === 109 &&
                        ((_e = (_d = ex === null || ex === void 0 ? void 0 : ex.response) === null || _d === void 0 ? void 0 : _d.body) === null || _e === void 0 ? void 0 : _e.message) === "limit reached") {
                        vscode.window.showErrorMessage("You have reached your maximum number of APIs. Please contact support@42crunch.com to upgrade your account.");
                    }
                    else {
                        vscode.window.showErrorMessage("Failed to run scan: " + ex.message);
                    }
                    throw ex;
                }
            }),
            sendScanRequest: (request) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield (0, http_handler_1.executeHttpRequestRaw)(request);
                    return {
                        command: "showScanResponse",
                        payload: response,
                    };
                }
                catch (e) {
                    return {
                        command: "showError",
                        payload: e,
                    };
                }
            }),
            sendCurlRequest: (curl) => __awaiter(this, void 0, void 0, function* () {
                return runCurl(curl);
            }),
            saveEnv: (env) => __awaiter(this, void 0, void 0, function* () {
                yield (0, env_2.saveEnv)(this.memento, this.secret, env);
            }),
            savePrefs: (prefs) => __awaiter(this, void 0, void 0, function* () {
                this.prefs[this.document.uri.toString()] = prefs;
            }),
        };
    }
    sendScanOperation(document, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            this.document = document;
            const env = yield (0, env_2.loadEnv)(this.memento, this.secret);
            this.sendRequest({ command: "loadEnv", payload: env });
            const prefs = this.prefs[this.document.uri.toString()];
            if (prefs) {
                this.sendRequest({ command: "loadPrefs", payload: prefs });
            }
            return this.sendRequest({ command: "scanOperation", payload });
        });
    }
}
exports.ScanWebView = ScanWebView;
function runScan(store, memento, secret, config, scandImage) {
    return __awaiter(this, void 0, void 0, function* () {
        const api = yield store.createTempApi(config.rawOas);
        const audit = yield store.getAuditReport(api.desc.id);
        if ((audit === null || audit === void 0 ? void 0 : audit.openapiState) !== "valid") {
            yield store.deleteApi(api.desc.id);
            throw new Error("OpenAPI has failed Security Audit. Please run API Security Audit, fix the issues and try running the Scan again.");
        }
        yield store.createScanConfig(api.desc.id, "updated", config.config);
        const configs = yield store.getScanConfigs(api.desc.id);
        const c = yield store.readScanConfig(configs[0].scanConfigurationId);
        const token = c.scanConfigurationToken;
        const services = store.getConnection().services;
        const terminal = findOrCreateTerminal();
        const envData = yield (0, env_2.loadEnv)(memento, secret);
        const env = {};
        for (const [name, value] of Object.entries(config.env)) {
            env[name] = (0, env_1.replaceEnv)(value, envData);
        }
        env["SCAN_TOKEN"] = token;
        env["PLATFORM_SERVICE"] = services;
        const envString = Object.entries(env)
            .map(([key, value]) => `-e ${key}='${value}'`)
            .join(" ");
        terminal.sendText(`docker run --rm ${envString} ${scandImage}`);
        terminal.show();
        const reportId = yield waitForReport(store, api.desc.id, 10000);
        const report = yield store.readScanReport(reportId);
        const parsed = JSON.parse(Buffer.from(report, "base64").toString("utf-8"));
        yield store.deleteApi(api.desc.id);
        return {
            command: "showScanReport",
            payload: parsed,
        };
    });
}
function runCurl(curl) {
    return __awaiter(this, void 0, void 0, function* () {
        const terminal = findOrCreateTerminal();
        terminal.sendText(curl);
        terminal.show();
    });
}
function waitForReport(store, apiId, maxDelay) {
    return __awaiter(this, void 0, void 0, function* () {
        let currentDelay = 0;
        while (currentDelay < maxDelay) {
            const reports = yield store.listScanReports(apiId);
            if (reports.length > 0) {
                return reports[0].taskId;
            }
            console.log("Waiting for report to become available");
            yield delay(1000);
        }
        console.log("Failed to read report");
        return undefined;
    });
}
function delay(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => setTimeout(resolve, ms));
    });
}
function findOrCreateTerminal() {
    const name = "scan";
    for (const terminal of vscode.window.terminals) {
        if (terminal.name === name && terminal.exitStatus === undefined) {
            return terminal;
        }
    }
    return vscode.window.createTerminal({ name });
}
//# sourceMappingURL=view.js.map