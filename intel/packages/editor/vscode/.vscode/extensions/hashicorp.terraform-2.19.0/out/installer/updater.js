"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrInstall = void 0;
const semver = require("semver");
const vscode = require("vscode");
const vscodeUtils_1 = require("../vscodeUtils");
const detector_1 = require("./detector");
const installer_1 = require("./installer");
async function updateOrInstall(lsVersion, extensionVersion, vscodeVersion, lsPath, reporter) {
    const stgingExists = await (0, detector_1.pathExists)(lsPath.stgBinPath());
    if (stgingExists) {
        // LS was updated during the last run while user was using the extension
        // Do not check for updates here, as normal execution flow will handle decision logic later
        // Need to move stg path to prod path now and return normal execution
        await vscode.workspace.fs.rename(vscode.Uri.file(lsPath.stgBinPath()), vscode.Uri.file(lsPath.binPath()), {
            overwrite: true,
        });
        return;
    }
    // Silently default to latest if an invalid version string is passed.
    // Actually telling the user about a bad string is left to the main extension code instead of here
    const versionString = (0, detector_1.isValidVersionString)(lsVersion) ? lsVersion : detector_1.DEFAULT_LS_VERSION;
    const lsPresent = await (0, detector_1.pathExists)(lsPath.binPath());
    const autoUpdate = (0, vscodeUtils_1.config)('extensions').get('autoUpdate', true);
    if (lsPresent === true && autoUpdate === false) {
        // LS is present in prod path, but user does not want automatic updates
        // Return normal execution
        return;
    }
    // Get LS release information from hashicorp release site
    // Fall back to latest if not requested version not available
    let release;
    try {
        release = await (0, detector_1.getRequiredVersionRelease)(versionString, extensionVersion, vscodeVersion);
    }
    catch (err) {
        console.log(`Error while finding Terraform language server release which satisfies range '${versionString}': ${err}`);
        // if the releases site is inaccessible, report it and skip the install
        if (err instanceof Error) {
            reporter.sendTelemetryException(err);
        }
        return;
    }
    if (lsPresent === false) {
        // LS is not present, need to download now in order to function
        // Install directly to production path and return normal execution
        return (0, installer_1.installTerraformLS)(lsPath.installPath(), release, extensionVersion, vscodeVersion, reporter);
    }
    // We know there is an LS Present at this point, find out version if possible
    const installedVersion = await (0, detector_1.getLsVersion)(lsPath.binPath());
    if (installedVersion === undefined) {
        console.log(`Currently installed Terraform language server is version '${installedVersion}`);
        // ls is present but too old to tell us the version, so need to update now
        return (0, installer_1.installTerraformLS)(lsPath.installPath(), release, extensionVersion, vscodeVersion, reporter);
    }
    // We know there is an LS present and know the version, so decide whether to update or not
    console.log(`Currently installed Terraform language server is version '${installedVersion}`);
    reporter.sendTelemetryEvent('foundLsInstalled', { terraformLsVersion: installedVersion });
    // Already at the latest or specified version, no update needed
    // return to normal execution flow
    if (semver.eq(release.version, installedVersion, { includePrerelease: true })) {
        console.log(`Language server release is current: ${release.version}`);
        return;
    }
    // We used to prompt for decision here, but effectively downgrading or upgrading
    // are the same operation so log decision and update
    if (semver.gt(release.version, installedVersion, { includePrerelease: true })) {
        // Upgrade
        console.log(`A newer language server release is available: ${release.version}`);
    }
    else if (semver.lt(release.version, installedVersion, { includePrerelease: true })) {
        // Downgrade
        console.log(`An older language server release is available: ${release.version}`);
    }
    // Update indicated and user wants autoupdates, so update to latest or specified version
    return (0, installer_1.installTerraformLS)(lsPath.stgInstallPath(), release, extensionVersion, vscodeVersion, reporter);
}
exports.updateOrInstall = updateOrInstall;
//# sourceMappingURL=updater.js.map