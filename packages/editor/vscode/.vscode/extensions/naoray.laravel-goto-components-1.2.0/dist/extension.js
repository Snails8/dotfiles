module.exports=(()=>{"use strict";var e={112:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.deactivate=t.activate=void 0;const o=n(549),r=n(969),a=n(326);t.activate=function(e){let t=o.languages.registerHoverProvider("blade",new r.default),n=o.languages.registerDocumentLinkProvider("blade",new a.default);e.subscriptions.push(t,n)},t.deactivate=function(){}},969:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=n(747),r=n(549),a=n(593);t.default=class{provideHover(e,t){var n;const i=r.workspace.getConfiguration("laravel_goto_components"),s=new RegExp(i.regex),u=e.getWordRangeAtPosition(t,s);if(!u)return;const l=e.getText(u),c=null===(n=r.workspace.getWorkspaceFolder(e.uri))||void 0===n?void 0:n.uri.fsPath;let d=a.nameToPath(l);if(!o.existsSync(c+d)&&(d=a.nameToIndexPath(l),!o.existsSync(c+d)))return;const p=`[${d}](${r.Uri.file(c+d)})`;return new r.Hover(new r.MarkdownString(`*${l}*: ${p}`))}}},326:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=n(747),r=n(549),a=n(593);t.default=class{provideDocumentLinks(e){var t;const n=[],i=r.workspace.getConfiguration("laravel_goto_components"),s=null===(t=r.workspace.getWorkspaceFolder(e.uri))||void 0===t?void 0:t.uri.fsPath,u=new RegExp(i.regex);let l=e.lineCount,c=0;for(;c<l;){let t=e.lineAt(c),i=t.text.match(u);if(null!==i)for(let e of i){let i=a.nameToPath(e);if(!o.existsSync(s+i)&&(i=a.nameToIndexPath(e),!o.existsSync(s+i)))continue;let u=new r.Position(t.lineNumber,t.text.indexOf(e)),l=u.translate(0,e.length),c=new r.DocumentLink(new r.Range(u,l),r.Uri.file(s+i));n.push(c)}c++}return n}}},593:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.nameToIndexPath=t.nameToPath=void 0,t.nameToPath=function(e){return`/resources/views/components/${e.replace(/\./g,"/")}.blade.php`},t.nameToIndexPath=function(e){return`/resources/views/components/${e.replace(/\./g,"/")}/index.blade.php`}},747:e=>{e.exports=require("fs")},549:e=>{e.exports=require("vscode")}},t={};return function n(o){if(t[o])return t[o].exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}(112)})();