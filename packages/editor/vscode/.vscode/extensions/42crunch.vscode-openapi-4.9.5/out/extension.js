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
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const semver = __importStar(require("semver"));
const configuration_1 = require("./configuration");
const types_1 = require("./types");
const parser_options_1 = require("./parser-options");
const outline_1 = require("./outline");
const reference_1 = require("./reference");
const external_refs_1 = require("./external-refs");
const completion_1 = require("./completion");
const context_1 = require("./context");
const commands_1 = require("./commands");
const whatsnew_1 = require("./whatsnew");
const cache_1 = require("./cache");
const report_1 = require("./audit/report");
const yamlSchemaContributor = __importStar(require("./yaml-schema-contributor"));
const audit = __importStar(require("./audit/activate"));
const preview = __importStar(require("./preview"));
const platform = __importStar(require("./platform/activate"));
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const versionProperty = "openapiVersion";
        const openapiExtension = vscode.extensions.getExtension(types_1.extensionQualifiedId);
        const currentVersion = semver.parse(openapiExtension.packageJSON.version);
        const previousVersion = context.globalState.get(versionProperty)
            ? semver.parse(context.globalState.get(versionProperty))
            : semver.parse("0.0.1");
        const yamlConfiguration = new configuration_1.Configuration("yaml");
        context.globalState.update(versionProperty, currentVersion.toString());
        parser_options_1.parserOptions.configure(yamlConfiguration);
        const selectors = {
            json: { language: "json" },
            jsonc: { language: "jsonc" },
            yaml: { language: "yaml" },
        };
        const externalRefProvider = new external_refs_1.ExternalRefDocumentProvider();
        vscode.workspace.registerTextDocumentContentProvider(external_refs_1.INTERNAL_SCHEMES.http, externalRefProvider);
        vscode.workspace.registerTextDocumentContentProvider(external_refs_1.INTERNAL_SCHEMES.https, externalRefProvider);
        const cache = new cache_1.Cache(parser_options_1.parserOptions, Object.values(selectors), externalRefProvider);
        context.subscriptions.push(cache);
        cache.onDidActiveDocumentChange((document) => (0, context_1.updateContext)(cache, document));
        context.subscriptions.push(...(0, outline_1.registerOutlines)(context, cache));
        context.subscriptions.push(...(0, commands_1.registerCommands)(cache));
        context.subscriptions.push((0, external_refs_1.registerAddApprovedHost)(context));
        const completionProvider = new completion_1.CompletionItemProvider(context, cache);
        for (const selector of Object.values(selectors)) {
            vscode.languages.registerCompletionItemProvider(selector, completionProvider, "#", "'", '"');
        }
        const jsonSchemaDefinitionProvider = new reference_1.JsonSchemaDefinitionProvider(cache, externalRefProvider);
        const yamlSchemaDefinitionProvider = new reference_1.YamlSchemaDefinitionProvider(cache, externalRefProvider, parser_options_1.parserOptions);
        vscode.languages.registerDefinitionProvider(selectors.json, jsonSchemaDefinitionProvider);
        vscode.languages.registerDefinitionProvider(selectors.jsonc, jsonSchemaDefinitionProvider);
        vscode.languages.registerDefinitionProvider(selectors.yaml, yamlSchemaDefinitionProvider);
        const approveHostnameAction = new external_refs_1.ApproveHostnameAction();
        for (const selector of Object.values(selectors)) {
            vscode.languages.registerCodeActionsProvider(selector, approveHostnameAction, {
                providedCodeActionKinds: external_refs_1.ApproveHostnameAction.providedCodeActionKinds,
            });
        }
        vscode.window.onDidChangeActiveTextEditor((e) => cache.onActiveEditorChanged(e));
        vscode.workspace.onDidChangeTextDocument((e) => cache.onDocumentChanged(e));
        yamlSchemaContributor.activate(context, cache);
        const auditContext = {
            auditsByMainDocument: {},
            auditsByDocument: {},
            decorations: {},
            diagnostics: vscode.languages.createDiagnosticCollection("audits"),
        };
        const reportWebView = new report_1.AuditReportWebView(context.extensionPath, cache);
        audit.activate(context, auditContext, cache, reportWebView);
        preview.activate(context, cache, configuration_1.configuration);
        yield platform.activate(context, auditContext, cache, reportWebView);
        if (previousVersion.major < currentVersion.major) {
            (0, whatsnew_1.create)(context);
        }
        configuration_1.configuration.configure(context);
        yamlConfiguration.configure(context);
        if (vscode.window.activeTextEditor) {
            cache.onActiveEditorChanged(vscode.window.activeTextEditor);
        }
    });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map