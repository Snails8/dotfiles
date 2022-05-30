"use strict";
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
exports.PlatformStore = exports.Filters = exports.Limits = void 0;
const api_1 = require("../api");
const COLLECTION_PAGE_SIZE = 100;
const APIS_PAGE_SIZE = 100;
class Limits {
    constructor() {
        this.collections = COLLECTION_PAGE_SIZE;
        this.apis = new Map();
        this.favorite = new Map();
    }
    getCollections() {
        return this.collections;
    }
    increaseCollections() {
        this.collections = this.collections + COLLECTION_PAGE_SIZE;
    }
    getApis(collectionId) {
        var _a;
        return (_a = this.apis.get(collectionId)) !== null && _a !== void 0 ? _a : APIS_PAGE_SIZE;
    }
    increaseApis(collectionId) {
        var _a;
        this.apis.set(collectionId, ((_a = this.apis.get(collectionId)) !== null && _a !== void 0 ? _a : APIS_PAGE_SIZE) + APIS_PAGE_SIZE);
    }
    getFavorite(collectionId) {
        var _a;
        return (_a = this.favorite.get(collectionId)) !== null && _a !== void 0 ? _a : APIS_PAGE_SIZE;
    }
    increaseFavorite(collectionId) {
        var _a;
        this.favorite.set(collectionId, ((_a = this.favorite.get(collectionId)) !== null && _a !== void 0 ? _a : APIS_PAGE_SIZE) + APIS_PAGE_SIZE);
    }
    reset() {
        this.collections = COLLECTION_PAGE_SIZE;
        this.apis = new Map();
        this.favorite = new Map();
    }
}
exports.Limits = Limits;
class Filters {
    constructor() {
        this.collection = undefined;
        this.api = new Map();
        this.favorite = new Map();
    }
}
exports.Filters = Filters;
class PlatformStore {
    constructor(context) {
        this.context = context;
        this.apiLastAssessment = new Map();
        this.limits = new Limits();
        this.filters = new Filters();
    }
    getCollectionNamingConvention() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, api_1.getCollectionNamingConvention)(this.context.connection, this.context.logger);
        });
    }
    getApiNamingConvention() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, api_1.getApiNamingConvention)(this.context.connection, this.context.logger);
        });
    }
    getCollections(filter, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, api_1.listCollections)(filter, this.context.connection, this.context.logger);
            const filtered = response.list.filter((collection) => {
                if (filter) {
                    return filter.name
                        ? collection.desc.name.toLowerCase().includes(filter.name.toLowerCase())
                        : true;
                }
                return true;
            });
            const hasMore = filtered.length > limit;
            return {
                hasMore,
                collections: filtered.slice(0, limit),
            };
        });
    }
    getAllCollections() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, api_1.listCollections)({ name: undefined, owner: "ALL" }, this.context.connection, this.context.logger);
            return response.list;
        });
    }
    createCollection(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield (0, api_1.createCollection)(name, this.context.connection, this.context.logger);
            return collection;
        });
    }
    collectionRename(collectionId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, api_1.collectionUpdate)(collectionId, name, this.context.connection, this.context.logger);
        });
    }
    apiRename(apiId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, api_1.updateApi)(apiId, { name }, this.context.connection, this.context.logger);
        });
    }
    createApi(collectionId, name, json) {
        return __awaiter(this, void 0, void 0, function* () {
            const api = yield (0, api_1.createApi)(collectionId, name, Buffer.from(json), this.context.connection, this.context.logger);
            return api;
        });
    }
    updateApi(apiId, content) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const api = yield (0, api_1.readApi)(apiId, this.context.connection, this.context.logger, false);
            const last = ((_a = api === null || api === void 0 ? void 0 : api.assessment) === null || _a === void 0 ? void 0 : _a.last) ? new Date(api.assessment.last) : new Date(0);
            this.apiLastAssessment.set(apiId, last);
            yield (0, api_1.updateApi)(apiId, { specfile: content }, this.context.connection, this.context.logger);
        });
    }
    deleteCollection(collectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, api_1.deleteCollection)(collectionId, this.context.connection, this.context.logger);
        });
    }
    deleteApi(apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, api_1.deleteApi)(apiId, this.context.connection, this.context.logger);
        });
    }
    getApis(collectionId, filter, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, api_1.listApis)(collectionId, this.context.connection, this.context.logger);
            const filtered = response.list.filter((api) => {
                if (filter) {
                    return filter.name ? api.desc.name.toLowerCase().includes(filter.name.toLowerCase()) : true;
                }
                return true;
            });
            const hasMore = filtered.length > limit;
            return {
                hasMore,
                apis: filtered.slice(0, limit),
            };
        });
    }
    getApi(apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            const api = yield (0, api_1.readApi)(apiId, this.context.connection, this.context.logger, true);
            return api;
        });
    }
    getCollection(collectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield (0, api_1.readCollection)(collectionId, this.context.connection, this.context.logger);
            return collection;
        });
    }
    getCollectionUsers(collectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield (0, api_1.readCollectionUsers)(collectionId, this.context.connection, this.context.logger);
            return collection;
        });
    }
    getAuditReport(apiId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const ASSESSMENT_MAX_WAIT = 60000;
            const ASSESSMENT_RETRY = 1000;
            const start = Date.now();
            let now = Date.now();
            const last = (_a = this.apiLastAssessment.get(apiId)) !== null && _a !== void 0 ? _a : new Date(0);
            while (now - start < ASSESSMENT_MAX_WAIT) {
                const api = yield (0, api_1.readApi)(apiId, this.context.connection, this.context.logger, false);
                const current = new Date(api.assessment.last);
                const ready = api.assessment.isProcessed && current.getTime() > last.getTime();
                if (ready) {
                    const report = yield (0, api_1.readAuditReport)(apiId, this.context.connection, this.context.logger);
                    return report;
                }
                yield delay(ASSESSMENT_RETRY);
                now = Date.now();
            }
            throw new Error(`Timed out while waiting for the assessment report for API ID: ${apiId}`);
        });
    }
    getScanReport(apiId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, api_1.readScanReport)(apiId, this.context.connection, this.context.logger);
        });
    }
    refresh() { }
}
exports.PlatformStore = PlatformStore;
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
//# sourceMappingURL=platform-store.js.map