"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
describe("getServiceFromKey", () => {
    it("returns undefined with no provided key", () => {
        expect(__1.getServiceFromKey()).toBeUndefined();
    });
    it("returns service name from service api key", () => {
        const key = "service:bob-123:489fhseo4";
        expect(__1.getServiceFromKey(key)).toEqual("bob-123");
    });
    it("returns nothing if key is not a service key", () => {
        const key = "not-a-service:bob-123:489fhseo4";
        expect(__1.getServiceFromKey(key)).toBeUndefined();
    });
    it("returns nothing if key is malformed", () => {
        const key = "service/bob-123:489fhseo4";
        expect(__1.getServiceFromKey(key)).toBeUndefined();
    });
});
describe("getServiceName", () => {
    describe("client config", () => {
        it("finds service name when client.service is a string", () => {
            const rawConfig = {
                client: Object.assign({ service: "my-service" }, __1.DefaultConfigBase),
            };
            expect(__1.getGraphIdFromConfig(rawConfig)).toEqual("my-service");
            const rawConfigWithTag = {
                client: Object.assign({ service: "my-service@master" }, __1.DefaultConfigBase),
            };
            expect(__1.getGraphIdFromConfig(rawConfigWithTag)).toEqual("my-service");
        });
        it("finds service name when client.service is an object", () => {
            const rawConfig = {
                client: Object.assign({ service: { name: "my-service", localSchemaFile: "./someFile" } }, __1.DefaultConfigBase),
            };
            expect(__1.getGraphIdFromConfig(rawConfig)).toEqual("my-service");
        });
    });
    describe("service config", () => {
        it("finds service name from raw service config", () => {
            const rawConfig = {
                service: Object.assign({ name: "my-service", localSchemaFile: "./someFile" }, __1.DefaultConfigBase),
            };
            expect(__1.getGraphIdFromConfig(rawConfig)).toEqual("my-service");
        });
    });
});
describe("isClientConfig", () => {
    it("identifies client config properly", () => {
        const config = new __1.ApolloConfig({
            client: Object.assign({ service: "hello" }, __1.DefaultConfigBase),
        });
        expect(__1.isClientConfig(config)).toBeTruthy();
    });
});
describe("isLocalServiceConfig", () => {
    it("properly identifies a client config that uses localSchemaFiles", () => {
        const clientServiceConfig = { name: "my-service", localSchemaFile: "okay" };
        expect(__1.isLocalServiceConfig(clientServiceConfig)).toBeTruthy();
    });
});
describe("isServiceConfig", () => {
    it("identifies service config properly", () => {
        const config = new __1.ApolloConfig({ service: Object.assign({}, __1.DefaultConfigBase) });
        expect(__1.isServiceConfig(config)).toBeTruthy();
    });
});
describe("parseServiceSpecifier", () => {
    it("parses service identifier for service id and tag properly", () => {
        const [id, tag] = __1.parseServiceSpecifier("my-service@master");
        expect(id).toEqual("my-service");
        expect(tag).toEqual("master");
        const [idFromSimpleName, tagFromSimpleName] = __1.parseServiceSpecifier("my-service");
        expect(idFromSimpleName).toEqual("my-service");
        expect(tagFromSimpleName).toBeUndefined();
    });
});
//# sourceMappingURL=utils.js.map