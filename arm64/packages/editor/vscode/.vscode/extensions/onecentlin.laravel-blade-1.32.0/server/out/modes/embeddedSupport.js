/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentRegions = exports.CSS_STYLE_RULE = void 0;
var vscode_html_languageservice_1 = require("vscode-html-languageservice");
exports.CSS_STYLE_RULE = '__';
function getDocumentRegions(languageService, document) {
    var regions = [];
    var scanner = languageService.createScanner(document.getText());
    var lastTagName = '';
    var lastAttributeName = null;
    var languageIdFromType = undefined;
    var importedScripts = [];
    var token = scanner.scan();
    while (token !== vscode_html_languageservice_1.TokenType.EOS) {
        switch (token) {
            case vscode_html_languageservice_1.TokenType.StartTag:
                lastTagName = scanner.getTokenText();
                lastAttributeName = null;
                languageIdFromType = 'javascript';
                break;
            case vscode_html_languageservice_1.TokenType.Styles:
                regions.push({ languageId: 'css', start: scanner.getTokenOffset(), end: scanner.getTokenEnd() });
                break;
            case vscode_html_languageservice_1.TokenType.Script:
                regions.push({ languageId: languageIdFromType, start: scanner.getTokenOffset(), end: scanner.getTokenEnd() });
                break;
            case vscode_html_languageservice_1.TokenType.AttributeName:
                lastAttributeName = scanner.getTokenText();
                break;
            case vscode_html_languageservice_1.TokenType.AttributeValue:
                if (lastAttributeName === 'src' && lastTagName.toLowerCase() === 'script') {
                    var value = scanner.getTokenText();
                    if (value[0] === '\'' || value[0] === '"') {
                        value = value.substr(1, value.length - 1);
                    }
                    importedScripts.push(value);
                }
                else if (lastAttributeName === 'type' && lastTagName.toLowerCase() === 'script') {
                    if (/["'](module|(text|application)\/(java|ecma)script)["']/.test(scanner.getTokenText())) {
                        languageIdFromType = 'javascript';
                    }
                    else {
                        languageIdFromType = void 0;
                    }
                }
                else {
                    var attributeLanguageId = getAttributeLanguage(lastAttributeName);
                    if (attributeLanguageId) {
                        var start = scanner.getTokenOffset();
                        var end = scanner.getTokenEnd();
                        var firstChar = document.getText()[start];
                        if (firstChar === '\'' || firstChar === '"') {
                            start++;
                            end--;
                        }
                        regions.push({ languageId: attributeLanguageId, start: start, end: end, attributeValue: true });
                    }
                }
                lastAttributeName = null;
                break;
        }
        token = scanner.scan();
    }
    return {
        getLanguageRanges: function (range) { return getLanguageRanges(document, regions, range); },
        getEmbeddedDocument: function (languageId, ignoreAttributeValues) { return getEmbeddedDocument(document, regions, languageId, ignoreAttributeValues); },
        getLanguageAtPosition: function (position) { return getLanguageAtPosition(document, regions, position); },
        getLanguagesInDocument: function () { return getLanguagesInDocument(document, regions); },
        getImportedScripts: function () { return importedScripts; }
    };
}
exports.getDocumentRegions = getDocumentRegions;
function getLanguageRanges(document, regions, range) {
    var result = [];
    var currentPos = range ? range.start : vscode_html_languageservice_1.Position.create(0, 0);
    var currentOffset = range ? document.offsetAt(range.start) : 0;
    var endOffset = range ? document.offsetAt(range.end) : document.getText().length;
    for (var _i = 0, regions_1 = regions; _i < regions_1.length; _i++) {
        var region = regions_1[_i];
        if (region.end > currentOffset && region.start < endOffset) {
            var start = Math.max(region.start, currentOffset);
            var startPos = document.positionAt(start);
            if (currentOffset < region.start) {
                result.push({
                    start: currentPos,
                    end: startPos,
                    languageId: 'html'
                });
            }
            var end = Math.min(region.end, endOffset);
            var endPos = document.positionAt(end);
            if (end > region.start) {
                result.push({
                    start: startPos,
                    end: endPos,
                    languageId: region.languageId,
                    attributeValue: region.attributeValue
                });
            }
            currentOffset = end;
            currentPos = endPos;
        }
    }
    if (currentOffset < endOffset) {
        var endPos = range ? range.end : document.positionAt(endOffset);
        result.push({
            start: currentPos,
            end: endPos,
            languageId: 'html'
        });
    }
    return result;
}
function getLanguagesInDocument(document, regions) {
    var result = [];
    for (var _i = 0, regions_2 = regions; _i < regions_2.length; _i++) {
        var region = regions_2[_i];
        if (region.languageId && result.indexOf(region.languageId) === -1) {
            result.push(region.languageId);
            if (result.length === 3) {
                return result;
            }
        }
    }
    result.push('html');
    return result;
}
function getLanguageAtPosition(document, regions, position) {
    var offset = document.offsetAt(position);
    for (var _i = 0, regions_3 = regions; _i < regions_3.length; _i++) {
        var region = regions_3[_i];
        if (region.start <= offset) {
            if (offset <= region.end) {
                return region.languageId;
            }
        }
        else {
            break;
        }
    }
    return 'html';
}
function getEmbeddedDocument(document, contents, languageId, ignoreAttributeValues) {
    var currentPos = 0;
    var oldContent = document.getText();
    var result = '';
    var lastSuffix = '';
    for (var _i = 0, contents_1 = contents; _i < contents_1.length; _i++) {
        var c = contents_1[_i];
        if (c.languageId === languageId && (!ignoreAttributeValues || !c.attributeValue)) {
            result = substituteWithWhitespace(result, currentPos, c.start, oldContent, lastSuffix, getPrefix(c));
            result += oldContent.substring(c.start, c.end);
            currentPos = c.end;
            lastSuffix = getSuffix(c);
        }
    }
    result = substituteWithWhitespace(result, currentPos, oldContent.length, oldContent, lastSuffix, '');
    return vscode_html_languageservice_1.TextDocument.create(document.uri, languageId, document.version, result);
}
function getPrefix(c) {
    if (c.attributeValue) {
        switch (c.languageId) {
            case 'css': return exports.CSS_STYLE_RULE + '{';
        }
    }
    return '';
}
function getSuffix(c) {
    if (c.attributeValue) {
        switch (c.languageId) {
            case 'css': return '}';
            case 'javascript': return ';';
        }
    }
    return '';
}
function substituteWithWhitespace(result, start, end, oldContent, before, after) {
    var accumulatedWS = 0;
    result += before;
    for (var i = start + before.length; i < end; i++) {
        var ch = oldContent[i];
        if (ch === '\n' || ch === '\r') {
            // only write new lines, skip the whitespace
            accumulatedWS = 0;
            result += ch;
        }
        else {
            accumulatedWS++;
        }
    }
    result = append(result, ' ', accumulatedWS - after.length);
    result += after;
    return result;
}
function append(result, str, n) {
    while (n > 0) {
        if (n & 1) {
            result += str;
        }
        n >>= 1;
        str += str;
    }
    return result;
}
function getAttributeLanguage(attributeName) {
    var match = attributeName.match(/^(style)$|^(on\w+)$/i);
    if (!match) {
        return null;
    }
    return match[1] ? 'css' : 'javascript';
}
