import type { LanguageClient as GenericLanguageClient, NotificationHandler, NotificationHandler0, NotificationType, NotificationType0, Range } from "vscode-languageclient";
import type { IConnection as GenericConnection } from "vscode-languageserver";
export interface TypeStats {
    service?: number;
    client?: number;
    total?: number;
}
export declare type ProjectStats = {
    type: string;
    loaded: true;
    serviceId?: string;
    types?: TypeStats;
    tag?: string;
    lastFetch?: number;
} | {
    loaded: false;
};
export declare type EngineDecoration = {
    type: "text";
    document: string;
    message: string;
    range: Range;
} | {
    type: "runGlyph";
    document: string;
    range: Range;
    hoverMessage: string;
};
declare type Messages = {
    "apollographql/statsLoaded": ProjectStats;
    "apollographql/configFilesFound": string;
    "apollographql/tagsLoaded": string;
    "apollographql/loadingComplete": number;
    "apollographql/loading": {
        message: string;
        token: number;
    };
    "apollographql/engineDecorations": {
        decorations: EngineDecoration[];
    };
    serverDebugMessage: {
        type: "info" | "warning" | "error" | "errorTelemetry";
        message: string;
    };
};
export declare type LanguageClient = Omit<GenericLanguageClient, "onNotification"> & {
    onNotification<MessageType extends keyof Messages>(messageType: MessageType, handler: (value: Messages[MessageType]) => void): void;
    onNotification<RO>(type: NotificationType0<RO>, handler: NotificationHandler0): void;
    onNotification<P, RO>(type: NotificationType<P, RO>, handler: NotificationHandler<P>): void;
};
export declare type Connection = Omit<GenericConnection, "sendNotification"> & {
    sendNotification<MessageType extends keyof Messages>(messageType: MessageType, value: Messages[MessageType]): void;
    sendNotification<RO>(type: NotificationType0<RO>): void;
    sendNotification<P, RO>(type: NotificationType<P, RO>, params: P): void;
};
export {};
//# sourceMappingURL=messages.d.ts.map