"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleCallers = exports.updateTerraformStatusBar = exports.deactivate = exports.activate = exports.terraformStatus = void 0;
const vscode = require("vscode");
const vscode_extension_telemetry_1 = require("vscode-extension-telemetry");
const vscode_languageclient_1 = require("vscode-languageclient");
const vscode_uri_1 = require("vscode-uri");
const clientHandler_1 = require("./clientHandler");
const generateBugReport_1 = require("./commands/generateBugReport");
const detector_1 = require("./installer/detector");
const updater_1 = require("./installer/updater");
const moduleCalls_1 = require("./providers/moduleCalls");
const moduleProviders_1 = require("./providers/moduleProviders");
const serverPath_1 = require("./serverPath");
const utils_1 = require("./utils");
const vscodeUtils_1 = require("./vscodeUtils");
const brand = `HashiCorp Terraform`;
const outputChannel = vscode.window.createOutputChannel(brand);
let reporter;
let clientHandler;
const languageServerUpdater = new utils_1.SingleInstanceTimeout();
async function activate(context) {
    const manifest = context.extension.packageJSON;
    exports.terraformStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
    reporter = new vscode_extension_telemetry_1.default(context.extension.id, manifest.version, manifest.appInsightsKey);
    context.subscriptions.push(reporter);
    const lsPath = new serverPath_1.ServerPath(context);
    clientHandler = new clientHandler_1.ClientHandler(lsPath, outputChannel, reporter);
    // get rid of pre-2.0.0 settings
    if ((0, vscodeUtils_1.config)('terraform').has('languageServer.enabled')) {
        try {
            await (0, vscodeUtils_1.config)('terraform').update('languageServer', { enabled: undefined, external: true }, vscode.ConfigurationTarget.Global);
        }
        catch (err) {
            const error = err instanceof Error ? err.message : err;
            console.error(`Error trying to erase pre-2.0.0 settings: ${error}`);
        }
    }
    if ((0, vscodeUtils_1.config)('terraform').has('languageServer.requiredVersion')) {
        const langServerVer = (0, vscodeUtils_1.config)('terraform').get('languageServer.requiredVersion', detector_1.DEFAULT_LS_VERSION);
        if (!(0, detector_1.isValidVersionString)(langServerVer)) {
            vscode.window.showWarningMessage(`The Terraform Language Server Version string '${langServerVer}' is not a valid semantic version and will be ignored.`);
        }
    }
    // Subscriptions
    context.subscriptions.push(vscode.commands.registerCommand('terraform.enableLanguageServer', async () => {
        if (!enabled()) {
            const current = (0, vscodeUtils_1.config)('terraform').get('languageServer');
            await (0, vscodeUtils_1.config)('terraform').update('languageServer', Object.assign(current, { external: true }), vscode.ConfigurationTarget.Global);
        }
        await updateLanguageServer(manifest.version, lsPath);
        return clientHandler.startClient();
    }), vscode.commands.registerCommand('terraform.disableLanguageServer', async () => {
        if (enabled()) {
            const current = (0, vscodeUtils_1.config)('terraform').get('languageServer');
            await (0, vscodeUtils_1.config)('terraform').update('languageServer', Object.assign(current, { external: false }), vscode.ConfigurationTarget.Global);
        }
        languageServerUpdater.clear();
        return clientHandler.stopClient();
    }), vscode.commands.registerCommand('terraform.apply', async () => {
        await terraformCommand('apply', false);
    }), vscode.commands.registerCommand('terraform.init', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        const selected = await vscode.window.showOpenDialog({
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false,
            defaultUri: workspaceFolders ? workspaceFolders[0]?.uri : undefined,
            openLabel: 'Initialize',
        });
        const client = clientHandler.getClient();
        if (selected && client) {
            const moduleUri = selected[0];
            const requestParams = {
                command: `${client.commandPrefix}.terraform-ls.terraform.init`,
                arguments: [`uri=${moduleUri}`],
            };
            await execWorkspaceCommand(client.client, requestParams);
        }
    }), vscode.commands.registerCommand('terraform.initCurrent', async () => {
        await terraformCommand('init', true);
    }), vscode.commands.registerCommand('terraform.plan', async () => {
        await terraformCommand('plan', false);
    }), vscode.commands.registerCommand('terraform.validate', async () => {
        await terraformCommand('validate', true);
    }), new generateBugReport_1.GenerateBugReportCommand(context), vscode.window.registerTreeDataProvider('terraform.modules', new moduleCalls_1.ModuleCallsDataProvider(context, clientHandler)), vscode.window.registerTreeDataProvider('terraform.providers', new moduleProviders_1.ModuleProvidersDataProvider(context, clientHandler)), vscode.workspace.onDidChangeConfiguration(async (event) => {
        if (event.affectsConfiguration('terraform') || event.affectsConfiguration('terraform-ls')) {
            const reloadMsg = 'Reload VSCode window to apply language server changes';
            const selected = await vscode.window.showInformationMessage(reloadMsg, 'Reload');
            if (selected === 'Reload') {
                vscode.commands.executeCommand('workbench.action.reloadWindow');
            }
        }
    }), vscode.window.onDidChangeVisibleTextEditors(async (editors) => {
        const textEditor = editors.find((ed) => !!ed.viewColumn);
        if (textEditor?.document === undefined) {
            return;
        }
        if (!(0, vscodeUtils_1.isTerraformFile)(textEditor.document)) {
            return;
        }
        await updateTerraformStatusBar(textEditor.document.uri);
    }));
    if (enabled()) {
        try {
            await updateLanguageServer(manifest.version, lsPath);
            vscode.commands.executeCommand('setContext', 'terraform.showTreeViews', true);
        }
        catch (error) {
            if (error instanceof Error) {
                reporter.sendTelemetryException(error);
            }
        }
    }
}
exports.activate = activate;
async function deactivate() {
    if (clientHandler === undefined) {
        return;
    }
    return clientHandler.stopClient();
}
exports.deactivate = deactivate;
async function updateTerraformStatusBar(documentUri) {
    const client = clientHandler.getClient();
    if (client === undefined) {
        return;
    }
    const initSupported = clientHandler.clientSupportsCommand(`${client.commandPrefix}.terraform-ls.terraform.init`);
    if (!initSupported) {
        return;
    }
    try {
        const moduleUri = vscode_uri_1.Utils.dirname(documentUri);
        const response = await moduleCallers(moduleUri.toString());
        if (response.moduleCallers.length === 0) {
            const dirName = vscode_uri_1.Utils.basename(moduleUri);
            exports.terraformStatus.text = `$(refresh) ${dirName}`;
            exports.terraformStatus.color = new vscode.ThemeColor('statusBar.foreground');
            exports.terraformStatus.tooltip = `Click to run terraform init`;
            exports.terraformStatus.command = 'terraform.initCurrent';
            exports.terraformStatus.show();
        }
        else {
            exports.terraformStatus.hide();
            exports.terraformStatus.text = '';
        }
    }
    catch (err) {
        if (err instanceof Error) {
            vscode.window.showErrorMessage(err.message);
            reporter.sendTelemetryException(err);
        }
        exports.terraformStatus.hide();
    }
}
exports.updateTerraformStatusBar = updateTerraformStatusBar;
async function updateLanguageServer(extVersion, lsPath, scheduled = false) {
    if ((0, vscodeUtils_1.config)('extensions').get('autoCheckUpdates', true) === true) {
        console.log('Scheduling check for language server updates...');
        const hour = 1000 * 60 * 60;
        languageServerUpdater.timeout(function () {
            updateLanguageServer(extVersion, lsPath, true);
        }, 24 * hour);
    }
    if (lsPath.hasCustomBinPath()) {
        // skip install check if user has specified a custom path to the LS
        // with custom paths we *need* to start the lang client always
        await clientHandler.startClient();
        return;
    }
    try {
        await (0, updater_1.updateOrInstall)((0, vscodeUtils_1.config)('terraform').get('languageServer.requiredVersion', detector_1.DEFAULT_LS_VERSION), extVersion, vscode.version, lsPath, reporter);
        // On scheduled checks, we download to stg and do not replace prod path
        // So we *do not* need to stop or start the LS
        if (scheduled) {
            return;
        }
        // On fresh starts we *need* to start the lang client always
        await clientHandler.startClient();
    }
    catch (error) {
        console.log(error); // for test failure reporting
        if (error instanceof Error) {
            vscode.window.showErrorMessage(error instanceof Error ? error.message : error);
        }
        else if (typeof error === 'string') {
            vscode.window.showErrorMessage(error);
        }
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function execWorkspaceCommand(client, params) {
    reporter.sendTelemetryEvent('execWorkspaceCommand', { command: params.command });
    return client.sendRequest(vscode_languageclient_1.ExecuteCommandRequest.type, params);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function modulesCallersCommand(languageClient, moduleUri) {
    const requestParams = {
        command: `${languageClient.commandPrefix}.terraform-ls.module.callers`,
        arguments: [`uri=${moduleUri}`],
    };
    return execWorkspaceCommand(languageClient.client, requestParams);
}
async function moduleCallers(moduleUri) {
    const client = clientHandler.getClient();
    if (client === undefined) {
        return {
            version: 0,
            moduleCallers: [],
        };
    }
    const response = await modulesCallersCommand(client, moduleUri);
    const moduleCallers = response.callers;
    return { version: response.v, moduleCallers };
}
exports.moduleCallers = moduleCallers;
async function terraformCommand(command, languageServerExec = true) {
    const textEditor = (0, vscodeUtils_1.getActiveTextEditor)();
    if (textEditor) {
        const languageClient = clientHandler.getClient();
        const moduleUri = vscode_uri_1.Utils.dirname(textEditor.document.uri);
        const response = await moduleCallers(moduleUri.toString());
        let selectedModule;
        if (response.moduleCallers.length > 1) {
            const selected = await vscode.window.showQuickPick(response.moduleCallers.map((m) => m.uri), { canPickMany: false });
            if (!selected) {
                return;
            }
            selectedModule = selected;
        }
        else if (response.moduleCallers.length === 1) {
            selectedModule = response.moduleCallers[0].uri;
        }
        else {
            selectedModule = moduleUri.toString();
        }
        if (languageServerExec && languageClient) {
            const requestParams = {
                command: `${languageClient.commandPrefix}.terraform-ls.terraform.${command}`,
                arguments: [`uri=${selectedModule}`],
            };
            return execWorkspaceCommand(languageClient.client, requestParams);
        }
        else {
            const terminalName = `Terraform ${selectedModule}`;
            const moduleURI = vscode.Uri.parse(selectedModule);
            const terraformCommand = await vscode.window.showInputBox({
                value: `terraform ${command}`,
                prompt: `Run in ${selectedModule}`,
            });
            if (terraformCommand) {
                const terminal = vscode.window.terminals.find((t) => t.name === terminalName) ||
                    vscode.window.createTerminal({ name: `Terraform ${selectedModule}`, cwd: moduleURI });
                terminal.sendText(terraformCommand);
                terminal.show();
            }
            return;
        }
    }
    else {
        vscode.window.showWarningMessage(`Open a module then run terraform ${command} again`);
        return;
    }
}
function enabled() {
    return (0, vscodeUtils_1.config)('terraform').get('languageServer.external', false);
}
//# sourceMappingURL=extension.js.map