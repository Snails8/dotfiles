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
exports.saveEnv = exports.loadEnv = void 0;
const ENV_DEFAULT_KEY = "openapi-42crunch.environment-default";
const ENV_SECRETS_KEY = "openapi-42crunch.environment-secrets";
function loadEnv(memento, secret) {
    return __awaiter(this, void 0, void 0, function* () {
        const defaultEnv = memento.get(ENV_DEFAULT_KEY, {});
        const secretsEnv = JSON.parse((yield secret.get(ENV_SECRETS_KEY)) || "{}");
        return { default: defaultEnv, secrets: secretsEnv };
    });
}
exports.loadEnv = loadEnv;
function saveEnv(memento, secret, env) {
    return __awaiter(this, void 0, void 0, function* () {
        if (env.name === "default") {
            memento.update(ENV_DEFAULT_KEY, env.environment);
        }
        else if (env.name === "secrets") {
            secret.store(ENV_SECRETS_KEY, JSON.stringify(env.environment));
        }
    });
}
exports.saveEnv = saveEnv;
//# sourceMappingURL=env.js.map