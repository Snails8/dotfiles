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
exports.registerFocusSecurityAuditById = exports.registerFocusSecurityAudit = exports.registerSecurityAudit = void 0;
/*
 Copyright (c) 42Crunch Ltd. All rights reserved.
 Licensed under the GNU Affero General Public License version 3. See LICENSE.txt in the project root for license information.
*/
const vscode = __importStar(require("vscode"));
const client_1 = require("./client");
const decoration_1 = require("./decoration");
const diagnostic_1 = require("./diagnostic");
const preserving_json_yaml_parser_1 = require("@xliic/preserving-json-yaml-parser");
const audit_1 = require("./audit");
function registerSecurityAudit(context, cache, auditContext, pendingAudits, reportWebView) {
    return vscode.commands.registerTextEditorCommand("openapi.securityAudit", (textEditor, edit) => __awaiter(this, void 0, void 0, function* () {
        const uri = textEditor.document.uri.toString();
        if (pendingAudits[uri]) {
            vscode.window.showErrorMessage(`Audit for "${uri}" is already in progress`);
            return;
        }
        delete auditContext.auditsByMainDocument[uri];
        pendingAudits[uri] = true;
        try {
            reportWebView.prefetchKdb();
            const audit = yield securityAudit(cache, textEditor);
            if (audit) {
                (0, audit_1.updateAuditContext)(auditContext, uri, audit);
                (0, decoration_1.updateDecorations)(auditContext.decorations, audit.summary.documentUri, audit.issues);
                (0, diagnostic_1.updateDiagnostics)(auditContext.diagnostics, audit.filename, audit.issues);
                (0, decoration_1.setDecorations)(textEditor, auditContext);
                reportWebView.show(audit);
            }
            delete pendingAudits[uri];
        }
        catch (e) {
            delete pendingAudits[uri];
            vscode.window.showErrorMessage(`Failed to audit: ${e}`);
        }
    }));
}
exports.registerSecurityAudit = registerSecurityAudit;
function registerFocusSecurityAudit(context, cache, auditContext, reportWebView) {
    return vscode.commands.registerCommand("openapi.focusSecurityAudit", (documentUri) => __awaiter(this, void 0, void 0, function* () {
        try {
            const audit = auditContext.auditsByMainDocument[documentUri];
            if (audit) {
                reportWebView.show(audit);
            }
        }
        catch (e) {
            vscode.window.showErrorMessage(`Unexpected error: ${e}`);
        }
    }));
}
exports.registerFocusSecurityAudit = registerFocusSecurityAudit;
function registerFocusSecurityAuditById(context, auditContext, reportWebView) {
    return vscode.commands.registerTextEditorCommand("openapi.focusSecurityAuditById", (textEditor, edit, params) => __awaiter(this, void 0, void 0, function* () {
        try {
            const documentUri = textEditor.document.uri.toString();
            const uri = Buffer.from(params.uri, "base64").toString("utf8");
            const audit = auditContext.auditsByMainDocument[uri];
            if (audit && audit.issues[documentUri]) {
                reportWebView.showIds(audit, documentUri, params.ids);
            }
        }
        catch (e) {
            vscode.window.showErrorMessage(`Unexpected error: ${e}`);
        }
    }));
}
exports.registerFocusSecurityAuditById = registerFocusSecurityAuditById;
function securityAudit(cache, textEditor) {
    return __awaiter(this, void 0, void 0, function* () {
        const configuration = vscode.workspace.getConfiguration("openapi");
        let apiToken = configuration.get("securityAuditToken");
        if (!apiToken) {
            const email = yield vscode.window.showInputBox({
                prompt: "Security Audit from 42Crunch runs ~200 checks for security best practices in your API. VS Code needs an API key to use the service. Enter your email to receive the token.",
                placeHolder: "email address",
                validateInput: (value) => value.indexOf("@") > 0 && value.indexOf("@") < value.length - 1
                    ? null
                    : "Please enter valid email address",
            });
            if (!email) {
                return;
            }
            const tokenRequestResult = yield vscode.window.withProgress({ location: vscode.ProgressLocation.Notification, title: "Requesting token" }, (progress, token) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield (0, client_1.requestToken)(email);
                }
                catch (e) {
                    vscode.window.showErrorMessage("Unexpected error when trying to request token: " + e);
                }
            }));
            if (!tokenRequestResult || tokenRequestResult.status !== "success") {
                return;
            }
            const token = yield vscode.window.showInputBox({
                prompt: "API token has been sent. If you don't get the mail within a couple minutes, check your spam folder and that the address is correct. Paste the token above.",
                ignoreFocusOut: true,
                placeHolder: "token",
            });
            if (!token) {
                return;
            }
            const configuration = vscode.workspace.getConfiguration();
            configuration.update("openapi.securityAuditToken", token, vscode.ConfigurationTarget.Global);
            apiToken = token;
        }
        return vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Running API Contract Security Audit...",
            cancellable: false,
        }, (progress, cancellationToken) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const bundle = yield cache.getDocumentBundle(textEditor.document);
            if (!bundle || "errors" in bundle) {
                vscode.commands.executeCommand("workbench.action.problems.focus");
                throw new Error("Failed to bundle for audit, check OpenAPI file for errors.");
            }
            try {
                const report = yield (0, client_1.audit)((0, preserving_json_yaml_parser_1.stringify)(bundle.value), apiToken.trim(), progress);
                return (0, audit_1.parseAuditReport)(cache, textEditor.document, report, bundle.mapping);
            }
            catch (e) {
                if (((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.statusCode) === 429) {
                    vscode.window.showErrorMessage("Too many requests. You can run up to 3 security audits per minute, please try again later.");
                }
                else if (((_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.statusCode) === 403) {
                    vscode.window.showErrorMessage("Authentication failed. Please paste the token that you received in email to Preferences > Settings > Extensions > OpenAPI > Security Audit Token. If you want to receive a new token instead, clear that setting altogether and initiate a new security audit for one of your OpenAPI files.");
                }
                else {
                    vscode.window.showErrorMessage("Unexpected error when trying to audit API: " + e);
                }
            }
        }));
    });
}
//# sourceMappingURL=commands.js.map