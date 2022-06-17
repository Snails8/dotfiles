"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleProvidersDataProvider = void 0;
const vscode = require("vscode");
const vscode_uri_1 = require("vscode-uri");
const vscode_languageclient_1 = require("vscode-languageclient");
const vscodeUtils_1 = require("../vscodeUtils");
/* eslint-enable @typescript-eslint/naming-convention */
class ModuleProviderItem extends vscode.TreeItem {
    constructor(fullName, displayName, requiredVersion, installedVersion, docsLink) {
        super(displayName, vscode.TreeItemCollapsibleState.None);
        this.fullName = fullName;
        this.displayName = displayName;
        this.requiredVersion = requiredVersion;
        this.installedVersion = installedVersion;
        this.docsLink = docsLink;
        this.description = installedVersion ?? '';
        this.iconPath = new vscode.ThemeIcon('package');
        this.tooltip = `${fullName} ${requiredVersion ?? ''}`;
        if (docsLink) {
            this.contextValue = 'moduleProviderHasDocs';
        }
    }
}
class ModuleProvidersDataProvider {
    constructor(ctx, handler) {
        this.handler = handler;
        this.didChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this.didChangeTreeData.event;
        ctx.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(async (event) => {
            const activeEditor = (0, vscodeUtils_1.getActiveTextEditor)();
            if (!(0, vscodeUtils_1.isTerraformFile)(activeEditor?.document)) {
                return;
            }
            if (event && activeEditor) {
                this.refresh();
            }
        }), vscode.commands.registerCommand('terraform.providers.openDocumentation', (module) => {
            if (module.docsLink) {
                vscode.env.openExternal(vscode.Uri.parse(module.docsLink));
            }
        }));
    }
    refresh() {
        this.didChangeTreeData.fire();
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element) {
            return [];
        }
        else {
            return this.getProvider();
        }
    }
    async getProvider() {
        const activeEditor = (0, vscodeUtils_1.getActiveTextEditor)();
        if (activeEditor?.document === undefined) {
            return [];
        }
        if (!(0, vscodeUtils_1.isTerraformFile)(activeEditor.document)) {
            return [];
        }
        const editor = activeEditor.document.uri;
        const documentURI = vscode_uri_1.Utils.dirname(editor);
        const handler = this.handler.getClient();
        if (handler === undefined) {
            return [];
        }
        await handler.client.onReady();
        const moduleCallsSupported = this.handler.clientSupportsCommand(`${handler.commandPrefix}.terraform-ls.module.providers`);
        if (!moduleCallsSupported) {
            return [];
        }
        const params = {
            command: `${handler.commandPrefix}.terraform-ls.module.providers`,
            arguments: [`uri=${documentURI}`],
        };
        const response = await handler.client.sendRequest(vscode_languageclient_1.ExecuteCommandRequest.type, params);
        if (response === null) {
            return [];
        }
        return Object.entries(response.provider_requirements)
            .map(([provider, details]) => new ModuleProviderItem(provider, details.display_name, details.version_constraint, response.installed_providers[provider], details.docs_link))
            .filter((m) => Boolean(m.requiredVersion));
    }
}
exports.ModuleProvidersDataProvider = ModuleProvidersDataProvider;
//# sourceMappingURL=moduleProviders.js.map