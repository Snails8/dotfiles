"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLServiceProject = exports.isServiceProject = void 0;
const base_1 = require("./base");
function isServiceProject(project) {
    return project instanceof GraphQLServiceProject;
}
exports.isServiceProject = isServiceProject;
class GraphQLServiceProject extends base_1.GraphQLProject {
    constructor({ clientIdentity, config, configFolderURI, loadingHandler, }) {
        super({ config, configFolderURI, loadingHandler, clientIdentity });
        this.config = config;
    }
    get displayName() {
        return this.config.graph || "Unnamed Project";
    }
    initialize() {
        return [];
    }
    validate() { }
    getProjectStats() {
        return { loaded: true, type: "service" };
    }
    resolveFederationInfo() {
        return this.schemaProvider.resolveFederatedServiceSDL();
    }
}
exports.GraphQLServiceProject = GraphQLServiceProject;
//# sourceMappingURL=service.js.map