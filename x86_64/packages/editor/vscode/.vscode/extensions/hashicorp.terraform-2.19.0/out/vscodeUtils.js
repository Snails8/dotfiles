"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortedWorkspaceFolders = exports.isTerraformFile = exports.getActiveTextEditor = exports.getWorkspaceFolder = exports.normalizeFolderName = exports.getFolderName = exports.config = void 0;
const vscode = require("vscode");
function config(section, scope) {
    return vscode.workspace.getConfiguration(section, scope);
}
exports.config = config;
function getFolderName(folder) {
    return normalizeFolderName(folder.uri.toString());
}
exports.getFolderName = getFolderName;
// Make sure that folder uris always end with a slash
function normalizeFolderName(folderName) {
    if (folderName.charAt(folderName.length - 1) !== '/') {
        folderName = folderName + '/';
    }
    return folderName;
}
exports.normalizeFolderName = normalizeFolderName;
function getWorkspaceFolder(folderName) {
    return vscode.workspace.getWorkspaceFolder(vscode.Uri.parse(folderName));
}
exports.getWorkspaceFolder = getWorkspaceFolder;
// getActiveTextEditor returns an active (visible and focused) TextEditor
// We intentionally do *not* use vscode.window.activeTextEditor here
// because it also contains Output panes which are considered editors
// see also https://github.com/microsoft/vscode/issues/58869
function getActiveTextEditor() {
    return vscode.window.visibleTextEditors.find((textEditor) => !!textEditor.viewColumn);
}
exports.getActiveTextEditor = getActiveTextEditor;
/*
  Detects whether this is a Terraform file we can perform operations on
 */
function isTerraformFile(document) {
    if (document === undefined) {
        return false;
    }
    if (document.isUntitled) {
        // Untitled files are files which haven't been saved yet, so we don't know if they
        // are terraform so we return false
        return false;
    }
    if (document.fileName.endsWith('tf')) {
        // For the purposes of this extension, anything with the tf file
        // extension is a Terraform file
        return true;
    }
    // be safe and default to false
    return false;
}
exports.isTerraformFile = isTerraformFile;
function sortedWorkspaceFolders() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
        return workspaceFolders
            .map((f) => getFolderName(f))
            .sort((a, b) => {
            return a.length - b.length;
        });
    }
    return [];
}
exports.sortedWorkspaceFolders = sortedWorkspaceFolders;
//# sourceMappingURL=vscodeUtils.js.map