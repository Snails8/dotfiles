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
exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const configuration_1 = require("../configuration");
const provider_1 = require("./explorer/provider");
const types_1 = require("./types");
const commands_1 = require("./commands");
const platform_store_1 = require("./stores/platform-store");
const favorites_store_1 = require("./stores/favorites-store");
const imported_url_store_1 = require("./stores/imported-url-store");
const fs_provider_1 = require("./fs-provider");
const util_1 = require("./util");
const codelens_1 = require("./codelens");
const audit_1 = require("./audit");
const scan_report_1 = require("./scan-report");
function activate(context, auditContext, cache, reportWebView) {
    return __awaiter(this, void 0, void 0, function* () {
        const platformUrl = configuration_1.configuration.get("platformUrl");
        let platformToken = undefined;
        try {
            platformToken = yield context.secrets.get("platformApiToken");
        }
        catch (ex) {
            // secrets.get() sometimes throws an exception when running tests
            // ignore it
        }
        const scanReportView = new scan_report_1.ScanReportWebView(context.extensionPath);
        const platformContext = {
            context,
            memento: context.workspaceState,
            connection: {
                platformUrl: platformUrl,
                apiToken: platformToken,
            },
            logger: {
                fatal: (message) => null,
                error: (message) => null,
                warning: (message) => null,
                info: (message) => null,
                debug: (message) => null,
            },
        };
        const store = new platform_store_1.PlatformStore(platformContext);
        const favoriteCollections = new favorites_store_1.FavoritesStore(context, platformContext);
        const importedUrls = new imported_url_store_1.ImportedUrlStore(context);
        const platformFs = new fs_provider_1.PlatformFS(store);
        context.subscriptions.push(vscode.workspace.registerFileSystemProvider(types_1.platformUriScheme, platformFs, {
            isCaseSensitive: true,
        }));
        const provider = new provider_1.CollectionsProvider(store, favoriteCollections, context.extensionUri);
        const tree = vscode.window.createTreeView("platformExplorer", {
            treeDataProvider: provider,
        });
        yield vscode.commands.executeCommand("setContext", "openapi.platform.credentials", platformUrl && platformToken ? "present" : "missing");
        // TODO unsubscribe?
        const disposable1 = vscode.workspace.onDidSaveTextDocument((document) => (0, audit_1.refreshAuditReport)(store, cache, auditContext, document));
        const disposable2 = vscode.workspace.onDidOpenTextDocument((document) => (0, audit_1.refreshAuditReport)(store, cache, auditContext, document));
        const disposable3 = vscode.workspace.onDidSaveTextDocument((document) => {
            if ((0, util_1.isPlatformUri)(document.uri)) {
                // when API is saved, it's score might change so we need to refresh
                // explorer that shows API score
                vscode.commands.executeCommand("openapi.platform.refreshCollections");
            }
        });
        (0, commands_1.registerCommands)(context, platformContext, auditContext, store, favoriteCollections, importedUrls, cache, provider, tree, reportWebView, scanReportView);
        vscode.languages.registerCodeLensProvider([
            { scheme: types_1.platformUriScheme, language: "json" },
            { scheme: types_1.platformUriScheme, language: "jsonc" },
        ], new codelens_1.CodelensProvider(store));
    });
}
exports.activate = activate;
//# sourceMappingURL=activate.js.map