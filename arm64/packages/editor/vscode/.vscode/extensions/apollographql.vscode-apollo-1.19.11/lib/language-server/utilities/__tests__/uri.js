"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uri_1 = require("../uri");
describe("Unix URIs", () => {
    const uriToMatchForUnix = "/test/myFile.js";
    it("handles /Users/me URIs", () => {
        const uri = "/test/myFile.js";
        const parsed = uri_1.normalizeURI(uri);
        expect(parsed).toEqual(uriToMatchForUnix);
    });
    it("handles \\Users\\me URIs", () => {
        const uri = "\\test\\myFile.js";
        const parsed = uri_1.normalizeURI(uri);
        expect(parsed).toEqual(uriToMatchForUnix);
    });
});
describe("Windows URIs", () => {
    const uriToMatchForWindows = "c:/test/myFile.js";
    it("handles file:///c%3A/ URIs", () => {
        const uri = "file:///c%3A/test/myFile.js";
        const parsed = uri_1.normalizeURI(uri);
        expect(parsed).toEqual(uriToMatchForWindows);
    });
    it("handles handles file:///c:/ URIs", () => {
        const uri = "file:///c:/test/myFile.js";
        const parsed = uri_1.normalizeURI(uri);
        expect(parsed).toEqual(uriToMatchForWindows);
    });
    it("handles c:/ URIs", () => {
        const uri = "c:/test/myFile.js";
        const parsed = uri_1.normalizeURI(uri);
        expect(parsed).toEqual(uriToMatchForWindows);
    });
    it("handles c:\\ URIs", () => {
        const uri = "c:\\test\\myFile.js";
        const parsed = uri_1.normalizeURI(uri);
        expect(parsed).toEqual(uriToMatchForWindows);
    });
});
//# sourceMappingURL=uri.js.map