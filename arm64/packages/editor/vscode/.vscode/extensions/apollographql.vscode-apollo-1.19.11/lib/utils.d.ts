import type { LanguageClient, ProjectStats } from "./messages";
export declare const timeSince: (date: number) => string | undefined;
export declare const printNoFileOpenMessage: (client: LanguageClient, extVersion: string) => void;
export declare const printStatsToClientOutputChannel: (client: LanguageClient, stats: ProjectStats, extVersion: string) => void;
//# sourceMappingURL=utils.d.ts.map