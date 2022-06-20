"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowReferencesFeature = void 0;
const vscode = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const CLIENT_CMD_ID = 'client.showReferences';
const VSCODE_SHOW_REFERENCES = 'editor.action.showReferences';
class ShowReferencesFeature {
    constructor(_client) {
        this._client = _client;
        this.registeredCommands = [];
    }
    fillClientCapabilities(capabilities) {
        if (!capabilities['experimental']) {
            capabilities['experimental'] = {};
        }
        capabilities['experimental']['showReferencesCommandId'] = CLIENT_CMD_ID;
    }
    initialize(capabilities) {
        if (!capabilities.experimental?.referenceCountCodeLens) {
            return;
        }
        const showRefs = vscode.commands.registerCommand(CLIENT_CMD_ID, async (pos, refCtx) => {
            const client = this._client;
            const doc = vscode.window?.activeTextEditor?.document;
            if (!doc) {
                return;
            }
            const position = new vscode.Position(pos.line, pos.character);
            const context = { includeDeclaration: refCtx.includeDeclaration };
            const provider = client.getFeature(vscode_languageclient_1.ReferencesRequest.method).getProvider(doc);
            if (!provider) {
                return;
            }
            const tokenSource = new vscode.CancellationTokenSource();
            const locations = await provider.provideReferences(doc, position, context, tokenSource.token);
            await vscode.commands.executeCommand(VSCODE_SHOW_REFERENCES, doc.uri, position, locations);
        });
        this.registeredCommands.push(showRefs);
    }
    dispose() {
        this.registeredCommands.forEach(function (cmd, index, commands) {
            cmd.dispose();
            commands.splice(index, 1);
        });
    }
}
exports.ShowReferencesFeature = ShowReferencesFeature;
//# sourceMappingURL=showReferences.js.map