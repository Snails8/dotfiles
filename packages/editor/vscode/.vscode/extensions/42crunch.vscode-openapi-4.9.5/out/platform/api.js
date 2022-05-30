"use strict";
/*
 Copyright (c) 42Crunch Ltd. All rights reserved.
 Licensed under the GNU Affero General Public License version 3. See LICENSE.txt in the project root for license information.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollectionNamingConvention = exports.getApiNamingConvention = exports.deleteCollection = exports.createCollection = exports.collectionUpdate = exports.updateApi = exports.createApi = exports.deleteApi = exports.readScanReport = exports.readAuditReport = exports.readCollectionUsers = exports.readCollection = exports.readApi = exports.listApis = exports.listCollections = void 0;
const got_1 = __importDefault(require("got"));
function gotOptions(method, options, logger) {
    const logRequest = (response, retryWithMergedOptions) => {
        logger.debug(`${method} ${response.url} ${response.statusCode}`);
        return response;
    };
    return {
        method,
        prefixUrl: options.platformUrl,
        responseType: "json",
        headers: {
            Accept: "application/json",
            "X-API-KEY": options.apiToken,
        },
        hooks: {
            afterResponse: [logRequest],
        },
    };
}
function listCollections(filter, options, logger) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const listOption = (_a = filter === null || filter === void 0 ? void 0 : filter.owner) !== null && _a !== void 0 ? _a : "ALL";
            const { body } = yield (0, got_1.default)(`api/v2/collections?listOption=${listOption}&perPage=0`, gotOptions("GET", options, logger));
            return body;
        }
        catch (ex) {
            throw new Error("Unable to list collections, please check your 42Crunch credentials: " + ex.message);
        }
    });
}
exports.listCollections = listCollections;
function listApis(collectionId, options, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = yield (0, got_1.default)(`api/v1/collections/${collectionId}/apis?withTags=true&perPage=0`, gotOptions("GET", options, logger));
        return body;
    });
}
exports.listApis = listApis;
function readApi(apiId, options, logger, specfile) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = specfile ? { specfile: "true" } : {};
        const { body } = yield (0, got_1.default)(`api/v1/apis/${apiId}`, Object.assign(Object.assign({}, gotOptions("GET", options, logger)), { searchParams: params }));
        return body;
    });
}
exports.readApi = readApi;
function readCollection(collectionId, options, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = (yield (0, got_1.default)(`api/v1/collections/${collectionId}?readOwner=true`, gotOptions("GET", options, logger)));
        return body;
    });
}
exports.readCollection = readCollection;
function readCollectionUsers(collectionId, options, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = (yield (0, got_1.default)(`api/v1/collections/${collectionId}/users`, gotOptions("GET", options, logger)));
        return body;
    });
}
exports.readCollectionUsers = readCollectionUsers;
function readAuditReport(apiId, options, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = (yield (0, got_1.default)(`api/v1/apis/${apiId}/assessmentreport`, gotOptions("GET", options, logger)));
        const text = Buffer.from(body.data, "base64").toString("utf-8");
        return JSON.parse(text);
    });
}
exports.readAuditReport = readAuditReport;
function readScanReport(apiId, options, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = yield (0, got_1.default)(`api/v1/apis/${apiId}/scanreport`, Object.assign(Object.assign({}, gotOptions("GET", options, logger)), { searchParams: { medium: 1 } }));
        const text = Buffer.from(body.data, "base64").toString("utf-8");
        return JSON.parse(text);
    });
}
exports.readScanReport = readScanReport;
function deleteApi(apiId, options, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, got_1.default)(`api/v1/apis/${apiId}`, gotOptions("DELETE", options, logger));
    });
}
exports.deleteApi = deleteApi;
function createApi(collectionId, name, contents, options, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = yield (0, got_1.default)("api/v2/apis", Object.assign(Object.assign({}, gotOptions("POST", options, logger)), { json: {
                cid: collectionId,
                name,
                specfile: contents.toString("base64"),
            } }));
        return body;
    });
}
exports.createApi = createApi;
function updateApi(apiId, update, options, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const json = {};
        if (update.specfile) {
            json.specfile = update.specfile.toString("base64");
        }
        if (update.name) {
            json.name = update.name;
        }
        const { body } = yield (0, got_1.default)(`api/v1/apis/${apiId}`, Object.assign(Object.assign({}, gotOptions("PUT", options, logger)), { json }));
        return body;
    });
}
exports.updateApi = updateApi;
function collectionUpdate(collectionId, name, options, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = yield (0, got_1.default)(`api/v1/collections/${collectionId}`, Object.assign(Object.assign({}, gotOptions("PUT", options, logger)), { json: { name } }));
        return body;
    });
}
exports.collectionUpdate = collectionUpdate;
function createCollection(name, options, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = yield (0, got_1.default)("api/v1/collections", Object.assign(Object.assign({}, gotOptions("POST", options, logger)), { json: {
                name: name,
            } }));
        return body;
    });
}
exports.createCollection = createCollection;
function deleteCollection(collectionId, options, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, got_1.default)(`api/v1/collections/${collectionId}`, gotOptions("DELETE", options, logger));
    });
}
exports.deleteCollection = deleteCollection;
function getApiNamingConvention(options, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = yield (0, got_1.default)(`api/v1/organizations/me/settings/apiNamingConvention`, gotOptions("GET", options, logger));
        return body;
    });
}
exports.getApiNamingConvention = getApiNamingConvention;
function getCollectionNamingConvention(options, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = yield (0, got_1.default)(`api/v1/organizations/me/settings/collectionNamingConvention`, gotOptions("GET", options, logger));
        return body;
    });
}
exports.getCollectionNamingConvention = getCollectionNamingConvention;
//# sourceMappingURL=api.js.map