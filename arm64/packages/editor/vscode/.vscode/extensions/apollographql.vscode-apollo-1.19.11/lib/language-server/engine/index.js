"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApolloEngineClient = exports.noServiceError = void 0;
const GraphQLDataSource_1 = require("./GraphQLDataSource");
const config_1 = require("../config");
const schemaTagsAndFieldStats_1 = require("./operations/schemaTagsAndFieldStats");
const frontendUrlRoot_1 = require("./operations/frontendUrlRoot");
function noServiceError(service, endpoint) {
    return `Could not find graph ${service ? service : ""} from Apollo at ${endpoint}. Please check your API key and graph ID`;
}
exports.noServiceError = noServiceError;
class ApolloEngineClient extends GraphQLDataSource_1.GraphQLDataSource {
    constructor(engineKey, engineEndpoint = config_1.DefaultEngineConfig.endpoint, clientIdentity) {
        super();
        this.engineKey = engineKey;
        this.clientIdentity = clientIdentity;
        this.baseURL = engineEndpoint;
    }
    willSendRequest(request) {
        if (!request.headers)
            request.headers = {};
        request.headers["x-api-key"] = this.engineKey;
        if (this.clientIdentity && this.clientIdentity.name) {
            request.headers["apollo-client-name"] = this.clientIdentity.name;
            request.headers["apollo-client-reference-id"] =
                this.clientIdentity.referenceID;
            request.headers["apollo-client-version"] = this.clientIdentity.version;
            return;
        }
        request.headers["apollo-client-name"] = "Apollo Language Server";
        request.headers["apollo-client-reference-id"] =
            "146d29c0-912c-46d3-b686-920e52586be6";
        request.headers["apollo-client-version"] =
            require("../../package.json").version;
    }
    async loadSchemaTagsAndFieldLatencies(serviceID) {
        const { data, errors } = await this.execute({
            query: schemaTagsAndFieldStats_1.SCHEMA_TAGS_AND_FIELD_STATS,
            variables: {
                id: serviceID,
            },
        });
        if (!(data && data.service && data.service.schemaTags) || errors) {
            throw new Error(errors
                ? errors.map((error) => error.message).join("\n")
                : "No service returned. Make sure your service name and API key match");
        }
        const schemaTags = data.service.schemaTags.map(({ tag }) => tag);
        const fieldLatenciesMS = new Map();
        data.service.stats.fieldLatencies.forEach((fieldLatency) => {
            const { parentType, fieldName } = fieldLatency.groupBy;
            if (!parentType || !fieldName) {
                return;
            }
            const fieldsMap = fieldLatenciesMS.get(parentType) ||
                fieldLatenciesMS.set(parentType, new Map()).get(parentType);
            fieldsMap.set(fieldName, fieldLatency.metrics.fieldHistogram.durationMs);
        });
        return { schemaTags, fieldLatenciesMS };
    }
    async loadFrontendUrlRoot() {
        const { data } = await this.execute({
            query: frontendUrlRoot_1.FRONTEND_URL_ROOT,
        });
        return data === null || data === void 0 ? void 0 : data.frontendUrlRoot;
    }
}
exports.ApolloEngineClient = ApolloEngineClient;
//# sourceMappingURL=index.js.map