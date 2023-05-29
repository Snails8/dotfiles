"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLClientProject = exports.isClientProject = void 0;
const base_1 = require("./base");
const graphql_1 = require("graphql");
const vscode_languageserver_1 = require("vscode-languageserver");
const lz_string_1 = __importDefault(require("lz-string"));
const query_string_1 = require("query-string");
const source_1 = require("../utilities/source");
const format_1 = require("../format");
const defaultClientSchema_1 = require("./defaultClientSchema");
const graphql_2 = require("../utilities/graphql");
const validation_1 = require("../errors/validation");
const diagnostics_1 = require("../diagnostics");
const path_1 = require("path");
function schemaHasASTNodes(schema) {
    const queryType = schema && schema.getQueryType();
    return !!(queryType && queryType.astNode);
}
function augmentSchemaWithGeneratedSDLIfNeeded(schema) {
    if (schemaHasASTNodes(schema))
        return schema;
    const sdl = graphql_1.printSchema(schema);
    return graphql_1.buildSchema(new graphql_1.Source(sdl, `graphql-schema:/schema.graphql?${encodeURIComponent(sdl)}`));
}
function isClientProject(project) {
    return project instanceof GraphQLClientProject;
}
exports.isClientProject = isClientProject;
class GraphQLClientProject extends base_1.GraphQLProject {
    constructor({ config, loadingHandler, configFolderURI, clientIdentity, }) {
        super({ config, configFolderURI, loadingHandler, clientIdentity });
        this.serviceID = config.graph;
        const filterConfigAndEnvFiles = (path) => !(path.includes("apollo.config") ||
            path.includes(".env") ||
            (config.configURI && path === config.configURI.fsPath));
        if (this.allIncludedFiles().filter(filterConfigAndEnvFiles).length === 0) {
            console.warn("⚠️  It looks like there are 0 files associated with this Apollo Project. " +
                "This may be because you don't have any files yet, or your includes/excludes " +
                "fields are configured incorrectly, and Apollo can't find your files. " +
                "For help configuring Apollo projects, see this guide: https://go.apollo.dev/t/config");
        }
        const { validationRules } = this.config.client;
        if (typeof validationRules === "function") {
            this._validationRules = validation_1.defaultValidationRules.filter(validationRules);
        }
        else {
            this._validationRules = validationRules;
        }
        this.loadEngineData();
    }
    get displayName() {
        return this.config.graph || "Unnamed Project";
    }
    initialize() {
        return [this.scanAllIncludedFiles(), this.loadServiceSchema()];
    }
    getProjectStats() {
        const filterTypes = (type) => !/^__|Boolean|ID|Int|String|Float/.test(type);
        const serviceTypes = this.serviceSchema
            ? Object.keys(this.serviceSchema.getTypeMap()).filter(filterTypes).length
            : 0;
        const totalTypes = this.schema
            ? Object.keys(this.schema.getTypeMap()).filter(filterTypes).length
            : 0;
        return {
            type: "client",
            serviceId: this.serviceID,
            types: {
                service: serviceTypes,
                client: totalTypes - serviceTypes,
                total: totalTypes,
            },
            tag: this.config.variant,
            loaded: Boolean(this.schema || this.serviceSchema),
            lastFetch: this.lastLoadDate,
        };
    }
    onDecorations(handler) {
        this._onDecorations = handler;
    }
    onSchemaTags(handler) {
        this._onSchemaTags = handler;
    }
    async updateSchemaTag(tag) {
        await this.loadServiceSchema(tag);
        this.invalidate();
    }
    async loadServiceSchema(tag) {
        await this.loadingHandler.handle(`Loading schema for ${this.displayName}`, (async () => {
            this.serviceSchema = augmentSchemaWithGeneratedSDLIfNeeded(await this.schemaProvider.resolveSchema({
                tag: tag || this.config.variant,
                force: true,
            }));
            this.schema = graphql_1.extendSchema(this.serviceSchema, this.clientSchema);
        })());
    }
    async resolveSchema() {
        if (!this.schema)
            throw new Error();
        return this.schema;
    }
    get clientSchema() {
        return {
            kind: graphql_1.Kind.DOCUMENT,
            definitions: [
                ...this.typeSystemDefinitionsAndExtensions,
                ...this.missingApolloClientDirectives,
            ],
        };
    }
    get missingApolloClientDirectives() {
        const { serviceSchema } = this;
        const serviceDirectives = serviceSchema
            ? serviceSchema.getDirectives().map((directive) => directive.name)
            : [];
        const clientDirectives = this.typeSystemDefinitionsAndExtensions
            .filter(graphql_2.isDirectiveDefinitionNode)
            .map((def) => def.name.value);
        const existingDirectives = serviceDirectives.concat(clientDirectives);
        const apolloAst = defaultClientSchema_1.apolloClientSchemaDocument.ast;
        if (!apolloAst)
            return [];
        const apolloDirectives = apolloAst.definitions
            .filter(graphql_2.isDirectiveDefinitionNode)
            .map((def) => def.name.value);
        for (const existingDirective of existingDirectives) {
            if (apolloDirectives.includes(existingDirective)) {
                return [];
            }
        }
        return apolloAst.definitions;
    }
    addClientMetadataToSchemaNodes() {
        const { schema, serviceSchema } = this;
        if (!schema || !serviceSchema)
            return;
        graphql_1.visit(this.clientSchema, {
            ObjectTypeExtension(node) {
                const type = schema.getType(node.name.value);
                const { fields } = node;
                if (!fields || !type)
                    return;
                const localInfo = type.clientSchema || {};
                localInfo.localFields = [
                    ...(localInfo.localFields || []),
                    ...fields.map((field) => field.name.value),
                ];
                type.clientSchema = localInfo;
            },
        });
    }
    async validate() {
        if (!this._onDiagnostics)
            return;
        if (!this.serviceSchema)
            return;
        const diagnosticSet = new diagnostics_1.DiagnosticSet();
        try {
            this.schema = graphql_1.extendSchema(this.serviceSchema, this.clientSchema);
            this.addClientMetadataToSchemaNodes();
        }
        catch (error) {
            if (error instanceof graphql_1.GraphQLError) {
                const uri = error.source && error.source.name;
                if (uri) {
                    diagnosticSet.addDiagnostics(uri, diagnostics_1.diagnosticsFromError(error, vscode_languageserver_1.DiagnosticSeverity.Error, "Validation"));
                }
            }
            else {
                console.error(error);
            }
            this.schema = this.serviceSchema;
        }
        const fragments = this.fragments;
        for (const [uri, documentsForFile] of this.documentsByFile) {
            for (const document of documentsForFile) {
                diagnosticSet.addDiagnostics(uri, diagnostics_1.collectExecutableDefinitionDiagnositics(this.schema, document, fragments, this._validationRules));
            }
        }
        for (const [uri, diagnostics] of diagnosticSet.entries()) {
            this._onDiagnostics({ uri, diagnostics });
        }
        this.diagnosticSet = diagnosticSet;
        this.generateDecorations();
    }
    async loadEngineData() {
        const engineClient = this.engineClient;
        if (!engineClient)
            return;
        const serviceID = this.serviceID;
        await this.loadingHandler.handle(`Loading Apollo data for ${this.displayName}`, (async () => {
            try {
                if (serviceID) {
                    const { schemaTags, fieldLatenciesMS } = await engineClient.loadSchemaTagsAndFieldLatencies(serviceID);
                    this._onSchemaTags && this._onSchemaTags([serviceID, schemaTags]);
                    this.fieldLatenciesMS = fieldLatenciesMS;
                }
                const frontendUrlRoot = await engineClient.loadFrontendUrlRoot();
                this.frontendUrlRoot = frontendUrlRoot;
                this.lastLoadDate = +new Date();
                this.generateDecorations();
            }
            catch (e) {
                console.error(e);
            }
        })());
    }
    generateDecorations() {
        if (!this._onDecorations)
            return;
        if (!this.schema)
            return;
        const decorations = [];
        for (const [uri, queryDocumentsForFile] of this.documentsByFile) {
            for (const queryDocument of queryDocumentsForFile) {
                if (queryDocument.ast) {
                    const fieldLatenciesMS = this.fieldLatenciesMS;
                    const typeInfo = new graphql_1.TypeInfo(this.schema);
                    graphql_1.visit(queryDocument.ast, graphql_1.visitWithTypeInfo(typeInfo, {
                        enter: (node) => {
                            var _a;
                            if (node.kind == "Field" &&
                                typeInfo.getParentType() &&
                                fieldLatenciesMS) {
                                const parentName = typeInfo.getParentType().name;
                                const parentEngineStatMS = fieldLatenciesMS.get(parentName);
                                const engineStatMS = parentEngineStatMS
                                    ? parentEngineStatMS.get(node.name.value)
                                    : undefined;
                                if (engineStatMS && engineStatMS > 1) {
                                    decorations.push({
                                        type: "text",
                                        document: uri,
                                        message: `~${format_1.formatMS(engineStatMS, 0)}`,
                                        range: source_1.rangeForASTNode(node),
                                    });
                                }
                            }
                            else if (node.kind == "OperationDefinition") {
                                const operationWithFragments = this.getOperationWithFragments(node);
                                const document = operationWithFragments
                                    .map(graphql_1.print)
                                    .join("\n\n");
                                const explorerURLState = lz_string_1.default.compressToEncodedURIComponent(JSON.stringify({ document }));
                                const frontendUrlRoot = (_a = this.frontendUrlRoot) !== null && _a !== void 0 ? _a : "https://studio.apollographql.com";
                                const variant = this.config.variant;
                                const graphId = this.config.graph;
                                const { client, service } = this.config;
                                const remoteServiceConfig = typeof client.service === "object" &&
                                    "url" in client.service
                                    ? client.service
                                    : service === null || service === void 0 ? void 0 : service.endpoint;
                                const endpoint = remoteServiceConfig === null || remoteServiceConfig === void 0 ? void 0 : remoteServiceConfig.url;
                                const runInExplorerPath = graphId
                                    ? query_string_1.stringifyUrl({
                                        url: `/graph/${graphId}/explorer`,
                                        query: {
                                            variant,
                                            explorerURLState,
                                            referrer: "vscode",
                                        },
                                    })
                                    : query_string_1.stringifyUrl({
                                        url: "/sandbox/explorer",
                                        query: {
                                            endpoint,
                                            explorerURLState,
                                            referrer: "vscode",
                                        },
                                    });
                                const runInExplorerLink = path_1.join(frontendUrlRoot, runInExplorerPath);
                                decorations.push({
                                    type: "runGlyph",
                                    document: uri,
                                    range: source_1.rangeForASTNode(node),
                                    hoverMessage: `[Run in Studio](${runInExplorerLink})`,
                                });
                            }
                        },
                    }));
                }
            }
        }
        this._onDecorations(decorations);
    }
    get fragments() {
        const fragments = Object.create(null);
        for (const document of this.documents) {
            if (!document.ast)
                continue;
            for (const definition of document.ast.definitions) {
                if (definition.kind === graphql_1.Kind.FRAGMENT_DEFINITION) {
                    fragments[definition.name.value] = definition;
                }
            }
        }
        return fragments;
    }
    get operations() {
        const operations = Object.create(null);
        for (const document of this.documents) {
            if (!document.ast)
                continue;
            for (const definition of document.ast.definitions) {
                if (definition.kind === graphql_1.Kind.OPERATION_DEFINITION) {
                    if (!definition.name) {
                        throw new graphql_1.GraphQLError("Apollo does not support anonymous operations", [definition]);
                    }
                    operations[definition.name.value] = definition;
                }
            }
        }
        return operations;
    }
    get mergedOperationsAndFragments() {
        return graphql_1.separateOperations({
            kind: graphql_1.Kind.DOCUMENT,
            definitions: [
                ...Object.values(this.fragments),
                ...Object.values(this.operations),
            ],
        });
    }
    get mergedOperationsAndFragmentsForService() {
        const { clientOnlyDirectives, clientSchemaDirectives, addTypename } = this.config.client;
        const current = this.mergedOperationsAndFragments;
        if ((!clientOnlyDirectives || !clientOnlyDirectives.length) &&
            (!clientSchemaDirectives || !clientSchemaDirectives.length))
            return current;
        const filtered = Object.create(null);
        for (const operationName in current) {
            const document = current[operationName];
            let serviceOnly = graphql_2.removeDirectiveAnnotatedFields(graphql_2.removeDirectives(document, clientOnlyDirectives), clientSchemaDirectives);
            if (addTypename)
                serviceOnly = graphql_2.withTypenameFieldAddedWhereNeeded(serviceOnly);
            if (serviceOnly.definitions.filter(Boolean).length) {
                filtered[operationName] = serviceOnly;
            }
        }
        return filtered;
    }
    getOperationFieldsFromFieldDefinition(fieldName, parent) {
        if (!this.schema || !parent)
            return [];
        const fields = [];
        const typeInfo = new graphql_1.TypeInfo(this.schema);
        for (const document of this.documents) {
            if (!document.ast)
                continue;
            graphql_1.visit(document.ast, graphql_1.visitWithTypeInfo(typeInfo, {
                Field(node) {
                    if (node.name.value !== fieldName)
                        return;
                    const parentType = typeInfo.getParentType();
                    if (parentType && parentType.name === parent.name.value) {
                        fields.push(node);
                    }
                    return;
                },
            }));
        }
        return fields;
    }
    fragmentSpreadsForFragment(fragmentName) {
        const fragmentSpreads = [];
        for (const document of this.documents) {
            if (!document.ast)
                continue;
            graphql_1.visit(document.ast, {
                FragmentSpread(node) {
                    if (node.name.value === fragmentName) {
                        fragmentSpreads.push(node);
                    }
                },
            });
        }
        return fragmentSpreads;
    }
    getOperationWithFragments(operationDefinition) {
        const fragments = this.fragments;
        const seenFragmentNames = new Set([]);
        const allDefinitions = [operationDefinition];
        const defintionsToSearch = [
            operationDefinition,
        ];
        let currentDefinition;
        while ((currentDefinition = defintionsToSearch.shift())) {
            graphql_1.visit(currentDefinition, {
                FragmentSpread(node) {
                    const fragmentName = node.name.value;
                    const fragment = fragments[fragmentName];
                    if (!seenFragmentNames.has(fragmentName) && fragment) {
                        defintionsToSearch.push(fragment);
                        allDefinitions.push(fragment);
                        seenFragmentNames.add(fragmentName);
                    }
                },
            });
        }
        return allDefinitions;
    }
}
exports.GraphQLClientProject = GraphQLClientProject;
//# sourceMappingURL=client.js.map