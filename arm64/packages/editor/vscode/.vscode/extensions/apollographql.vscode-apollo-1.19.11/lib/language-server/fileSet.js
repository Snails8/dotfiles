"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSet = void 0;
const minimatch_1 = __importDefault(require("minimatch"));
const glob_1 = __importDefault(require("glob"));
const tools_1 = require("../tools");
const utilities_1 = require("./utilities");
const path_1 = require("path");
class FileSet {
    constructor({ rootURI, includes, excludes, configURI, }) {
        tools_1.invariant(rootURI, `Must provide "rootURI".`);
        tools_1.invariant(includes, `Must provide "includes".`);
        tools_1.invariant(excludes, `Must provide "excludes".`);
        this.rootURI = rootURI;
        this.includes = includes;
        this.excludes = excludes;
    }
    includesFile(filePath) {
        const normalizedFilePath = utilities_1.normalizeURI(filePath);
        return (this.includes.some((include) => {
            return minimatch_1.default(normalizedFilePath, path_1.resolve(this.rootURI.fsPath, include));
        }) &&
            !this.excludes.some((exclude) => {
                return minimatch_1.default(normalizedFilePath, path_1.resolve(this.rootURI.fsPath, exclude));
            }));
    }
    allFiles() {
        const joinedIncludes = `{${this.includes.join(",")}}`;
        return glob_1.default
            .sync(joinedIncludes, {
            cwd: this.rootURI.fsPath,
            absolute: true,
            ignore: this.excludes,
        })
            .map(utilities_1.normalizeURI);
    }
}
exports.FileSet = FileSet;
//# sourceMappingURL=fileSet.js.map