import { CancellationToken, Position, Location, Range, CompletionItem, Hover, Definition, CodeLens, ReferenceContext, DocumentSymbol, SymbolInformation, CodeAction } from "vscode-languageserver";
import type { GraphQLWorkspace } from "./workspace";
import type { DocumentUri } from "./project/base";
import type { ProjectStats } from "src/messages";
export declare class GraphQLLanguageProvider {
    workspace: GraphQLWorkspace;
    constructor(workspace: GraphQLWorkspace);
    provideStats(uri?: DocumentUri): Promise<ProjectStats>;
    provideCompletionItems(uri: DocumentUri, position: Position, _token: CancellationToken): Promise<CompletionItem[]>;
    provideHover(uri: DocumentUri, position: Position, _token: CancellationToken): Promise<Hover | null>;
    provideDefinition(uri: DocumentUri, position: Position, _token: CancellationToken): Promise<Definition | null>;
    provideReferences(uri: DocumentUri, position: Position, _context: ReferenceContext, _token: CancellationToken): Promise<Location[] | null>;
    provideDocumentSymbol(uri: DocumentUri, _token: CancellationToken): Promise<DocumentSymbol[]>;
    provideWorkspaceSymbol(query: string, _token: CancellationToken): Promise<SymbolInformation[]>;
    provideCodeLenses(uri: DocumentUri, _token: CancellationToken): Promise<CodeLens[]>;
    provideCodeAction(uri: DocumentUri, range: Range, _token: CancellationToken): Promise<CodeAction[]>;
}
//# sourceMappingURL=languageProvider.d.ts.map