"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const vscode_uri_1 = __importDefault(require("vscode-uri"));
describe("ApolloConfig", () => {
    describe("confifDirURI", () => {
        it("properly parses dir paths for configDirURI", () => {
            var _a;
            const uri = vscode_uri_1.default.parse("/test/dir/name");
            const config = new __1.ApolloConfig({ service: Object.assign({ name: "hai" }, __1.DefaultConfigBase) }, uri);
            expect((_a = config.configDirURI) === null || _a === void 0 ? void 0 : _a.fsPath).toMatch(/\/test\/dir\/name|\\test\\dir\\name/);
        });
        it("properly parses filepaths for configDirURI", () => {
            var _a;
            const uri = vscode_uri_1.default.parse("/test/dir/name/apollo.config.js");
            const config = new __1.ApolloConfig({ service: Object.assign({ name: "hai" }, __1.DefaultConfigBase) }, uri);
            expect((_a = config.configDirURI) === null || _a === void 0 ? void 0 : _a.fsPath).toMatch(/\/test\/dir\/name|\\test\\dir\\name/);
        });
    });
    describe("projects", () => {
        it("creates a ClientConfig when client is present", () => {
            const rawConfig = {
                client: Object.assign({ service: "my-service" }, __1.DefaultConfigBase),
            };
            const config = new __1.ApolloConfig(rawConfig);
            const projects = config.projects;
            expect(projects).toHaveLength(1);
            expect(projects[0].isClient).toBeTruthy();
        });
        it("creates a ServiceConfig when service is present", () => {
            const rawConfig = {
                service: Object.assign({ name: "my-service" }, __1.DefaultConfigBase),
            };
            const config = new __1.ApolloConfig(rawConfig);
            const projects = config.projects;
            expect(projects).toHaveLength(1);
            expect(projects[0].isService).toBeTruthy();
        });
        it("creates multiple configs when both client and service are present", () => {
            const rawConfig = {
                client: Object.assign({ service: "my-service" }, __1.DefaultConfigBase),
                service: Object.assign({ name: "my-service" }, __1.DefaultConfigBase),
            };
            const config = new __1.ApolloConfig(rawConfig);
            const projects = config.projects;
            expect(projects).toHaveLength(2);
            expect(projects.find((c) => c.isClient)).toBeTruthy();
            expect(projects.find((c) => c.isService)).toBeTruthy();
        });
    });
    describe("variant", () => {
        it("gets default variant when none is set", () => {
            const config = new __1.ApolloConfig({
                client: Object.assign({ service: "hai" }, __1.DefaultConfigBase),
            });
            expect(config.variant).toEqual("current");
        });
        it("gets variant from service specifier", () => {
            const config = new __1.ApolloConfig({
                client: Object.assign({ service: "hai@master" }, __1.DefaultConfigBase),
            });
            expect(config.variant).toEqual("master");
        });
        it("can set and override variants", () => {
            const config = new __1.ApolloConfig({
                client: Object.assign({ service: "hai@master" }, __1.DefaultConfigBase),
            });
            config.variant = "new";
            expect(config.variant).toEqual("new");
        });
    });
    describe("setDefaults", () => {
        it("can override engine defaults", () => {
            const config = new __1.ApolloConfig({ client: Object.assign({}, __1.DefaultConfigBase) });
            const overrides = {
                engine: {
                    endpoint: "https://test.apollographql.com/api/graphql",
                },
            };
            config.setDefaults(overrides);
            expect(config.engine).toEqual(overrides.engine);
        });
        it("can override client defaults", () => {
            const config = new __1.ApolloConfig({ client: Object.assign({}, __1.DefaultConfigBase) });
            const overrides = {
                client: Object.assign({ name: "my-client", service: "my-service@master" }, __1.DefaultConfigBase),
            };
            config.setDefaults(overrides);
            expect(config.client).toEqual(overrides.client);
        });
        it("can override service defaults", () => {
            const config = new __1.ApolloConfig({ client: Object.assign({}, __1.DefaultConfigBase) });
            const overrides = {
                service: Object.assign({ name: "my-service", url: "localhost:9090" }, __1.DefaultConfigBase),
            };
            config.setDefaults(overrides);
            expect(config.service).toEqual(config.service);
        });
    });
});
//# sourceMappingURL=config.js.map