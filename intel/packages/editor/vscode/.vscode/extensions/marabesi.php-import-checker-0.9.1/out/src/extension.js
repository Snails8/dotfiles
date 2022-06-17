/**
 * For further reference, this extension was based on the decorator-sample
 * available at https://github.com/Microsoft/vscode-extension-samples/blob/master/decorator-sample/src/extension.ts
 */
'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.findMatch = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const configuration_1 = require("./configuration");
const extractUnusedImports_1 = require("./core/extractUnusedImports");
let currentDecoration = configuration_1.unusedNamespaceDecorationType;
let ranges = [];
function fetchConfiguration() {
    return vscode.workspace.getConfiguration().get('php.import.highlight') || {};
}
function activate(context) {
    console.log('php-import-checker" is now active!');
    vscode.window.onDidChangeActiveTextEditor(() => {
        generateHighlighting(fetchConfiguration());
    }, null, context.subscriptions);
    vscode.workspace.onDidSaveTextDocument(() => {
        generateHighlighting(fetchConfiguration());
    }, null, context.subscriptions);
    vscode.workspace.onDidChangeConfiguration(e => {
        currentDecoration = (0, configuration_1.setupConfiguration)(fetchConfiguration());
    }, null, context.subscriptions);
    let disposable = vscode.commands.registerCommand('extension.php-import-checker', () => {
        generateHighlighting(fetchConfiguration());
    });
    context.subscriptions.push(disposable);
    currentDecoration = (0, configuration_1.setupConfiguration)(fetchConfiguration());
    generateHighlighting(fetchConfiguration());
}
exports.activate = activate;
function generateHighlighting(configuration) {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.languageId != 'php') {
        return;
    }
    console.log('Searching unused classes...');
    if (!editor) {
        return;
    }
    ranges = [];
    const text = editor.document.getText();
    resetDecorations(editor);
    findMatch(editor, text, configuration);
    highlightSelections(editor);
}
function findMatch(editor, text, configuration) {
    const matches = [];
    (0, extractUnusedImports_1.extractUnusedImports)(text, configuration).forEach(element => {
        const { match } = element;
        const startPos = editor.document.positionAt(match.index);
        const endPos = editor.document.positionAt(match.index + match[0].length);
        ranges.push(new vscode.Range(startPos, endPos));
        matches.push(element.match);
    });
    return matches;
}
exports.findMatch = findMatch;
function resetAllDecorations() {
    vscode.window.visibleTextEditors.forEach(textEditor => {
        resetDecorations(textEditor);
    });
}
function resetDecorations(textEditor) {
    highlightSelections(textEditor);
}
function highlightSelections(editor) {
    editor.setDecorations(currentDecoration, ranges);
}
function deactivate() {
    resetAllDecorations();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map