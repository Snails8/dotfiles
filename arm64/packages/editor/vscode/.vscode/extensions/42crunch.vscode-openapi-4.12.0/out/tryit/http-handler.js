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
exports.executeHttpRequest = void 0;
const got_1 = __importDefault(require("got"));
const form_data_1 = __importDefault(require("form-data"));
function executeHttpRequest(payload) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const { url, method, headers, body, config } = payload;
        try {
            const response = yield (0, got_1.default)(url, {
                throwHttpErrors: false,
                method,
                body: restoreBody(body, getContentType(headers)),
                headers: Object.assign({}, headers),
                https: {
                    rejectUnauthorized: (_b = (_a = config === null || config === void 0 ? void 0 : config.https) === null || _a === void 0 ? void 0 : _a.rejectUnauthorized) !== null && _b !== void 0 ? _b : true,
                },
            });
            const responseHeaders = [];
            for (let i = 0; i < response.rawHeaders.length; i += 2) {
                responseHeaders.push([response.rawHeaders[i], response.rawHeaders[i + 1]]);
            }
            return {
                command: "showResponse",
                payload: {
                    statusCode: response.statusCode,
                    statusMessage: response.statusMessage,
                    body: response.body,
                    httpVersion: response.httpVersion,
                    headers: responseHeaders,
                },
            };
        }
        catch (e) {
            const { code, message } = e;
            const sslError = isSslError(code);
            return {
                command: "showError",
                payload: {
                    code,
                    message,
                    sslError,
                },
            };
        }
    });
}
exports.executeHttpRequest = executeHttpRequest;
function getContentType(headers) {
    for (const [key, value] of Object.entries(headers)) {
        const name = key.toLowerCase();
        if (name == "content-type") {
            return value;
        }
    }
}
function restoreBody(body, contentType) {
    if (body && contentType === "multipart/form-data") {
        const form = new form_data_1.default();
        for (const [key, value] of body) {
            form.append(key, value);
        }
        return form;
    }
    return body;
}
function isSslError(code) {
    const codes = [
        "UNABLE_TO_GET_ISSUER_CERT",
        "UNABLE_TO_GET_CRL",
        "UNABLE_TO_DECRYPT_CERT_SIGNATURE",
        "UNABLE_TO_DECRYPT_CRL_SIGNATURE",
        "UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY",
        "CERT_SIGNATURE_FAILURE",
        "CRL_SIGNATURE_FAILURE",
        "CERT_NOT_YET_VALID",
        "CERT_HAS_EXPIRED",
        "CRL_NOT_YET_VALID",
        "CRL_HAS_EXPIRED",
        "ERROR_IN_CERT_NOT_BEFORE_FIELD",
        "ERROR_IN_CERT_NOT_AFTER_FIELD",
        "ERROR_IN_CRL_LAST_UPDATE_FIELD",
        "ERROR_IN_CRL_NEXT_UPDATE_FIELD",
        "OUT_OF_MEM",
        "DEPTH_ZERO_SELF_SIGNED_CERT",
        "SELF_SIGNED_CERT_IN_CHAIN",
        "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
        "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
        "CERT_CHAIN_TOO_LONG",
        "CERT_REVOKED",
        "INVALID_CA",
        "PATH_LENGTH_EXCEEDED",
        "INVALID_PURPOSE",
        "CERT_UNTRUSTED",
        "CERT_REJECTED",
        "HOSTNAME_MISMATCH",
    ];
    return codes.includes(code);
}
//# sourceMappingURL=http-handler.js.map