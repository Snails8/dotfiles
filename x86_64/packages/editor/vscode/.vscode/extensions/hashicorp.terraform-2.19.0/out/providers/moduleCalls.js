"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleCallsDataProvider = void 0;
const path = require("path");
const vscode = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const vscode_uri_1 = require("vscode-uri");
const vscodeUtils_1 = require("../vscodeUtils");
/* eslint-enable @typescript-eslint/naming-convention */
class ModuleCallItem extends vscode.TreeItem {
    constructor(label, sourceAddr, version, sourceType, docsLink, terraformIcon, children) {
        super(label, children.length >= 1 ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);
        this.label = label;
        this.sourceAddr = sourceAddr;
        this.version = version;
        this.sourceType = sourceType;
        this.docsLink = docsLink;
        this.terraformIcon = terraformIcon;
        this.children = children;
        this.iconPath = this.getIcon(this.sourceType);
        this.description = this.version ? `${this.version}` : '';
        if (this.version === undefined) {
            this.tooltip = `${this.sourceAddr}`;
        }
        else {
            this.tooltip = `${this.sourceAddr}@${this.version}`;
        }
    }
    getIcon(type) {
        switch (type) {
            case 'tfregistry':
                return {
                    light: this.terraformIcon,
                    dark: this.terraformIcon,
                };
            case 'local':
                return new vscode.ThemeIcon('symbol-folder');
            case 'github':
                return new vscode.ThemeIcon('github');
            case 'git':
                return new vscode.ThemeIcon('git-branch');
            default:
                return new vscode.ThemeIcon('extensions-view-icon');
        }
    }
}
class ModuleCallsDataProvider {
    constructor(ctx, handler) {
        this.handler = handler;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
        this.svg = '';
        this.svg = ctx.asAbsolutePath(path.join('assets', 'icons', 'terraform.svg'));
        ctx.subscriptions.push(vscode.commands.registerCommand('terraform.modules.refreshList', () => this.refresh()), vscode.commands.registerCommand('terraform.modules.openDocumentation', (module) => {
            if (module.docsLink) {
                vscode.env.openExternal(vscode.Uri.parse(module.docsLink));
            }
        }), vscode.window.onDidChangeActiveTextEditor(async (event) => {
            const activeEditor = (0, vscodeUtils_1.getActiveTextEditor)();
            if (!(0, vscodeUtils_1.isTerraformFile)(activeEditor?.document)) {
                return;
            }
            if (event && activeEditor) {
                this.refresh();
            }
        }));
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element) {
            return Promise.resolve(element.children);
        }
        else {
            const m = this.getModules();
            return Promise.resolve(m);
        }
    }
    async getModules() {
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
        return await handler.client.onReady().then(async () => {
            const moduleCallsSupported = this.handler.clientSupportsCommand(`${handler.commandPrefix}.terraform-ls.module.calls`);
            if (!moduleCallsSupported) {
                return Promise.resolve([]);
            }
            const params = {
                command: `${handler.commandPrefix}.terraform-ls.module.calls`,
                arguments: [`uri=${documentURI}`],
            };
            const response = await handler.client.sendRequest(vscode_languageclient_1.ExecuteCommandRequest.type, params);
            if (response === null) {
                return Promise.resolve([]);
            }
            const list = response.module_calls.map((m) => this.toModuleCall(m.name, m.source_addr, m.version, m.source_type, m.docs_link, this.svg, m.dependent_modules));
            return list;
        });
    }
    toModuleCall(name, sourceAddr, version, sourceType, docsLink, terraformIcon, dependents) {
        let deps = [];
        if (dependents.length !== 0) {
            deps = dependents.map((dp) => this.toModuleCall(dp.name, dp.source_addr, dp.version, dp.source_type, dp.docs_link, terraformIcon, dp.dependent_modules));
        }
        return new ModuleCallItem(name, sourceAddr, version, sourceType, docsLink, terraformIcon, deps);
    }
}
exports.ModuleCallsDataProvider = ModuleCallsDataProvider;
//# sourceMappingURL=moduleCalls.js.map