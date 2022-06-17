"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathExists = exports.getRequiredVersionRelease = exports.getLsVersion = exports.isValidVersionString = exports.DEFAULT_LS_VERSION = void 0;
const js_releases_1 = require("@hashicorp/js-releases");
const semver = require("semver");
const vscode = require("vscode");
const utils_1 = require("../utils");
exports.DEFAULT_LS_VERSION = 'latest';
function isValidVersionString(value) {
    return semver.validRange(value, { includePrerelease: true, loose: true }) !== null;
}
exports.isValidVersionString = isValidVersionString;
async function getLsVersion(binPath) {
    try {
        const jsonCmd = await (0, utils_1.exec)(binPath, ['version', '-json']);
        const jsonOutput = JSON.parse(jsonCmd.stdout);
        return jsonOutput.version;
    }
    catch (err) {
        // assume older version of LS which didn't have json flag
        // return undefined as regex matching isn't useful here
        // if it's old enough to not have the json version, we would be updating anyway
        return undefined;
    }
}
exports.getLsVersion = getLsVersion;
async function getRequiredVersionRelease(versionString, extensionVersion, vscodeVersion) {
    const userAgent = `Terraform-VSCode/${extensionVersion} VSCode/${vscodeVersion}`;
    // Take the user requested version and query the hashicorp release site
    try {
        const release = await (0, js_releases_1.getRelease)('terraform-ls', versionString, userAgent);
        console.log(`Found Terraform language server version ${release.version} which satisfies range '${versionString}'`);
        return release;
    }
    catch (err) {
        if (versionString === exports.DEFAULT_LS_VERSION) {
            throw err;
        }
        console.log(`Error while finding Terraform language server release which satisfies range '${versionString}' and will reattempt with '${exports.DEFAULT_LS_VERSION}': ${err}`);
        vscode.window.showWarningMessage(`No version matching ${versionString} found, searching for ${exports.DEFAULT_LS_VERSION} instead`);
    }
    // User supplied version is either invalid or a version could not satisfy the range requested
    // Attempt to find the latest release, as we need a LS to function
    const release = await (0, js_releases_1.getRelease)('terraform-ls', exports.DEFAULT_LS_VERSION, userAgent);
    console.log(`Found Default Terraform language server version ${release.version} which satisfies range '${exports.DEFAULT_LS_VERSION}'`);
    return release;
}
exports.getRequiredVersionRelease = getRequiredVersionRelease;
async function pathExists(filePath) {
    try {
        await vscode.workspace.fs.stat(vscode.Uri.file(filePath));
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.pathExists = pathExists;
//# sourceMappingURL=detector.js.map