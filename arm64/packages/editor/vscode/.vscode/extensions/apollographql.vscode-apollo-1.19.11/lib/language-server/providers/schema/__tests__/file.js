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
const file_1 = require("../file");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const utilities_1 = require("../../../utilities");
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
describe("FileSchemaProvider", () => {
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
    describe("resolveFederatedServiceSDL", () => {
        it("finds and loads sdl from graphql file for a federated service", async () => {
            writeFilesToDir(dir, {
                "schema.graphql": `
          extend type Query {
            myProduct: Product
          }

          type Product @key(fields: "id") {
            id: ID
            sku: ID
            name: String
          }
        `,
            });
            const provider = new file_1.FileSchemaProvider({
                path: dir + "/schema.graphql",
            });
            const sdl = await provider.resolveFederatedServiceSDL();
            expect(sdl).toMatchInlineSnapshot;
        });
        it("finds and loads sdl from multiple graphql files for a federated service", async () => {
            writeFilesToDir(dir, {
                "schema.graphql": `
          extend type Query {
            myProduct: Product
          }

          type Product @key(fields: "id") {
            id: ID
            sku: ID
            name: String
          }`,
                "schema2.graphql": `
          extend type Product {
            weight: Float
          }`,
            });
            const provider = new file_1.FileSchemaProvider({
                paths: [dir + "/schema.graphql", dir + "/schema2.graphql"],
            });
            const sdl = await provider.resolveFederatedServiceSDL();
            expect(sdl).toMatchInlineSnapshot(`
        "type Product @key(fields: \\"id\\") {
          id: ID
          sku: ID
          name: String
          weight: Float
        }

        extend type Query {
          myProduct: Product
        }
        "
      `);
        });
        it("errors when sdl file is not a graphql file", async () => {
            const toWrite = `
        module.exports = \`
        extend type Query {
          myProduct: Product
        }

        type Product @key(fields: "id") {
          id: ID
          sku: ID
          name: string
        }\`
      `;
            writeFilesToDir(dir, {
                "schema.js": toWrite,
            });
            const errorSpy = jest.spyOn(utilities_1.Debug, "error");
            errorSpy.mockImplementation(() => { });
            const provider = new file_1.FileSchemaProvider({ path: dir + "/schema.js" });
            const sdl = await provider.resolveFederatedServiceSDL();
            expect(errorSpy).toBeCalledTimes(2);
        });
    });
});
//# sourceMappingURL=file.js.map