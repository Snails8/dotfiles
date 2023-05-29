"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileSet_1 = require("../fileSet");
const vscode_uri_1 = __importDefault(require("vscode-uri"));
describe("fileSet", () => {
    describe("includesFile", () => {
        it("matches includes starting with ./", () => {
            const fileSet = new fileSet_1.FileSet({
                excludes: [],
                includes: ["./src/**/*.tsx"],
                rootURI: vscode_uri_1.default.parse("/project"),
            });
            const file = "file:///project/src/Component.tsx";
            expect(fileSet.includesFile(file)).toBe(true);
        });
        it("matches includes not starting with ./", () => {
            const fileSet = new fileSet_1.FileSet({
                excludes: [],
                includes: ["src/**/*.tsx"],
                rootURI: vscode_uri_1.default.parse("/project"),
            });
            const file = "file:///project/src/Component.tsx";
            expect(fileSet.includesFile(file)).toBe(true);
        });
        it("does not match excludes starting with ./", () => {
            const fileSet = new fileSet_1.FileSet({
                excludes: ["./src/Component.tsx"],
                includes: ["./src/**/*.tsx"],
                rootURI: vscode_uri_1.default.parse("/project"),
            });
            const file = "file:///project/src/Component.tsx";
            expect(fileSet.includesFile(file)).toBe(false);
        });
        it("does not match excludes not starting with ./", () => {
            const fileSet = new fileSet_1.FileSet({
                excludes: ["src/Component.tsx"],
                includes: ["src/**/*.tsx"],
                rootURI: vscode_uri_1.default.parse("/project"),
            });
            const file = "file:///project/src/Component.tsx";
            expect(fileSet.includesFile(file)).toBe(false);
        });
    });
});
//# sourceMappingURL=fileSet.test.js.map