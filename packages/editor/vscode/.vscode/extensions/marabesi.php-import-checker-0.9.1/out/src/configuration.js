'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupConfiguration = exports.unusedNamespaceDecorationType = void 0;
const vscode_1 = require("vscode");
const hexRgb = require('hex-rgb');
exports.unusedNamespaceDecorationType = vscode_1.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(255,0,0, 0.5)',
    light: {
        borderColor: 'darkblue'
    },
    dark: {
        borderColor: 'lightblue'
    }
});
function setupConfiguration(configuration) {
    if (configuration && configuration.color) {
        try {
            const color = configuration.color;
            const currentColor = hexRgb(color);
            const newColor = `rgba(${currentColor.red}, ${currentColor.green}, ${currentColor.blue}, 0.5)`;
            console.log('new color highlight: ', newColor);
            return vscode_1.window.createTextEditorDecorationType({
                backgroundColor: newColor,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    return exports.unusedNamespaceDecorationType;
}
exports.setupConfiguration = setupConfiguration;
//# sourceMappingURL=configuration.js.map