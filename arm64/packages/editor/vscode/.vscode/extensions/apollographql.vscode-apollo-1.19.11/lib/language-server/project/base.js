"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLProject = void 0;
const path_1 = __importStar(require("path"));
const fs_1 = require("fs");
const vscode_uri_1 = __importDefault(require("vscode-uri"));
const graphql_1 = require("graphql");
const vscode_languageserver_1 = require("vscode-languageserver");
const document_1 = require("../document");
const fileSet_1 = require("../fileSet");
const config_1 = require("../config");
const schema_1 = require("../providers/schema");
const engine_1 = require("../engine");
const fileAssociations = {
    ".graphql": "graphql",
    ".gql": "graphql",
    ".js": "javascript",
    ".ts": "typescript",
    ".jsx": "javascriptreact",
    ".tsx": "typescriptreact",
    ".vue": "vue",
    ".svelte": "svelte",
    ".py": "python",
    ".rb": "ruby",
    ".dart": "dart",
    ".re": "reason",
    ".ex": "elixir",
    ".exs": "elixir",
};
class GraphQLProject {
    constructor({ config, configFolderURI, loadingHandler, clientIdentity, }) {
        this.needsValidation = false;
        this.documentsByFile = new Map();
        this.config = config;
        this.loadingHandler = loadingHandler;
        this.rootURI = config.configDirURI || configFolderURI;
        const { includes, excludes } = config.isClient
            ? config.client
            : config.service;
        const fileSet = new fileSet_1.FileSet({
            rootURI: this.rootURI,
            includes: [...includes, ".env", "apollo.config.js", "apollo.config.cjs"],
            excludes: [...excludes, ...this.getRelativeLocalSchemaFilePaths()],
            configURI: config.configURI,
        });
        this.fileSet = fileSet;
        this.schemaProvider = schema_1.schemaProviderFromConfig(config, clientIdentity);
        const { engine } = config;
        if (engine.apiKey) {
            this.engineClient = new engine_1.ApolloEngineClient(engine.apiKey, engine.endpoint, clientIdentity);
        }
        this._isReady = false;
        this.readyPromise = Promise.all(this.initialize())
            .then(() => {
            this._isReady = true;
        })
            .catch((error) => {
            console.error(error);
            this.loadingHandler.showError(`Error initializing Apollo GraphQL project "${this.displayName}": ${error}`);
        });
    }
    get isReady() {
        return this._isReady;
    }
    get engine() {
        if (!this.engineClient) {
            throw new Error(`Unable to find ${config_1.keyEnvVar}`);
        }
        return this.engineClient;
    }
    get whenReady() {
        return this.readyPromise;
    }
    updateConfig(config) {
        this.config = config;
        return this.initialize();
    }
    resolveSchema(config) {
        this.lastLoadDate = +new Date();
        return this.schemaProvider.resolveSchema(config);
    }
    resolveFederatedServiceSDL() {
        return this.schemaProvider.resolveFederatedServiceSDL();
    }
    onSchemaChange(handler) {
        this.lastLoadDate = +new Date();
        return this.schemaProvider.onSchemaChange(handler);
    }
    onDiagnostics(handler) {
        this._onDiagnostics = handler;
    }
    includesFile(uri) {
        return this.fileSet.includesFile(uri);
    }
    allIncludedFiles() {
        return this.fileSet.allFiles();
    }
    async scanAllIncludedFiles() {
        await this.loadingHandler.handle(`Loading queries for ${this.displayName}`, (async () => {
            for (const filePath of this.allIncludedFiles()) {
                const uri = vscode_uri_1.default.file(filePath).toString();
                if (this.documentsByFile.has(uri))
                    continue;
                this.fileDidChange(uri);
            }
        })());
    }
    fileDidChange(uri) {
        const filePath = vscode_uri_1.default.parse(uri).fsPath;
        const extension = path_1.extname(filePath);
        const languageId = fileAssociations[extension];
        if (!languageId)
            return;
        if (!fs_1.lstatSync(filePath).isFile())
            return;
        const contents = fs_1.readFileSync(filePath, "utf8");
        const document = vscode_languageserver_1.TextDocument.create(uri, languageId, -1, contents);
        this.documentDidChange(document);
    }
    fileWasDeleted(uri) {
        this.removeGraphQLDocumentsFor(uri);
        this.checkForDuplicateOperations();
    }
    documentDidChange(document) {
        const documents = document_1.extractGraphQLDocuments(document, this.config.client && this.config.client.tagName);
        if (documents) {
            this.documentsByFile.set(document.uri, documents);
            this.invalidate();
        }
        else {
            this.removeGraphQLDocumentsFor(document.uri);
        }
        this.checkForDuplicateOperations();
    }
    checkForDuplicateOperations() {
        const filePathForOperationName = {};
        for (const [fileUri, documentsForFile] of this.documentsByFile.entries()) {
            const filePath = vscode_uri_1.default.parse(fileUri).fsPath;
            for (const document of documentsForFile) {
                if (!document.ast)
                    continue;
                for (const definition of document.ast.definitions) {
                    if (definition.kind === graphql_1.Kind.OPERATION_DEFINITION &&
                        definition.name) {
                        const operationName = definition.name.value;
                        if (operationName in filePathForOperationName) {
                            const conflictingFilePath = filePathForOperationName[operationName];
                            throw new Error(`️️There are multiple definitions for the \`${definition.name.value}\` operation. Please fix all naming conflicts before continuing.\nConflicting definitions found at ${filePath} and ${conflictingFilePath}.`);
                        }
                        filePathForOperationName[operationName] = filePath;
                    }
                }
            }
        }
    }
    removeGraphQLDocumentsFor(uri) {
        if (this.documentsByFile.has(uri)) {
            this.documentsByFile.delete(uri);
            if (this._onDiagnostics) {
                this._onDiagnostics({ uri: uri, diagnostics: [] });
            }
            this.invalidate();
        }
    }
    invalidate() {
        if (!this.needsValidation && this.isReady) {
            setTimeout(() => {
                this.validateIfNeeded();
            }, 0);
            this.needsValidation = true;
        }
    }
    validateIfNeeded() {
        if (!this.needsValidation || !this.isReady)
            return;
        this.validate();
        this.needsValidation = false;
    }
    getRelativeLocalSchemaFilePaths() {
        const serviceConfig = config_1.isServiceConfig(this.config)
            ? this.config.service
            : config_1.isClientConfig(this.config) &&
                typeof this.config.client.service === "object" &&
                config_1.isLocalServiceConfig(this.config.client.service)
                ? this.config.client.service
                : undefined;
        const localSchemaFile = serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.localSchemaFile;
        return (localSchemaFile === undefined
            ? []
            : Array.isArray(localSchemaFile)
                ? localSchemaFile
                : [localSchemaFile]).map((filePath) => path_1.default.relative(this.rootURI.fsPath, path_1.default.join(process.cwd(), filePath)));
    }
    clearAllDiagnostics() {
        if (!this._onDiagnostics)
            return;
        for (const uri of this.documentsByFile.keys()) {
            this._onDiagnostics({ uri, diagnostics: [] });
        }
    }
    documentsAt(uri) {
        return this.documentsByFile.get(uri);
    }
    documentAt(uri, position) {
        const queryDocuments = this.documentsByFile.get(uri);
        if (!queryDocuments)
            return undefined;
        return queryDocuments.find((document) => document.containsPosition(position));
    }
    get documents() {
        const documents = [];
        for (const documentsForFile of this.documentsByFile.values()) {
            documents.push(...documentsForFile);
        }
        return documents;
    }
    get definitions() {
        const definitions = [];
        for (const document of this.documents) {
            if (!document.ast)
                continue;
            definitions.push(...document.ast.definitions);
        }
        return definitions;
    }
    definitionsAt(uri) {
        const documents = this.documentsAt(uri);
        if (!documents)
            return [];
        const definitions = [];
        for (const document of documents) {
            if (!document.ast)
                continue;
            definitions.push(...document.ast.definitions);
        }
        return definitions;
    }
    get typeSystemDefinitionsAndExtensions() {
        const definitionsAndExtensions = [];
        for (const document of this.documents) {
            if (!document.ast)
                continue;
            for (const definition of document.ast.definitions) {
                if (graphql_1.isTypeSystemDefinitionNode(definition) ||
                    graphql_1.isTypeSystemExtensionNode(definition)) {
                    definitionsAndExtensions.push(definition);
                }
            }
        }
        return definitionsAndExtensions;
    }
}
exports.GraphQLProject = GraphQLProject;
//# sourceMappingURL=base.js.map