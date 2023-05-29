import { GraphQLDataSource } from "./GraphQLDataSource";
export interface ClientIdentity {
    name?: string;
    version?: string;
    referenceID?: string;
}
export declare type ServiceID = string;
export declare type ClientID = string;
export declare type SchemaTag = string;
export declare type ServiceIDAndTag = [ServiceID, SchemaTag?];
export declare type ServiceSpecifier = string;
export declare type FieldLatenciesMS = Map<string, Map<string, number | null>>;
export declare function noServiceError(service: string | undefined, endpoint?: string): string;
export declare class ApolloEngineClient extends GraphQLDataSource {
    private engineKey;
    private clientIdentity?;
    constructor(engineKey: string, engineEndpoint?: string, clientIdentity?: ClientIdentity | undefined);
    willSendRequest(request: any): void;
    loadSchemaTagsAndFieldLatencies(serviceID: string): Promise<{
        schemaTags: string[];
        fieldLatenciesMS: FieldLatenciesMS;
    }>;
    loadFrontendUrlRoot(): Promise<string | undefined>;
}
//# sourceMappingURL=index.d.ts.map