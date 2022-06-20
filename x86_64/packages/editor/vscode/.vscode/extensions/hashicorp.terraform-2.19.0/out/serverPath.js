"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerPath = exports.CUSTOM_BIN_PATH_OPTION_NAME = void 0;
const path = require("path");
const vscode = require("vscode");
const which = require("which");
const INSTALL_FOLDER_NAME = 'bin';
exports.CUSTOM_BIN_PATH_OPTION_NAME = 'languageServer.pathToBinary';
class ServerPath {
    constructor(context) {
        this.context = context;
        this.customBinPath = vscode.workspace.getConfiguration('terraform').get(exports.CUSTOM_BIN_PATH_OPTION_NAME);
    }
    installPath() {
        return path.join(this.context.globalStorageUri.fsPath, INSTALL_FOLDER_NAME);
    }
    stgInstallPath() {
        return path.join(this.context.globalStorageUri.fsPath, 'stg');
    }
    // legacyBinPath represents old location where LS was installed.
    // We only use it to ensure that old installations are removed
    // from there after LS is installed into the new path.
    legacyBinPath() {
        return path.resolve(this.context.asAbsolutePath('lsp'), this.binName());
    }
    hasCustomBinPath() {
        return !!this.customBinPath;
    }
    binPath() {
        if (this.customBinPath) {
            return this.customBinPath;
        }
        return path.resolve(this.installPath(), this.binName());
    }
    stgBinPath() {
        if (this.customBinPath) {
            return this.customBinPath;
        }
        return path.resolve(this.stgInstallPath(), this.binName());
    }
    binName() {
        if (this.customBinPath) {
            return path.basename(this.customBinPath);
        }
        if (process.platform === 'win32') {
            return 'terraform-ls.exe';
        }
        return 'terraform-ls';
    }
    async resolvedPathToBinary() {
        const pathToBinary = this.binPath();
        let cmd;
        try {
            if (path.isAbsolute(pathToBinary)) {
                await vscode.workspace.fs.stat(vscode.Uri.file(pathToBinary));
                cmd = pathToBinary;
            }
            else {
                cmd = which.sync(pathToBinary);
            }
            console.log(`Found server at ${cmd}`);
        }
        catch (err) {
            let extraHint = '';
            if (this.customBinPath) {
                extraHint = `. Check "${exports.CUSTOM_BIN_PATH_OPTION_NAME}" in your settings.`;
            }
            throw new Error(`Unable to launch language server: ${err instanceof Error ? err.message : err}${extraHint}`);
        }
        return cmd;
    }
}
exports.ServerPath = ServerPath;
//# sourceMappingURL=serverPath.js.map