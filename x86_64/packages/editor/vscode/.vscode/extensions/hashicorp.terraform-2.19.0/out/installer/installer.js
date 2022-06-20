"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installTerraformLS = void 0;
const path = require("path");
const vscode = require("vscode");
const detector_1 = require("./detector");
async function installTerraformLS(installPath, release, extensionVersion, vscodeVersion, reporter) {
    reporter.sendTelemetryEvent('installingLs', { terraformLsVersion: release.version });
    const zipfile = path.resolve(installPath, `terraform-ls_v${release.version}.zip`);
    const userAgent = `Terraform-VSCode/${extensionVersion} VSCode/${vscodeVersion}`;
    const os = getPlatform();
    const arch = getArch();
    const build = release.getBuild(os, arch);
    if (!build) {
        throw new Error(`Install error: no matching terraform-ls binary for ${os}/${arch}`);
    }
    // On brand new extension installs, there isn't a directory until we execute here
    // Create it if it doesn't exist so the downloader can unpack
    if ((await (0, detector_1.pathExists)(installPath)) === false) {
        await vscode.workspace.fs.createDirectory(vscode.Uri.file(installPath));
    }
    // Download and unpack async inside the VS Code notification window
    // This will show in the statusbar for the duration of the download and unpack
    // This was the most non-distuptive choice that still provided some status to the user
    return vscode.window.withProgress({
        cancellable: false,
        location: vscode.ProgressLocation.Window,
        title: 'Installing terraform-ls',
    }, async (progress) => {
        progress.report({ increment: 30 });
        await release.download(build.url, zipfile, userAgent);
        progress.report({ increment: 30 });
        await release.verify(zipfile, build.filename);
        progress.report({ increment: 20 });
        await release.unpack(installPath, zipfile);
        progress.report({ increment: 10 });
        return vscode.workspace.fs.delete(vscode.Uri.file(zipfile));
    });
}
exports.installTerraformLS = installTerraformLS;
function getPlatform() {
    const platform = process.platform.toString();
    if (platform === 'win32') {
        return 'windows';
    }
    if (platform === 'sunos') {
        return 'solaris';
    }
    return platform;
}
function getArch() {
    const arch = process.arch;
    if (arch === 'ia32') {
        return '386';
    }
    if (arch === 'x64') {
        return 'amd64';
    }
    return arch;
}
//# sourceMappingURL=installer.js.map