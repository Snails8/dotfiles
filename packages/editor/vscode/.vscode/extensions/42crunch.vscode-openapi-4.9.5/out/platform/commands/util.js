"use strict";
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
const vscode = __importStar(require("vscode"));
exports.default = (context, platformContext) => ({
    copyToClipboard: (value, message) => __awaiter(void 0, void 0, void 0, function* () {
        vscode.env.clipboard.writeText(value);
        const disposable = vscode.window.setStatusBarMessage(message);
        setTimeout(() => disposable.dispose(), 2000);
    }),
    openInWebUI: (node) => __awaiter(void 0, void 0, void 0, function* () {
        if ("getApiId" in node) {
            const apiId = node.getApiId();
            const uri = vscode.Uri.parse(platformContext.connection.platformUrl + `/apis/${apiId}`);
            vscode.env.openExternal(uri);
        }
        else if ("getCollectionId" in node) {
            const collectionId = node.getCollectionId();
            const uri = vscode.Uri.parse(platformContext.connection.platformUrl + `/collections/${collectionId}`);
            vscode.env.openExternal(uri);
        }
    }),
    updatePlatformCredentials: () => __awaiter(void 0, void 0, void 0, function* () {
        const platform = yield vscode.window.showInputBox({
            prompt: "Enter 42Crunch platform URL",
            placeHolder: "platform url",
            value: "https://platform.42crunch.com/",
            ignoreFocusOut: true,
            validateInput: (input) => {
                try {
                    const url = vscode.Uri.parse(input, true);
                    if (url.scheme !== "https") {
                        return 'URL scheme must be "https"';
                    }
                    if (!url.authority) {
                        return "URL authority must not be empty";
                    }
                    if (url.path != "/") {
                        return "URL path must be empty";
                    }
                }
                catch (ex) {
                    return `${ex}`;
                }
            },
        });
        if (platform === undefined) {
            return;
        }
        const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        const token = yield vscode.window.showInputBox({
            prompt: "Enter 42Crunch API token",
            placeHolder: "API Token",
            ignoreFocusOut: true,
            validateInput: (input) => {
                if (!input || !input.match(UUID_REGEX)) {
                    return "API Token must be a valid UUID";
                }
            },
        });
        if (token === undefined) {
            return;
        }
        const platformUrl = vscode.Uri.parse(platform).toString();
        platformContext.connection.platformUrl = platformUrl;
        platformContext.connection.apiToken = token;
        vscode.workspace
            .getConfiguration()
            .update("openapi.platformUrl", platformUrl, vscode.ConfigurationTarget.Global);
        yield context.secrets.store("platformApiToken", token);
        yield vscode.commands.executeCommand("setContext", "openapi.platform.credentials", "present");
    }),
});
//# sourceMappingURL=util.js.map