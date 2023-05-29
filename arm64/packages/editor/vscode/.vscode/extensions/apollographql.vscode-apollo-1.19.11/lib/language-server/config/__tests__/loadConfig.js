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
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const config_1 = require("../config");
const utilities_1 = require("../../utilities");
const makeNestedDir = (dir) => {
    if (fs.existsSync(dir))
        return;
    try {
        fs.mkdirSync(dir);
    }
    catch (err) {
        if (err.code == "ENOENT") {
            makeNestedDir(path.dirname(dir));
            makeNestedDir(dir);
        }
    }
};
const deleteFolderRecursive = (path) => {
    if (require("os").type().includes("Windows")) {
        return;
    }
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            }
            else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
const writeFilesToDir = (dir, files) => {
    Object.keys(files).forEach((key) => {
        if (key.includes("/"))
            makeNestedDir(path.dirname(key));
        fs.writeFileSync(`${dir}/${key}`, files[key]);
    });
};
describe("loadConfig", () => {
    let dir;
    let dirPath;
    beforeEach(() => {
        dir = fs.mkdtempSync("__tmp__");
        dirPath = `${process.cwd()}/${dir}`;
    });
    afterEach(() => {
        if (dir) {
            deleteFolderRecursive(dir);
        }
    });
    describe("finding files", () => {
        it("loads with client defaults from different dir", async () => {
            writeFilesToDir(dir, {
                "my.config.js": `
          module.exports = {
            client: {
              service: 'hello'
            }
          }
        `,
            });
            const config = await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
            });
            expect(config === null || config === void 0 ? void 0 : config.rawConfig).toMatchInlineSnapshot(`
        Object {
          "client": Object {
            "addTypename": true,
            "clientOnlyDirectives": Array [
              "connection",
              "type",
            ],
            "clientSchemaDirectives": Array [
              "client",
              "rest",
            ],
            "excludes": Array [
              "**/node_modules",
              "**/__tests__",
            ],
            "includes": Array [
              "src/**/*.{ts,tsx,js,jsx,graphql,gql}",
            ],
            "service": "hello",
            "statsWindow": Object {
              "from": -86400,
              "to": -0,
            },
            "tagName": "gql",
          },
          "engine": Object {
            "endpoint": "https://graphql.api.apollographql.com/api/graphql",
          },
        }
      `);
        });
        it("loads with service defaults from different dir", async () => {
            writeFilesToDir(dir, {
                "my.config.js": `
          module.exports = {
            service: {
              name: 'hello'
            }
          }
        `,
            });
            const config = await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
            });
            expect(config === null || config === void 0 ? void 0 : config.rawConfig).toMatchInlineSnapshot(`
        Object {
          "engine": Object {
            "endpoint": "https://graphql.api.apollographql.com/api/graphql",
          },
          "service": Object {
            "endpoint": Object {
              "url": "http://localhost:4000/graphql",
            },
            "excludes": Array [
              "**/node_modules",
              "**/__tests__",
            ],
            "includes": Array [
              "src/**/*.{ts,tsx,js,jsx,graphql,gql}",
            ],
            "name": "hello",
          },
        }
      `);
        });
        it("[deprecated] loads config from package.json", async () => {
            var _a;
            writeFilesToDir(dir, {
                "package.json": `{"apollo":{"client": {"service": "hello"}} }`,
            });
            const spy = jest.spyOn(console, "warn");
            spy.mockImplementationOnce(() => { });
            const config = await __1.loadConfig({ configPath: dirPath });
            spy.mockRestore();
            expect((_a = config === null || config === void 0 ? void 0 : config.client) === null || _a === void 0 ? void 0 : _a.service).toEqual("hello");
        });
        it("loads config from a ts file", async () => {
            var _a;
            writeFilesToDir(dir, {
                "apollo.config.ts": `module.exports = {"client": {"service": "hello"}`,
            });
            const config = await __1.loadConfig({ configPath: dirPath });
            expect((_a = config === null || config === void 0 ? void 0 : config.client) === null || _a === void 0 ? void 0 : _a.service).toEqual("hello");
        });
    });
    describe("errors", () => {
        it("throws when config file is empty", async () => {
            writeFilesToDir(dir, { "my.config.js": `` });
            const spy = jest.spyOn(console, "error");
            spy.mockImplementation();
            await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
            });
            expect(spy).toHaveBeenCalledWith(expect.stringMatching(/config file failed to load/i));
            spy.mockRestore();
        });
        it("throws when explorer.search fails", async () => {
            writeFilesToDir(dir, { "my.config.js": `* 98375^%*&^ its lit` });
            const spy = jest.spyOn(console, "error");
            spy.mockImplementation();
            await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
            });
            expect(spy).toHaveBeenCalledWith(expect.stringMatching(/config file failed to load/i));
            spy.mockRestore();
        });
        it("issues a deprecation warning when loading config from package.json", async () => {
            const spy = jest.spyOn(console, "warn");
            spy.mockImplementation();
            writeFilesToDir(dir, {
                "package.json": `{"apollo":{"client": {"service": "hello"}} }`,
            });
            await __1.loadConfig({
                configPath: dirPath,
                configFileName: "package.json",
            });
            expect(spy).toHaveBeenCalledWith(expect.stringMatching(/The "apollo" package.json configuration/i));
            spy.mockRestore();
        });
        it("throws if a config file was expected but not found", async () => {
            const spy = jest.spyOn(console, "error");
            spy.mockImplementation();
            writeFilesToDir(dir, { "my.config.js": `module.exports = {}` });
            await __1.loadConfig({
                configFileName: "my.TYPO.js",
                requireConfig: true,
            });
            expect(spy).toHaveBeenCalledWith(expect.stringMatching(/no apollo config/i));
            spy.mockRestore();
        });
        it("throws if project type cant be resolved", async () => {
            const spy = jest.spyOn(console, "error");
            spy.mockImplementation();
            writeFilesToDir(dir, {
                "my.config.js": `module.exports = {}`,
            });
            await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
            });
            expect(spy).toHaveBeenCalledWith(expect.stringMatching(/unable to resolve/i));
            spy.mockRestore();
        });
    });
    describe("env loading", () => {
        it("finds .env in config path & parses for key", async () => {
            var _a;
            writeFilesToDir(dir, {
                "my.config.js": `module.exports = { client: { name: 'hello' } }`,
                ".env": `APOLLO_KEY=service:harambe:54378950jn`,
            });
            const config = await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
            });
            expect((_a = config === null || config === void 0 ? void 0 : config.client) === null || _a === void 0 ? void 0 : _a.service).toEqual("harambe");
        });
        it("finds .env.local in config path & parses for key", async () => {
            var _a;
            writeFilesToDir(dir, {
                "my.config.js": `module.exports = { client: { name: 'hello' } }`,
                ".env.local": `APOLLO_KEY=service:harambe:54378950jn`,
            });
            const config = await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
            });
            expect((_a = config === null || config === void 0 ? void 0 : config.client) === null || _a === void 0 ? void 0 : _a.service).toEqual("harambe");
        });
        it("finds .env and .env.local in config path & parses for key, preferring .env.local", async () => {
            var _a;
            writeFilesToDir(dir, {
                "my.config.js": `module.exports = { client: { name: 'hello' } }`,
                ".env": `APOLLO_KEY=service:hamato:54378950jn`,
                ".env.local": `APOLLO_KEY=service:yoshi:65489061ko`,
            });
            const config = await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
            });
            expect((_a = config === null || config === void 0 ? void 0 : config.client) === null || _a === void 0 ? void 0 : _a.service).toEqual("yoshi");
        });
        it("Allows setting ENGINE_API_KEY with a deprecation warning", async () => {
            var _a;
            writeFilesToDir(dir, {
                "my.config.js": `module.exports = { client: { name: 'hello' } }`,
                ".env.local": `ENGINE_API_KEY=service:yoshi:65489061ko`,
            });
            const spy = jest.spyOn(utilities_1.Debug, "warning");
            const config = await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
            });
            expect((_a = config === null || config === void 0 ? void 0 : config.client) === null || _a === void 0 ? void 0 : _a.service).toEqual("yoshi");
            expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Deprecation warning/i));
        });
        it("Uses new key when .env defined both legacy and new key", async () => {
            writeFilesToDir(dir, {
                "my.config.js": `module.exports = { client: { name: 'hello' } }`,
                ".env.local": `ENGINE_API_KEY=service:yoshi:65489061ko\nAPOLLO_KEY=service:yoshi:65489061ko`,
            });
            const spy = jest.spyOn(utilities_1.Debug, "warning");
            const config = await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
            });
            expect(config === null || config === void 0 ? void 0 : config.engine.apiKey).toEqual("service:yoshi:65489061ko");
            expect(spy).toHaveBeenCalledWith(expect.stringMatching(/Both ENGINE_API_KEY and APOLLO_KEY were found/i));
        });
        xit("finds .env in cwd & parses for key", async () => {
            var _a;
            writeFilesToDir(dir, {
                "dir/my.config.js": `module.exports = { client: { name: 'hello' } }`,
                ".env": `APOLLO_KEY=service:harambe:54378950jn`,
            });
            process.chdir(dir);
            const config = await __1.loadConfig({
                configPath: "dir/",
                configFileName: "my.config.js",
            });
            process.chdir("../");
            expect((_a = config === null || config === void 0 ? void 0 : config.client) === null || _a === void 0 ? void 0 : _a.service).toEqual("harambe");
        });
    });
    describe("project type", () => {
        it("uses passed in type when config doesnt have client/service", async () => {
            writeFilesToDir(dir, {
                "my.config.js": `module.exports = { engine: { endpoint: 'http://a.a' } }`,
            });
            const config = await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
                type: "client",
            });
            expect(config === null || config === void 0 ? void 0 : config.isClient).toEqual(true);
        });
        it("infers client projects from config", async () => {
            writeFilesToDir(dir, {
                "my.config.js": `module.exports = { client: { service: 'hello' } }`,
            });
            const config = await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
            });
            expect(config === null || config === void 0 ? void 0 : config.isClient).toEqual(true);
        });
        it("infers service projects from config", async () => {
            writeFilesToDir(dir, {
                "my.config.js": `module.exports = { service: 'wow' }`,
            });
            const config = await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
            });
            expect(config === null || config === void 0 ? void 0 : config.isService).toEqual(true);
        });
    });
    describe("service name", () => {
        it("lets config service name take precedence for client project", async () => {
            var _a;
            writeFilesToDir(dir, {
                "my.config.js": `module.exports = { client: { service: 'hello' } }`,
                ".env": `APOLLO_KEY=service:harambe:54378950jn`,
            });
            const config = await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
                name: "not-it",
            });
            expect((_a = config === null || config === void 0 ? void 0 : config.client) === null || _a === void 0 ? void 0 : _a.service).toEqual("hello");
        });
        it("lets name passed in take precedence over env var", async () => {
            var _a;
            writeFilesToDir(dir, {
                "my.config.js": `module.exports = { client: {  } }`,
                ".env": `APOLLO_KEY=service:harambe:54378950jn`,
            });
            const config = await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
                name: "hello",
            });
            expect((_a = config === null || config === void 0 ? void 0 : config.client) === null || _a === void 0 ? void 0 : _a.service).toEqual("hello");
        });
        it("uses env var to determine service name when no other options", async () => {
            var _a;
            writeFilesToDir(dir, {
                "my.config.js": `module.exports = { client: {  } }`,
                ".env": `APOLLO_KEY=service:harambe:54378950jn`,
            });
            const config = await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
            });
            expect((_a = config === null || config === void 0 ? void 0 : config.client) === null || _a === void 0 ? void 0 : _a.service).toEqual("harambe");
        });
    });
    describe("default merging", () => {
        it("merges service name and default config for client projects", async () => {
            var _a, _b;
            writeFilesToDir(dir, {
                "my.config.js": `module.exports = { client: { service: 'hello' } }`,
            });
            const config = await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
            });
            expect((_b = (_a = config === null || config === void 0 ? void 0 : config.rawConfig) === null || _a === void 0 ? void 0 : _a.client) === null || _b === void 0 ? void 0 : _b.includes).toEqual(config_1.DefaultClientConfig.includes);
        });
        it("merges service name and default config for service projects", async () => {
            var _a, _b;
            writeFilesToDir(dir, {
                "my.config.js": `module.exports = { service: { name: 'wow' } }`,
            });
            const config = await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
            });
            expect((_b = (_a = config === null || config === void 0 ? void 0 : config.rawConfig) === null || _a === void 0 ? void 0 : _a.service) === null || _b === void 0 ? void 0 : _b.includes).toEqual(config_1.DefaultServiceConfig.includes);
        });
        it("merges engine config defaults", async () => {
            var _a, _b;
            writeFilesToDir(dir, {
                "my.config.js": `module.exports = { client: { service: 'wow' } }`,
            });
            const config = await __1.loadConfig({
                configPath: dirPath,
                configFileName: "my.config.js",
            });
            expect((_b = (_a = config === null || config === void 0 ? void 0 : config.rawConfig) === null || _a === void 0 ? void 0 : _a.engine) === null || _b === void 0 ? void 0 : _b.endpoint).toEqual(config_1.DefaultEngineConfig.endpoint);
        });
    });
});
//# sourceMappingURL=loadConfig.js.map