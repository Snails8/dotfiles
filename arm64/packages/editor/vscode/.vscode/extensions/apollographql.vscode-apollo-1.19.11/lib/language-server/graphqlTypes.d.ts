export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Blob: any;
    GraphQLDocument: any;
    Long: any;
    Object: any;
    SHA256: any;
    StringOrInt: any;
    Timestamp: any;
    Void: any;
};
export declare type Account = {
    __typename?: 'Account';
    auditLogExports: Maybe<Array<AuditLogExport>>;
    availableRoles: Array<UserPermission>;
    avatarUpload: Maybe<AvatarUploadResult>;
    avatarUrl: Maybe<Scalars['String']>;
    billingInfo: Maybe<BillingInfo>;
    companyUrl: Maybe<Scalars['String']>;
    currentBillingMonth: Maybe<BillingMonth>;
    currentPlan: BillingPlan;
    currentSubscription: Maybe<BillingSubscription>;
    experimentalFeatures: AccountExperimentalFeatures;
    expiredTrialSubscription: Maybe<BillingSubscription>;
    graphIDAvailable: Scalars['Boolean'];
    hasBeenOnTrial: Scalars['Boolean'];
    id: Scalars['ID'];
    internalID: Scalars['ID'];
    invitations: Maybe<Array<AccountInvitation>>;
    invoices: Maybe<Array<Invoice>>;
    isOnExpiredTrial: Scalars['Boolean'];
    isOnTrial: Scalars['Boolean'];
    memberships: Maybe<Array<AccountMembership>>;
    name: Scalars['String'];
    provisionedAt: Maybe<Scalars['Timestamp']>;
    recurlyEmail: Maybe<Scalars['String']>;
    registryStatsWindow: Maybe<RegistryStatsWindow>;
    requests: Maybe<Scalars['Long']>;
    requestsInCurrentBillingPeriod: Maybe<Scalars['Long']>;
    roles: Maybe<AccountRoles>;
    seatCountForNextBill: Maybe<Scalars['Int']>;
    seats: Maybe<Seats>;
    secondaryIDs: Array<Scalars['ID']>;
    services: Array<Service>;
    sso: Maybe<OrganizationSso>;
    state: Maybe<AccountState>;
    staticInvitations: Maybe<Array<OrganizationInviteLink>>;
    stats: AccountStatsWindow;
    statsWindow: Maybe<AccountStatsWindow>;
    subscriptions: Maybe<Array<BillingSubscription>>;
    ticket: Maybe<ZendeskTicket>;
    tickets: Maybe<Array<ZendeskTicket>>;
};
export declare type AccountAvatarUrlArgs = {
    size?: Scalars['Int'];
};
export declare type AccountGraphIdAvailableArgs = {
    id: Scalars['ID'];
};
export declare type AccountInvitationsArgs = {
    includeAccepted?: Scalars['Boolean'];
};
export declare type AccountRegistryStatsWindowArgs = {
    from: Scalars['Timestamp'];
    resolution: Maybe<Resolution>;
    to: Maybe<Scalars['Timestamp']>;
};
export declare type AccountRequestsArgs = {
    from: Scalars['Timestamp'];
    to: Scalars['Timestamp'];
};
export declare type AccountServicesArgs = {
    includeDeleted: Maybe<Scalars['Boolean']>;
};
export declare type AccountStatsArgs = {
    from: Scalars['Timestamp'];
    resolution: Maybe<Resolution>;
    to: Maybe<Scalars['Timestamp']>;
};
export declare type AccountStatsWindowArgs = {
    from: Scalars['Timestamp'];
    resolution: Maybe<Resolution>;
    to: Maybe<Scalars['Timestamp']>;
};
export declare type AccountTicketArgs = {
    id: Scalars['ID'];
};
export declare type AccountChecksStatsMetrics = {
    __typename?: 'AccountChecksStatsMetrics';
    totalFailedChecks: Scalars['Long'];
    totalSuccessfulChecks: Scalars['Long'];
};
export declare type AccountChecksStatsRecord = {
    __typename?: 'AccountChecksStatsRecord';
    id: Scalars['ID'];
    metrics: AccountChecksStatsMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare enum AccountEdgeServerInfosColumn {
    BootId = "BOOT_ID",
    ExecutableSchemaId = "EXECUTABLE_SCHEMA_ID",
    LibraryVersion = "LIBRARY_VERSION",
    Platform = "PLATFORM",
    RuntimeVersion = "RUNTIME_VERSION",
    SchemaTag = "SCHEMA_TAG",
    ServerId = "SERVER_ID",
    ServiceId = "SERVICE_ID",
    Timestamp = "TIMESTAMP",
    UserVersion = "USER_VERSION"
}
export declare type AccountEdgeServerInfosDimensions = {
    __typename?: 'AccountEdgeServerInfosDimensions';
    bootId: Maybe<Scalars['ID']>;
    executableSchemaId: Maybe<Scalars['ID']>;
    libraryVersion: Maybe<Scalars['String']>;
    platform: Maybe<Scalars['String']>;
    runtimeVersion: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serverId: Maybe<Scalars['ID']>;
    serviceId: Maybe<Scalars['ID']>;
    userVersion: Maybe<Scalars['String']>;
};
export declare type AccountEdgeServerInfosFilter = {
    and: Maybe<Array<AccountEdgeServerInfosFilter>>;
    bootId: Maybe<Scalars['ID']>;
    executableSchemaId: Maybe<Scalars['ID']>;
    in: Maybe<AccountEdgeServerInfosFilterIn>;
    libraryVersion: Maybe<Scalars['String']>;
    not: Maybe<AccountEdgeServerInfosFilter>;
    or: Maybe<Array<AccountEdgeServerInfosFilter>>;
    platform: Maybe<Scalars['String']>;
    runtimeVersion: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serverId: Maybe<Scalars['ID']>;
    serviceId: Maybe<Scalars['ID']>;
    userVersion: Maybe<Scalars['String']>;
};
export declare type AccountEdgeServerInfosFilterIn = {
    bootId: Maybe<Array<Maybe<Scalars['ID']>>>;
    executableSchemaId: Maybe<Array<Maybe<Scalars['ID']>>>;
    libraryVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    platform: Maybe<Array<Maybe<Scalars['String']>>>;
    runtimeVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    serverId: Maybe<Array<Maybe<Scalars['ID']>>>;
    serviceId: Maybe<Array<Maybe<Scalars['ID']>>>;
    userVersion: Maybe<Array<Maybe<Scalars['String']>>>;
};
export declare type AccountEdgeServerInfosOrderBySpec = {
    column: AccountEdgeServerInfosColumn;
    direction: Ordering;
};
export declare type AccountEdgeServerInfosRecord = {
    __typename?: 'AccountEdgeServerInfosRecord';
    groupBy: AccountEdgeServerInfosDimensions;
    timestamp: Scalars['Timestamp'];
};
export declare enum AccountErrorStatsColumn {
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    ErrorsCount = "ERRORS_COUNT",
    Path = "PATH",
    QueryId = "QUERY_ID",
    QueryName = "QUERY_NAME",
    RequestsWithErrorsCount = "REQUESTS_WITH_ERRORS_COUNT",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    ServiceId = "SERVICE_ID",
    Timestamp = "TIMESTAMP"
}
export declare type AccountErrorStatsDimensions = {
    __typename?: 'AccountErrorStatsDimensions';
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    path: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type AccountErrorStatsFilter = {
    and: Maybe<Array<AccountErrorStatsFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    in: Maybe<AccountErrorStatsFilterIn>;
    not: Maybe<AccountErrorStatsFilter>;
    or: Maybe<Array<AccountErrorStatsFilter>>;
    path: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type AccountErrorStatsFilterIn = {
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    path: Maybe<Array<Maybe<Scalars['String']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    queryName: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    serviceId: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type AccountErrorStatsMetrics = {
    __typename?: 'AccountErrorStatsMetrics';
    errorsCount: Scalars['Long'];
    requestsWithErrorsCount: Scalars['Long'];
};
export declare type AccountErrorStatsOrderBySpec = {
    column: AccountErrorStatsColumn;
    direction: Ordering;
};
export declare type AccountErrorStatsRecord = {
    __typename?: 'AccountErrorStatsRecord';
    groupBy: AccountErrorStatsDimensions;
    metrics: AccountErrorStatsMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare type AccountExperimentalFeatures = {
    __typename?: 'AccountExperimentalFeatures';
    auditLogs: Scalars['Boolean'];
    championDashboard: Scalars['Boolean'];
    contractsPreview: Scalars['Boolean'];
    federation2Preview: Scalars['Boolean'];
    preRequestPreview: Scalars['Boolean'];
    publicVariants: Scalars['Boolean'];
    variantHomepage: Scalars['Boolean'];
    webhooksPreview: Scalars['Boolean'];
};
export declare enum AccountFieldLatenciesColumn {
    Field = "FIELD",
    FieldHistogram = "FIELD_HISTOGRAM",
    FieldName = "FIELD_NAME",
    ParentType = "PARENT_TYPE",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    ServiceId = "SERVICE_ID",
    Timestamp = "TIMESTAMP"
}
export declare type AccountFieldLatenciesDimensions = {
    __typename?: 'AccountFieldLatenciesDimensions';
    field: Maybe<Scalars['String']>;
    fieldName: Maybe<Scalars['String']>;
    parentType: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type AccountFieldLatenciesFilter = {
    and: Maybe<Array<AccountFieldLatenciesFilter>>;
    field: Maybe<Scalars['String']>;
    fieldName: Maybe<Scalars['String']>;
    in: Maybe<AccountFieldLatenciesFilterIn>;
    not: Maybe<AccountFieldLatenciesFilter>;
    or: Maybe<Array<AccountFieldLatenciesFilter>>;
    parentType: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type AccountFieldLatenciesFilterIn = {
    field: Maybe<Array<Maybe<Scalars['String']>>>;
    fieldName: Maybe<Array<Maybe<Scalars['String']>>>;
    parentType: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    serviceId: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type AccountFieldLatenciesMetrics = {
    __typename?: 'AccountFieldLatenciesMetrics';
    fieldHistogram: DurationHistogram;
};
export declare type AccountFieldLatenciesOrderBySpec = {
    column: AccountFieldLatenciesColumn;
    direction: Ordering;
};
export declare type AccountFieldLatenciesRecord = {
    __typename?: 'AccountFieldLatenciesRecord';
    groupBy: AccountFieldLatenciesDimensions;
    metrics: AccountFieldLatenciesMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare enum AccountFieldUsageColumn {
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    ExecutionCount = "EXECUTION_COUNT",
    Field = "FIELD",
    FieldName = "FIELD_NAME",
    ParentType = "PARENT_TYPE",
    QueryId = "QUERY_ID",
    QueryName = "QUERY_NAME",
    ReferencingOperationCount = "REFERENCING_OPERATION_COUNT",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    ServiceId = "SERVICE_ID",
    Timestamp = "TIMESTAMP"
}
export declare type AccountFieldUsageDimensions = {
    __typename?: 'AccountFieldUsageDimensions';
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    field: Maybe<Scalars['String']>;
    fieldName: Maybe<Scalars['String']>;
    parentType: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type AccountFieldUsageFilter = {
    and: Maybe<Array<AccountFieldUsageFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    field: Maybe<Scalars['String']>;
    fieldName: Maybe<Scalars['String']>;
    in: Maybe<AccountFieldUsageFilterIn>;
    not: Maybe<AccountFieldUsageFilter>;
    or: Maybe<Array<AccountFieldUsageFilter>>;
    parentType: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type AccountFieldUsageFilterIn = {
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    field: Maybe<Array<Maybe<Scalars['String']>>>;
    fieldName: Maybe<Array<Maybe<Scalars['String']>>>;
    parentType: Maybe<Array<Maybe<Scalars['String']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    queryName: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    serviceId: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type AccountFieldUsageMetrics = {
    __typename?: 'AccountFieldUsageMetrics';
    executionCount: Scalars['Long'];
    referencingOperationCount: Scalars['Long'];
};
export declare type AccountFieldUsageOrderBySpec = {
    column: AccountFieldUsageColumn;
    direction: Ordering;
};
export declare type AccountFieldUsageRecord = {
    __typename?: 'AccountFieldUsageRecord';
    groupBy: AccountFieldUsageDimensions;
    metrics: AccountFieldUsageMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare type AccountInvitation = {
    __typename?: 'AccountInvitation';
    acceptedAt: Maybe<Scalars['Timestamp']>;
    acceptedBy: Maybe<User>;
    createdAt: Scalars['Timestamp'];
    createdBy: Maybe<User>;
    email: Scalars['String'];
    id: Scalars['ID'];
    lastSentAt: Maybe<Scalars['Timestamp']>;
    role: UserPermission;
};
export declare type AccountMembership = {
    __typename?: 'AccountMembership';
    account: Account;
    createdAt: Scalars['Timestamp'];
    free: Maybe<Scalars['Boolean']>;
    permission: UserPermission;
    user: User;
};
export declare type AccountMutation = {
    __typename?: 'AccountMutation';
    auditExport: Maybe<AuditLogExportMutation>;
    cancelConvertAnnualTeamSubscriptionToMonthlyAtNextPeriod: Maybe<Account>;
    cancelSubscriptions: Maybe<Account>;
    convertAnnualTeamSubscriptionToMonthlyAtNextPeriod: Maybe<Account>;
    convertMonthlyTeamSubscriptionToAnnual: Maybe<Account>;
    createStaticInvitation: Maybe<OrganizationInviteLink>;
    deleteAvatar: Maybe<AvatarDeleteError>;
    dismissExpiredTrial: Maybe<Account>;
    extendTrial: Maybe<Account>;
    hardDelete: Maybe<Scalars['Void']>;
    invite: Maybe<AccountInvitation>;
    reactivateCurrentSubscription: Maybe<Account>;
    refreshBilling: Maybe<Scalars['Void']>;
    removeInvitation: Maybe<Scalars['Void']>;
    removeMember: Maybe<Account>;
    requestAuditExport: Maybe<Account>;
    resendInvitation: Maybe<AccountInvitation>;
    revokeStaticInvitation: Maybe<OrganizationInviteLink>;
    setPlan: Maybe<Scalars['Void']>;
    startTeamSubscription: Maybe<Account>;
    startTrial: Maybe<Account>;
    submitTeamCancellationFeedback: Maybe<Scalars['Void']>;
    terminateSubscriptions: Maybe<Account>;
    updateBillingAddress: Maybe<Account>;
    updateBillingInfo: Maybe<Scalars['Void']>;
    updateCompanyUrl: Maybe<Account>;
    updateEmail: Maybe<Scalars['Void']>;
    updateID: Maybe<Account>;
    updateName: Maybe<Scalars['Void']>;
    updatePingOneSSOIDPID: Maybe<Account>;
    updateSSODefaultRole: Maybe<OrganizationSso>;
    updateUserPermission: Maybe<User>;
};
export declare type AccountMutationAuditExportArgs = {
    id: Scalars['String'];
};
export declare type AccountMutationCreateStaticInvitationArgs = {
    role: UserPermission;
};
export declare type AccountMutationExtendTrialArgs = {
    to: Scalars['Timestamp'];
};
export declare type AccountMutationInviteArgs = {
    email: Scalars['String'];
    role: Maybe<UserPermission>;
};
export declare type AccountMutationRemoveInvitationArgs = {
    id: Maybe<Scalars['ID']>;
};
export declare type AccountMutationRemoveMemberArgs = {
    id: Scalars['ID'];
};
export declare type AccountMutationRequestAuditExportArgs = {
    actors: Maybe<Array<ActorInput>>;
    from: Scalars['Timestamp'];
    graphIds: Maybe<Array<Scalars['String']>>;
    to: Scalars['Timestamp'];
};
export declare type AccountMutationResendInvitationArgs = {
    id: Maybe<Scalars['ID']>;
};
export declare type AccountMutationRevokeStaticInvitationArgs = {
    token: Scalars['String'];
};
export declare type AccountMutationSetPlanArgs = {
    id: Scalars['ID'];
};
export declare type AccountMutationStartTeamSubscriptionArgs = {
    billingPeriod: BillingPeriod;
};
export declare type AccountMutationSubmitTeamCancellationFeedbackArgs = {
    feedback: Scalars['String'];
};
export declare type AccountMutationUpdateBillingAddressArgs = {
    billingAddress: BillingAddressInput;
};
export declare type AccountMutationUpdateBillingInfoArgs = {
    token: Scalars['String'];
};
export declare type AccountMutationUpdateCompanyUrlArgs = {
    companyUrl: Maybe<Scalars['String']>;
};
export declare type AccountMutationUpdateEmailArgs = {
    email: Scalars['String'];
};
export declare type AccountMutationUpdateIdArgs = {
    id: Scalars['ID'];
};
export declare type AccountMutationUpdateNameArgs = {
    name: Scalars['String'];
};
export declare type AccountMutationUpdatePingOneSsoidpidArgs = {
    idpid: Maybe<Scalars['String']>;
};
export declare type AccountMutationUpdateSsoDefaultRoleArgs = {
    role: UserPermission;
};
export declare type AccountMutationUpdateUserPermissionArgs = {
    permission: UserPermission;
    userID: Scalars['ID'];
};
export declare enum AccountOperationCheckStatsColumn {
    CachedRequestsCount = "CACHED_REQUESTS_COUNT",
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    QueryId = "QUERY_ID",
    SchemaTag = "SCHEMA_TAG",
    ServiceId = "SERVICE_ID",
    Timestamp = "TIMESTAMP",
    UncachedRequestsCount = "UNCACHED_REQUESTS_COUNT"
}
export declare type AccountOperationCheckStatsDimensions = {
    __typename?: 'AccountOperationCheckStatsDimensions';
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type AccountOperationCheckStatsFilter = {
    and: Maybe<Array<AccountOperationCheckStatsFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    in: Maybe<AccountOperationCheckStatsFilterIn>;
    not: Maybe<AccountOperationCheckStatsFilter>;
    or: Maybe<Array<AccountOperationCheckStatsFilter>>;
    queryId: Maybe<Scalars['ID']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type AccountOperationCheckStatsFilterIn = {
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    serviceId: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type AccountOperationCheckStatsMetrics = {
    __typename?: 'AccountOperationCheckStatsMetrics';
    cachedRequestsCount: Scalars['Long'];
    uncachedRequestsCount: Scalars['Long'];
};
export declare type AccountOperationCheckStatsOrderBySpec = {
    column: AccountOperationCheckStatsColumn;
    direction: Ordering;
};
export declare type AccountOperationCheckStatsRecord = {
    __typename?: 'AccountOperationCheckStatsRecord';
    groupBy: AccountOperationCheckStatsDimensions;
    metrics: AccountOperationCheckStatsMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare type AccountPublishesStatsMetrics = {
    __typename?: 'AccountPublishesStatsMetrics';
    totalPublishes: Scalars['Long'];
};
export declare type AccountPublishesStatsRecord = {
    __typename?: 'AccountPublishesStatsRecord';
    id: Scalars['ID'];
    metrics: AccountPublishesStatsMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare enum AccountQueryStatsColumn {
    CachedHistogram = "CACHED_HISTOGRAM",
    CachedRequestsCount = "CACHED_REQUESTS_COUNT",
    CacheTtlHistogram = "CACHE_TTL_HISTOGRAM",
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    ForbiddenOperationCount = "FORBIDDEN_OPERATION_COUNT",
    FromEngineproxy = "FROM_ENGINEPROXY",
    QueryId = "QUERY_ID",
    QueryName = "QUERY_NAME",
    RegisteredOperationCount = "REGISTERED_OPERATION_COUNT",
    RequestsWithErrorsCount = "REQUESTS_WITH_ERRORS_COUNT",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    ServiceId = "SERVICE_ID",
    Timestamp = "TIMESTAMP",
    UncachedHistogram = "UNCACHED_HISTOGRAM",
    UncachedRequestsCount = "UNCACHED_REQUESTS_COUNT"
}
export declare type AccountQueryStatsDimensions = {
    __typename?: 'AccountQueryStatsDimensions';
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    fromEngineproxy: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    querySignature: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type AccountQueryStatsFilter = {
    and: Maybe<Array<AccountQueryStatsFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    fromEngineproxy: Maybe<Scalars['String']>;
    in: Maybe<AccountQueryStatsFilterIn>;
    not: Maybe<AccountQueryStatsFilter>;
    or: Maybe<Array<AccountQueryStatsFilter>>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type AccountQueryStatsFilterIn = {
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    fromEngineproxy: Maybe<Array<Maybe<Scalars['String']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    queryName: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    serviceId: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type AccountQueryStatsMetrics = {
    __typename?: 'AccountQueryStatsMetrics';
    cacheTtlHistogram: DurationHistogram;
    cachedHistogram: DurationHistogram;
    cachedRequestsCount: Scalars['Long'];
    forbiddenOperationCount: Scalars['Long'];
    registeredOperationCount: Scalars['Long'];
    requestsWithErrorsCount: Scalars['Long'];
    totalLatencyHistogram: DurationHistogram;
    totalRequestCount: Scalars['Long'];
    uncachedHistogram: DurationHistogram;
    uncachedRequestsCount: Scalars['Long'];
};
export declare type AccountQueryStatsOrderBySpec = {
    column: AccountQueryStatsColumn;
    direction: Ordering;
};
export declare type AccountQueryStatsRecord = {
    __typename?: 'AccountQueryStatsRecord';
    groupBy: AccountQueryStatsDimensions;
    metrics: AccountQueryStatsMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare type AccountRoles = {
    __typename?: 'AccountRoles';
    canAudit: Scalars['Boolean'];
    canCreateDevGraph: Scalars['Boolean'];
    canCreateService: Scalars['Boolean'];
    canDelete: Scalars['Boolean'];
    canDownloadInvoice: Scalars['Boolean'];
    canManageMembers: Scalars['Boolean'];
    canQuery: Scalars['Boolean'];
    canQueryAudit: Scalars['Boolean'];
    canQueryBillingInfo: Scalars['Boolean'];
    canQueryInvoices: Scalars['Boolean'];
    canQueryMembers: Scalars['Boolean'];
    canQueryStats: Scalars['Boolean'];
    canReadTickets: Scalars['Boolean'];
    canRemoveMembers: Scalars['Boolean'];
    canSetConstrainedPlan: Scalars['Boolean'];
    canUpdateBillingInfo: Scalars['Boolean'];
    canUpdateMetadata: Scalars['Boolean'];
};
export declare enum AccountState {
    Active = "ACTIVE",
    Closed = "CLOSED",
    Unknown = "UNKNOWN",
    Unprovisioned = "UNPROVISIONED"
}
export declare type AccountStatsWindow = {
    __typename?: 'AccountStatsWindow';
    edgeServerInfos: Array<AccountEdgeServerInfosRecord>;
    errorStats: Array<AccountErrorStatsRecord>;
    fieldLatencies: Array<AccountFieldLatenciesRecord>;
    fieldUsage: Array<AccountFieldUsageRecord>;
    operationCheckStats: Array<AccountOperationCheckStatsRecord>;
    queryStats: Array<AccountQueryStatsRecord>;
    roundedDownFrom: Scalars['Timestamp'];
    roundedUpTo: Scalars['Timestamp'];
    tracePathErrorsRefs: Array<AccountTracePathErrorsRefsRecord>;
    traceRefs: Array<AccountTraceRefsRecord>;
};
export declare type AccountStatsWindowEdgeServerInfosArgs = {
    filter: Maybe<AccountEdgeServerInfosFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<AccountEdgeServerInfosOrderBySpec>>;
};
export declare type AccountStatsWindowErrorStatsArgs = {
    filter: Maybe<AccountErrorStatsFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<AccountErrorStatsOrderBySpec>>;
};
export declare type AccountStatsWindowFieldLatenciesArgs = {
    filter: Maybe<AccountFieldLatenciesFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<AccountFieldLatenciesOrderBySpec>>;
};
export declare type AccountStatsWindowFieldUsageArgs = {
    filter: Maybe<AccountFieldUsageFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<AccountFieldUsageOrderBySpec>>;
};
export declare type AccountStatsWindowOperationCheckStatsArgs = {
    filter: Maybe<AccountOperationCheckStatsFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<AccountOperationCheckStatsOrderBySpec>>;
};
export declare type AccountStatsWindowQueryStatsArgs = {
    filter: Maybe<AccountQueryStatsFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<AccountQueryStatsOrderBySpec>>;
};
export declare type AccountStatsWindowTracePathErrorsRefsArgs = {
    filter: Maybe<AccountTracePathErrorsRefsFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<AccountTracePathErrorsRefsOrderBySpec>>;
};
export declare type AccountStatsWindowTraceRefsArgs = {
    filter: Maybe<AccountTraceRefsFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<AccountTraceRefsOrderBySpec>>;
};
export declare enum AccountTracePathErrorsRefsColumn {
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    DurationBucket = "DURATION_BUCKET",
    ErrorsCountInPath = "ERRORS_COUNT_IN_PATH",
    ErrorsCountInTrace = "ERRORS_COUNT_IN_TRACE",
    ErrorMessage = "ERROR_MESSAGE",
    Path = "PATH",
    QueryId = "QUERY_ID",
    QueryName = "QUERY_NAME",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    ServiceId = "SERVICE_ID",
    Timestamp = "TIMESTAMP",
    TraceHttpStatusCode = "TRACE_HTTP_STATUS_CODE",
    TraceId = "TRACE_ID",
    TraceSizeBytes = "TRACE_SIZE_BYTES",
    TraceStartsAt = "TRACE_STARTS_AT"
}
export declare type AccountTracePathErrorsRefsDimensions = {
    __typename?: 'AccountTracePathErrorsRefsDimensions';
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    durationBucket: Maybe<Scalars['Int']>;
    errorMessage: Maybe<Scalars['String']>;
    path: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
    traceHttpStatusCode: Maybe<Scalars['Int']>;
    traceId: Maybe<Scalars['ID']>;
    traceStartsAt: Maybe<Scalars['Timestamp']>;
};
export declare type AccountTracePathErrorsRefsFilter = {
    and: Maybe<Array<AccountTracePathErrorsRefsFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    durationBucket: Maybe<Scalars['Int']>;
    errorMessage: Maybe<Scalars['String']>;
    in: Maybe<AccountTracePathErrorsRefsFilterIn>;
    not: Maybe<AccountTracePathErrorsRefsFilter>;
    or: Maybe<Array<AccountTracePathErrorsRefsFilter>>;
    path: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
    traceHttpStatusCode: Maybe<Scalars['Int']>;
    traceId: Maybe<Scalars['ID']>;
};
export declare type AccountTracePathErrorsRefsFilterIn = {
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    durationBucket: Maybe<Array<Maybe<Scalars['Int']>>>;
    errorMessage: Maybe<Array<Maybe<Scalars['String']>>>;
    path: Maybe<Array<Maybe<Scalars['String']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    queryName: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    serviceId: Maybe<Array<Maybe<Scalars['ID']>>>;
    traceHttpStatusCode: Maybe<Array<Maybe<Scalars['Int']>>>;
    traceId: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type AccountTracePathErrorsRefsMetrics = {
    __typename?: 'AccountTracePathErrorsRefsMetrics';
    errorsCountInPath: Scalars['Long'];
    errorsCountInTrace: Scalars['Long'];
    traceSizeBytes: Scalars['Long'];
};
export declare type AccountTracePathErrorsRefsOrderBySpec = {
    column: AccountTracePathErrorsRefsColumn;
    direction: Ordering;
};
export declare type AccountTracePathErrorsRefsRecord = {
    __typename?: 'AccountTracePathErrorsRefsRecord';
    groupBy: AccountTracePathErrorsRefsDimensions;
    metrics: AccountTracePathErrorsRefsMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare enum AccountTraceRefsColumn {
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    DurationBucket = "DURATION_BUCKET",
    DurationNs = "DURATION_NS",
    QueryId = "QUERY_ID",
    QueryName = "QUERY_NAME",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    ServiceId = "SERVICE_ID",
    Timestamp = "TIMESTAMP",
    TraceId = "TRACE_ID",
    TraceSizeBytes = "TRACE_SIZE_BYTES"
}
export declare type AccountTraceRefsDimensions = {
    __typename?: 'AccountTraceRefsDimensions';
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    durationBucket: Maybe<Scalars['Int']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    querySignature: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
    traceId: Maybe<Scalars['ID']>;
};
export declare type AccountTraceRefsFilter = {
    and: Maybe<Array<AccountTraceRefsFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    durationBucket: Maybe<Scalars['Int']>;
    in: Maybe<AccountTraceRefsFilterIn>;
    not: Maybe<AccountTraceRefsFilter>;
    or: Maybe<Array<AccountTraceRefsFilter>>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
    traceId: Maybe<Scalars['ID']>;
};
export declare type AccountTraceRefsFilterIn = {
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    durationBucket: Maybe<Array<Maybe<Scalars['Int']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    queryName: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    serviceId: Maybe<Array<Maybe<Scalars['ID']>>>;
    traceId: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type AccountTraceRefsMetrics = {
    __typename?: 'AccountTraceRefsMetrics';
    durationNs: Scalars['Long'];
    traceSizeBytes: Scalars['Long'];
};
export declare type AccountTraceRefsOrderBySpec = {
    column: AccountTraceRefsColumn;
    direction: Ordering;
};
export declare type AccountTraceRefsRecord = {
    __typename?: 'AccountTraceRefsRecord';
    groupBy: AccountTraceRefsDimensions;
    metrics: AccountTraceRefsMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare type Actor = {
    __typename?: 'Actor';
    actorId: Scalars['ID'];
    type: ActorType;
};
export declare type ActorInput = {
    actorId: Scalars['ID'];
    type: ActorType;
};
export declare enum ActorType {
    AnonymousUser = "ANONYMOUS_USER",
    Backfill = "BACKFILL",
    Cron = "CRON",
    Graph = "GRAPH",
    InternalIdentity = "INTERNAL_IDENTITY",
    Synchronization = "SYNCHRONIZATION",
    User = "USER"
}
export declare type AffectedClient = {
    __typename?: 'AffectedClient';
    clientReferenceId: Maybe<Scalars['ID']>;
    clientVersion: Maybe<Scalars['String']>;
};
export declare type AffectedQuery = {
    __typename?: 'AffectedQuery';
    alreadyApproved: Maybe<Scalars['Boolean']>;
    alreadyIgnored: Maybe<Scalars['Boolean']>;
    changes: Maybe<Array<ChangeOnOperation>>;
    displayName: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    isValid: Maybe<Scalars['Boolean']>;
    markedAsIgnored: Maybe<Scalars['Boolean']>;
    markedAsSafe: Maybe<Scalars['Boolean']>;
    name: Maybe<Scalars['String']>;
    signature: Maybe<Scalars['String']>;
};
export declare type ApiKey = {
    id: Scalars['ID'];
    keyName: Maybe<Scalars['String']>;
    token: Scalars['String'];
};
export declare type ApiKeyProvision = {
    __typename?: 'ApiKeyProvision';
    apiKey: ApiKey;
    created: Scalars['Boolean'];
};
export declare type AuditLogExport = {
    __typename?: 'AuditLogExport';
    actors: Maybe<Array<Identity>>;
    bigqueryTriggeredAt: Maybe<Scalars['Timestamp']>;
    completedAt: Maybe<Scalars['Timestamp']>;
    createdAt: Scalars['Timestamp'];
    exportedFiles: Maybe<Array<Scalars['String']>>;
    from: Scalars['Timestamp'];
    graphs: Maybe<Array<Service>>;
    id: Scalars['ID'];
    requester: Maybe<User>;
    status: AuditStatus;
    to: Scalars['Timestamp'];
};
export declare type AuditLogExportMutation = {
    __typename?: 'AuditLogExportMutation';
    cancel: Maybe<Account>;
    delete: Maybe<Account>;
};
export declare enum AuditStatus {
    Cancelled = "CANCELLED",
    Completed = "COMPLETED",
    Expired = "EXPIRED",
    Failed = "FAILED",
    InProgress = "IN_PROGRESS",
    Queued = "QUEUED"
}
export declare type AvatarDeleteError = {
    __typename?: 'AvatarDeleteError';
    clientMessage: Scalars['String'];
    code: AvatarDeleteErrorCode;
    serverMessage: Scalars['String'];
};
export declare enum AvatarDeleteErrorCode {
    SsoUsersCannotDeleteSelfAvatar = "SSO_USERS_CANNOT_DELETE_SELF_AVATAR"
}
export declare type AvatarUploadError = {
    __typename?: 'AvatarUploadError';
    clientMessage: Scalars['String'];
    code: AvatarUploadErrorCode;
    serverMessage: Scalars['String'];
};
export declare enum AvatarUploadErrorCode {
    SsoUsersCannotUploadSelfAvatar = "SSO_USERS_CANNOT_UPLOAD_SELF_AVATAR"
}
export declare type AvatarUploadResult = AvatarUploadError | MediaUploadInfo;
export declare type BillingAccount = {
    __typename?: 'BillingAccount';
    id: Scalars['ID'];
};
export declare type BillingAddress = {
    __typename?: 'BillingAddress';
    address1: Maybe<Scalars['String']>;
    address2: Maybe<Scalars['String']>;
    city: Maybe<Scalars['String']>;
    country: Maybe<Scalars['String']>;
    state: Maybe<Scalars['String']>;
    zip: Maybe<Scalars['String']>;
};
export declare type BillingAddressInput = {
    address1: Scalars['String'];
    address2: Maybe<Scalars['String']>;
    city: Scalars['String'];
    country: Scalars['String'];
    state: Scalars['String'];
    zip: Scalars['String'];
};
export declare type BillingInfo = {
    __typename?: 'BillingInfo';
    address: BillingAddress;
    cardType: Maybe<Scalars['String']>;
    firstName: Maybe<Scalars['String']>;
    lastFour: Maybe<Scalars['Int']>;
    lastName: Maybe<Scalars['String']>;
    month: Maybe<Scalars['Int']>;
    vatNumber: Maybe<Scalars['String']>;
    year: Maybe<Scalars['Int']>;
};
export declare enum BillingModel {
    RequestBased = "REQUEST_BASED",
    SeatBased = "SEAT_BASED"
}
export declare type BillingMonth = {
    __typename?: 'BillingMonth';
    end: Scalars['Timestamp'];
    requests: Scalars['Long'];
    start: Scalars['Timestamp'];
};
export declare enum BillingPeriod {
    Monthly = "MONTHLY",
    Quarterly = "QUARTERLY",
    SemiAnnually = "SEMI_ANNUALLY",
    Yearly = "YEARLY"
}
export declare type BillingPlan = {
    __typename?: 'BillingPlan';
    addons: Array<BillingPlanAddon>;
    billingModel: BillingModel;
    billingPeriod: Maybe<BillingPeriod>;
    capabilities: BillingPlanCapabilities;
    description: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    isTrial: Scalars['Boolean'];
    kind: BillingPlanKind;
    name: Scalars['String'];
    pricePerSeatInUsdCents: Maybe<Scalars['Int']>;
    pricePerUnitInUsdCents: Scalars['Int'];
    public: Scalars['Boolean'];
    tier: BillingPlanTier;
};
export declare type BillingPlanAddon = {
    __typename?: 'BillingPlanAddon';
    id: Scalars['ID'];
    pricePerUnitInUsdCents: Scalars['Int'];
};
export declare type BillingPlanCapabilities = {
    __typename?: 'BillingPlanCapabilities';
    clients: Scalars['Boolean'];
    contracts: Scalars['Boolean'];
    datadog: Scalars['Boolean'];
    errors: Scalars['Boolean'];
    federation: Scalars['Boolean'];
    launches: Scalars['Boolean'];
    maxAuditInDays: Scalars['Int'];
    maxRangeInDays: Maybe<Scalars['Int']>;
    maxRequestsPerMonth: Maybe<Scalars['Long']>;
    metrics: Scalars['Boolean'];
    notifications: Scalars['Boolean'];
    operationRegistry: Scalars['Boolean'];
    ranges: Array<Scalars['String']>;
    schemaValidation: Scalars['Boolean'];
    traces: Scalars['Boolean'];
    userRoles: Scalars['Boolean'];
    webhooks: Scalars['Boolean'];
};
export declare enum BillingPlanKind {
    Community = "COMMUNITY",
    EnterpriseInternal = "ENTERPRISE_INTERNAL",
    EnterprisePaid = "ENTERPRISE_PAID",
    EnterprisePilot = "ENTERPRISE_PILOT",
    TeamPaid = "TEAM_PAID",
    TeamTrial = "TEAM_TRIAL"
}
export declare enum BillingPlanTier {
    Community = "COMMUNITY",
    Enterprise = "ENTERPRISE",
    Team = "TEAM"
}
export declare type BillingSubscription = {
    __typename?: 'BillingSubscription';
    activatedAt: Scalars['Timestamp'];
    addons: Array<BillingSubscriptionAddon>;
    autoRenew: Scalars['Boolean'];
    basePriceInUsdCents: Scalars['Long'];
    canceledAt: Maybe<Scalars['Timestamp']>;
    currentPeriodEndsAt: Scalars['Timestamp'];
    currentPeriodStartedAt: Scalars['Timestamp'];
    expiresAt: Maybe<Scalars['Timestamp']>;
    plan: BillingPlan;
    pricePerSeatInUsdCents: Maybe<Scalars['Int']>;
    pricePerUnitInUsdCents: Scalars['Int'];
    quantity: Scalars['Int'];
    renewalTotalPriceInUsdCents: Scalars['Long'];
    state: SubscriptionState;
    totalPriceInUsdCents: Scalars['Long'];
    trialExpiresAt: Maybe<Scalars['Timestamp']>;
    uuid: Scalars['ID'];
};
export declare type BillingSubscriptionAddon = {
    __typename?: 'BillingSubscriptionAddon';
    id: Scalars['ID'];
    pricePerUnitInUsdCents: Scalars['Int'];
    quantity: Scalars['Int'];
};
export declare type Build = {
    __typename?: 'Build';
    input: BuildInput;
    result: Maybe<BuildResult>;
};
export declare type BuildError = {
    __typename?: 'BuildError';
    code: Maybe<Scalars['String']>;
    locations: Array<SourceLocation>;
    message: Scalars['String'];
};
export declare type BuildFailure = {
    __typename?: 'BuildFailure';
    errorMessages: Array<BuildError>;
};
export declare type BuildInput = CompositionBuildInput | FilterBuildInput;
export declare type BuildResult = BuildFailure | BuildSuccess;
export declare type BuildSuccess = {
    __typename?: 'BuildSuccess';
    coreSchema: CoreSchema;
};
export declare enum CacheScope {
    Private = "PRIVATE",
    Public = "PUBLIC",
    Unknown = "UNKNOWN",
    Unrecognized = "UNRECOGNIZED"
}
export declare type Change = {
    __typename?: 'Change';
    affectedQueries: Maybe<Array<AffectedQuery>>;
    argNode: Maybe<NamedIntrospectionArg>;
    category: ChangeCategory;
    childNode: Maybe<NamedIntrospectionValue>;
    code: Scalars['String'];
    description: Scalars['String'];
    parentNode: Maybe<NamedIntrospectionType>;
    severity: ChangeSeverity;
    type: ChangeType;
};
export declare enum ChangeCategory {
    Addition = "ADDITION",
    Deprecation = "DEPRECATION",
    Edit = "EDIT",
    Removal = "REMOVAL"
}
export declare enum ChangeCode {
    ArgChangedType = "ARG_CHANGED_TYPE",
    ArgChangedTypeOptionalToRequired = "ARG_CHANGED_TYPE_OPTIONAL_TO_REQUIRED",
    ArgDefaultValueChange = "ARG_DEFAULT_VALUE_CHANGE",
    ArgDescriptionChange = "ARG_DESCRIPTION_CHANGE",
    ArgRemoved = "ARG_REMOVED",
    DirectiveArgRemoved = "DIRECTIVE_ARG_REMOVED",
    DirectiveLocationRemoved = "DIRECTIVE_LOCATION_REMOVED",
    DirectiveRemoved = "DIRECTIVE_REMOVED",
    DirectiveRepeatableRemoved = "DIRECTIVE_REPEATABLE_REMOVED",
    EnumDeprecated = "ENUM_DEPRECATED",
    EnumDeprecatedReasonChange = "ENUM_DEPRECATED_REASON_CHANGE",
    EnumDeprecationRemoved = "ENUM_DEPRECATION_REMOVED",
    EnumValueDescriptionChange = "ENUM_VALUE_DESCRIPTION_CHANGE",
    FieldAdded = "FIELD_ADDED",
    FieldChangedType = "FIELD_CHANGED_TYPE",
    FieldDeprecated = "FIELD_DEPRECATED",
    FieldDeprecatedReasonChange = "FIELD_DEPRECATED_REASON_CHANGE",
    FieldDeprecationRemoved = "FIELD_DEPRECATION_REMOVED",
    FieldDescriptionChange = "FIELD_DESCRIPTION_CHANGE",
    FieldOnInputObjectChangedType = "FIELD_ON_INPUT_OBJECT_CHANGED_TYPE",
    FieldRemoved = "FIELD_REMOVED",
    FieldRemovedFromInputObject = "FIELD_REMOVED_FROM_INPUT_OBJECT",
    NonNullableFieldAddedToInputObject = "NON_NULLABLE_FIELD_ADDED_TO_INPUT_OBJECT",
    NullableFieldAddedToInputObject = "NULLABLE_FIELD_ADDED_TO_INPUT_OBJECT",
    OptionalArgAdded = "OPTIONAL_ARG_ADDED",
    RequiredArgAdded = "REQUIRED_ARG_ADDED",
    RequiredDirectiveArgAdded = "REQUIRED_DIRECTIVE_ARG_ADDED",
    TypeAdded = "TYPE_ADDED",
    TypeAddedToInterface = "TYPE_ADDED_TO_INTERFACE",
    TypeAddedToUnion = "TYPE_ADDED_TO_UNION",
    TypeChangedKind = "TYPE_CHANGED_KIND",
    TypeDescriptionChange = "TYPE_DESCRIPTION_CHANGE",
    TypeRemoved = "TYPE_REMOVED",
    TypeRemovedFromInterface = "TYPE_REMOVED_FROM_INTERFACE",
    TypeRemovedFromUnion = "TYPE_REMOVED_FROM_UNION",
    ValueAddedToEnum = "VALUE_ADDED_TO_ENUM",
    ValueRemovedFromEnum = "VALUE_REMOVED_FROM_ENUM"
}
export declare type ChangeDefinition = {
    __typename?: 'ChangeDefinition';
    category: ChangeCategory;
    code: ChangeCode;
    defaultSeverity: ChangeSeverity;
};
export declare type ChangeOnOperation = {
    __typename?: 'ChangeOnOperation';
    impact: Maybe<Scalars['String']>;
    semanticChange: SemanticChange;
};
export declare enum ChangeSeverity {
    Failure = "FAILURE",
    Notice = "NOTICE"
}
export declare type ChangeSummary = {
    __typename?: 'ChangeSummary';
    field: FieldChangeSummaryCounts;
    total: TotalChangeSummaryCounts;
    type: TypeChangeSummaryCounts;
};
export declare enum ChangeType {
    Failure = "FAILURE",
    Notice = "NOTICE"
}
export declare type ChangelogLaunchResult = {
    __typename?: 'ChangelogLaunchResult';
    createdAt: Scalars['Timestamp'];
    schemaTagID: Scalars['ID'];
};
export declare type Channel = {
    id: Scalars['ID'];
    name: Scalars['String'];
    subscriptions: Array<ChannelSubscription>;
};
export declare type ChannelSubscription = {
    channels: Array<Channel>;
    enabled: Scalars['Boolean'];
    id: Scalars['ID'];
    variant: Maybe<Scalars['String']>;
};
export declare type CheckConfiguration = {
    __typename?: 'CheckConfiguration';
    createdAt: Scalars['Timestamp'];
    excludedClients: Array<ClientFilter>;
    excludedOperations: Array<ExcludedOperation>;
    graphID: Scalars['ID'];
    id: Scalars['ID'];
    includeBaseVariant: Scalars['Boolean'];
    includedVariants: Array<Scalars['String']>;
    operationCountThreshold: Scalars['Int'];
    operationCountThresholdPercentage: Scalars['Float'];
    timeRangeSeconds: Scalars['Long'];
    updatedAt: Scalars['Timestamp'];
    updatedBy: Maybe<Identity>;
};
export declare type CheckFilterInput = {
    authors: Maybe<Array<Scalars['String']>>;
    branches: Maybe<Array<Scalars['String']>>;
    status: Maybe<CheckFilterInputStatusOption>;
    subgraphs: Maybe<Array<Scalars['String']>>;
};
export declare enum CheckFilterInputStatusOption {
    Failed = "FAILED",
    Passed = "PASSED",
    Pending = "PENDING"
}
export declare type CheckPartialSchemaResult = {
    __typename?: 'CheckPartialSchemaResult';
    checkSchemaResult: Maybe<CheckSchemaResult>;
    compositionValidationResult: CompositionValidationResult;
    workflow: Maybe<CheckWorkflow>;
};
export declare type CheckSchemaResult = {
    __typename?: 'CheckSchemaResult';
    diffToPrevious: SchemaDiff;
    operationsCheckID: Scalars['ID'];
    targetUrl: Maybe<Scalars['String']>;
    workflow: Maybe<CheckWorkflow>;
};
export declare type CheckWorkflow = {
    __typename?: 'CheckWorkflow';
    baseVariant: Maybe<GraphVariant>;
    completedAt: Maybe<Scalars['Timestamp']>;
    createdAt: Scalars['Timestamp'];
    gitContext: Maybe<GitContext>;
    id: Scalars['ID'];
    implementingServiceName: Maybe<Scalars['String']>;
    rerunOf: Maybe<CheckWorkflow>;
    reruns: Maybe<Array<CheckWorkflow>>;
    startedAt: Maybe<Scalars['Timestamp']>;
    status: CheckWorkflowStatus;
    tasks: Array<CheckWorkflowTask>;
    validationConfig: Maybe<SchemaDiffValidationConfig>;
};
export declare type CheckWorkflowRerunsArgs = {
    limit?: Scalars['Int'];
};
export declare type CheckWorkflowMutation = {
    __typename?: 'CheckWorkflowMutation';
    rerun: Maybe<CheckWorkflowRerunResult>;
};
export declare type CheckWorkflowRerunResult = {
    __typename?: 'CheckWorkflowRerunResult';
    result: Maybe<CheckWorkflow>;
    source: Maybe<CheckWorkflow>;
};
export declare enum CheckWorkflowStatus {
    Failed = "FAILED",
    Passed = "PASSED",
    Pending = "PENDING"
}
export declare type CheckWorkflowTask = {
    completedAt: Maybe<Scalars['Timestamp']>;
    createdAt: Scalars['Timestamp'];
    id: Scalars['ID'];
    status: CheckWorkflowTaskStatus;
    workflow: CheckWorkflow;
};
export declare enum CheckWorkflowTaskStatus {
    Blocked = "BLOCKED",
    Failed = "FAILED",
    Passed = "PASSED",
    Pending = "PENDING"
}
export declare type ClientFilter = {
    __typename?: 'ClientFilter';
    name: Maybe<Scalars['String']>;
    version: Maybe<Scalars['String']>;
};
export declare type ClientFilterInput = {
    name: Maybe<Scalars['String']>;
    version: Maybe<Scalars['String']>;
};
export declare type ClientInfoFilter = {
    name: Maybe<Scalars['String']>;
    referenceID: Maybe<Scalars['ID']>;
    version: Maybe<Scalars['String']>;
};
export declare type ClientInfoFilterOutput = {
    __typename?: 'ClientInfoFilterOutput';
    name: Maybe<Scalars['String']>;
    version: Maybe<Scalars['String']>;
};
export declare enum ComparisonOperator {
    Equals = "EQUALS",
    GreaterThan = "GREATER_THAN",
    GreaterThanOrEqualTo = "GREATER_THAN_OR_EQUAL_TO",
    LessThan = "LESS_THAN",
    LessThanOrEqualTo = "LESS_THAN_OR_EQUAL_TO",
    NotEquals = "NOT_EQUALS",
    Unrecognized = "UNRECOGNIZED"
}
export declare type CompositionAndRemoveResult = {
    __typename?: 'CompositionAndRemoveResult';
    compositionConfig: Maybe<CompositionConfig>;
    didExist: Scalars['Boolean'];
    errors: Array<Maybe<SchemaCompositionError>>;
    graphCompositionID: Scalars['String'];
    subgraphConfigs: Array<SubgraphConfig>;
    updatedGateway: Scalars['Boolean'];
};
export declare type CompositionAndUpsertResult = {
    __typename?: 'CompositionAndUpsertResult';
    compositionConfig: Maybe<CompositionConfig>;
    errors: Array<Maybe<SchemaCompositionError>>;
    graphCompositionID: Scalars['String'];
    subgraphConfigs: Array<SubgraphConfig>;
    updatedGateway: Scalars['Boolean'];
    wasCreated: Scalars['Boolean'];
    wasUpdated: Scalars['Boolean'];
};
export declare type CompositionBuildInput = {
    __typename?: 'CompositionBuildInput';
    subgraphs: Array<Subgraph>;
    version: Maybe<Scalars['String']>;
};
export declare type CompositionCheckTask = CheckWorkflowTask & {
    __typename?: 'CompositionCheckTask';
    completedAt: Maybe<Scalars['Timestamp']>;
    createdAt: Scalars['Timestamp'];
    id: Scalars['ID'];
    result: Maybe<CompositionResult>;
    status: CheckWorkflowTaskStatus;
    workflow: CheckWorkflow;
};
export declare type CompositionConfig = {
    __typename?: 'CompositionConfig';
    implementingServiceLocations: Array<ImplementingServiceLocation>;
    schemaHash: Scalars['String'];
};
export declare type CompositionPublishResult = CompositionResult & {
    __typename?: 'CompositionPublishResult';
    compositionConfig: Maybe<CompositionConfig>;
    csdl: Maybe<Scalars['GraphQLDocument']>;
    errors: Array<SchemaCompositionError>;
    graphCompositionID: Scalars['ID'];
    subgraphConfigs: Array<SubgraphConfig>;
    supergraphSdl: Maybe<Scalars['GraphQLDocument']>;
    updatedGateway: Scalars['Boolean'];
    webhookNotificationBody: Maybe<Scalars['String']>;
};
export declare type CompositionResult = {
    csdl: Maybe<Scalars['GraphQLDocument']>;
    errors: Array<SchemaCompositionError>;
    graphCompositionID: Scalars['ID'];
    subgraphConfigs: Array<SubgraphConfig>;
    supergraphSdl: Maybe<Scalars['GraphQLDocument']>;
};
export declare type CompositionStatusSubscription = ChannelSubscription & {
    __typename?: 'CompositionStatusSubscription';
    channels: Array<Channel>;
    createdAt: Scalars['Timestamp'];
    enabled: Scalars['Boolean'];
    id: Scalars['ID'];
    lastUpdatedAt: Scalars['Timestamp'];
    variant: Maybe<Scalars['String']>;
};
export declare type CompositionValidationDetails = {
    __typename?: 'CompositionValidationDetails';
    implementingServices: Array<FederatedImplementingServicePartialSchema>;
    schemaHash: Maybe<Scalars['String']>;
};
export declare type CompositionValidationResult = CompositionResult & {
    __typename?: 'CompositionValidationResult';
    compositionSuccess: Scalars['Boolean'];
    compositionValidationDetails: Maybe<CompositionValidationDetails>;
    csdl: Maybe<Scalars['GraphQLDocument']>;
    errors: Array<SchemaCompositionError>;
    graphCompositionID: Scalars['ID'];
    proposedImplementingService: FederatedImplementingServicePartialSchema;
    subgraphConfigs: Array<SubgraphConfig>;
    supergraphSdl: Maybe<Scalars['GraphQLDocument']>;
    workflowTask: Maybe<CompositionCheckTask>;
};
export declare enum ContractVariantFailedStep {
    DirectiveDefinitionLocationAugmenting = "DIRECTIVE_DEFINITION_LOCATION_AUGMENTING",
    EmptyObjectAndInterfaceMasking = "EMPTY_OBJECT_AND_INTERFACE_MASKING",
    EmptyUnionMasking = "EMPTY_UNION_MASKING",
    EnsureQueryTypeAccessible = "ENSURE_QUERY_TYPE_ACCESSIBLE",
    InputValidation = "INPUT_VALIDATION",
    Parsing = "PARSING",
    ParsingTagDirectives = "PARSING_TAG_DIRECTIVES",
    PartialInterfaceMasking = "PARTIAL_INTERFACE_MASKING",
    SchemaRetrieval = "SCHEMA_RETRIEVAL",
    TagMatching = "TAG_MATCHING",
    ToApiSchema = "TO_API_SCHEMA",
    ToFilterSchema = "TO_FILTER_SCHEMA",
    Unknown = "UNKNOWN"
}
export declare type ContractVariantPreviewErrors = {
    __typename?: 'ContractVariantPreviewErrors';
    errorMessages: Array<Scalars['String']>;
    failedStep: ContractVariantFailedStep;
};
export declare type ContractVariantPreviewResult = ContractVariantPreviewErrors | ContractVariantPreviewSuccess;
export declare type ContractVariantPreviewSuccess = {
    __typename?: 'ContractVariantPreviewSuccess';
    allTags: Array<Scalars['String']>;
    baseApiSchema: Scalars['String'];
    baseCoreSchema: Scalars['String'];
    contractApiSchema: Scalars['String'];
    contractCoreSchema: Scalars['String'];
};
export declare type ContractVariantUpsertErrors = {
    __typename?: 'ContractVariantUpsertErrors';
    errorMessages: Array<Scalars['String']>;
};
export declare type ContractVariantUpsertResult = ContractVariantUpsertErrors | ContractVariantUpsertSuccess;
export declare type ContractVariantUpsertSuccess = {
    __typename?: 'ContractVariantUpsertSuccess';
    contractVariant: GraphVariant;
};
export declare type CoreSchema = {
    __typename?: 'CoreSchema';
    apiDocument: Scalars['GraphQLDocument'];
    coreDocument: Scalars['GraphQLDocument'];
    coreHash: Scalars['String'];
};
export declare type CronExecution = {
    __typename?: 'CronExecution';
    completedAt: Maybe<Scalars['Timestamp']>;
    failure: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    job: CronJob;
    resolvedAt: Maybe<Scalars['Timestamp']>;
    resolvedBy: Maybe<Actor>;
    schedule: Scalars['String'];
    startedAt: Scalars['Timestamp'];
};
export declare type CronJob = {
    __typename?: 'CronJob';
    group: Scalars['String'];
    name: Scalars['String'];
    recentExecutions: Array<CronExecution>;
};
export declare type CronJobRecentExecutionsArgs = {
    n: Maybe<Scalars['Int']>;
};
export declare enum DatadogApiRegion {
    Eu = "EU",
    Us = "US"
}
export declare type DatadogMetricsConfig = {
    __typename?: 'DatadogMetricsConfig';
    apiKey: Scalars['String'];
    apiRegion: DatadogApiRegion;
    enabled: Scalars['Boolean'];
    legacyMetricNames: Scalars['Boolean'];
};
export declare type DeleteSchemaTagResult = {
    __typename?: 'DeleteSchemaTagResult';
    deleted: Scalars['Boolean'];
    deletedSubscriptionIDs: Array<Scalars['ID']>;
};
export declare enum DeletionTargetType {
    Account = "ACCOUNT",
    User = "USER"
}
export declare type DirectiveSupportStatus = {
    __typename?: 'DirectiveSupportStatus';
    enabled: Scalars['Boolean'];
    name: Scalars['String'];
};
export declare type DurationHistogram = {
    __typename?: 'DurationHistogram';
    averageDurationMs: Maybe<Scalars['Float']>;
    buckets: Array<DurationHistogramBucket>;
    durationMs: Maybe<Scalars['Float']>;
    sparseBuckets: Array<Scalars['Long']>;
    totalCount: Scalars['Long'];
    totalDurationMs: Scalars['Float'];
};
export declare type DurationHistogramDurationMsArgs = {
    percentile: Scalars['Float'];
};
export declare type DurationHistogramBucket = {
    __typename?: 'DurationHistogramBucket';
    count: Scalars['Long'];
    index: Scalars['Int'];
    rangeBeginMs: Scalars['Float'];
    rangeEndMs: Scalars['Float'];
};
export declare type EdgeServerInfo = {
    bootId: Scalars['String'];
    executableSchemaId: Scalars['String'];
    graphVariant: Scalars['String'];
    libraryVersion: Maybe<Scalars['String']>;
    platform: Maybe<Scalars['String']>;
    runtimeVersion: Maybe<Scalars['String']>;
    serverId: Maybe<Scalars['String']>;
    userVersion: Maybe<Scalars['String']>;
};
export declare enum EdgeServerInfosColumn {
    BootId = "BOOT_ID",
    ExecutableSchemaId = "EXECUTABLE_SCHEMA_ID",
    LibraryVersion = "LIBRARY_VERSION",
    Platform = "PLATFORM",
    RuntimeVersion = "RUNTIME_VERSION",
    SchemaTag = "SCHEMA_TAG",
    ServerId = "SERVER_ID",
    ServiceId = "SERVICE_ID",
    Timestamp = "TIMESTAMP",
    UserVersion = "USER_VERSION"
}
export declare type EdgeServerInfosDimensions = {
    __typename?: 'EdgeServerInfosDimensions';
    bootId: Maybe<Scalars['ID']>;
    executableSchemaId: Maybe<Scalars['ID']>;
    libraryVersion: Maybe<Scalars['String']>;
    platform: Maybe<Scalars['String']>;
    runtimeVersion: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serverId: Maybe<Scalars['ID']>;
    serviceId: Maybe<Scalars['ID']>;
    userVersion: Maybe<Scalars['String']>;
};
export declare type EdgeServerInfosFilter = {
    and: Maybe<Array<EdgeServerInfosFilter>>;
    bootId: Maybe<Scalars['ID']>;
    executableSchemaId: Maybe<Scalars['ID']>;
    in: Maybe<EdgeServerInfosFilterIn>;
    libraryVersion: Maybe<Scalars['String']>;
    not: Maybe<EdgeServerInfosFilter>;
    or: Maybe<Array<EdgeServerInfosFilter>>;
    platform: Maybe<Scalars['String']>;
    runtimeVersion: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serverId: Maybe<Scalars['ID']>;
    serviceId: Maybe<Scalars['ID']>;
    userVersion: Maybe<Scalars['String']>;
};
export declare type EdgeServerInfosFilterIn = {
    bootId: Maybe<Array<Maybe<Scalars['ID']>>>;
    executableSchemaId: Maybe<Array<Maybe<Scalars['ID']>>>;
    libraryVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    platform: Maybe<Array<Maybe<Scalars['String']>>>;
    runtimeVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    serverId: Maybe<Array<Maybe<Scalars['ID']>>>;
    serviceId: Maybe<Array<Maybe<Scalars['ID']>>>;
    userVersion: Maybe<Array<Maybe<Scalars['String']>>>;
};
export declare type EdgeServerInfosOrderBySpec = {
    column: EdgeServerInfosColumn;
    direction: Ordering;
};
export declare type EdgeServerInfosRecord = {
    __typename?: 'EdgeServerInfosRecord';
    groupBy: EdgeServerInfosDimensions;
    timestamp: Scalars['Timestamp'];
};
export declare enum EmailCategory {
    Educational = "EDUCATIONAL"
}
export declare type EmailPreferences = {
    __typename?: 'EmailPreferences';
    email: Scalars['String'];
    subscriptions: Array<EmailCategory>;
    unsubscribedFromAll: Scalars['Boolean'];
};
export declare type Error = {
    message: Scalars['String'];
};
export declare enum ErrorStatsColumn {
    AccountId = "ACCOUNT_ID",
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    ErrorsCount = "ERRORS_COUNT",
    Path = "PATH",
    QueryId = "QUERY_ID",
    QueryName = "QUERY_NAME",
    RequestsWithErrorsCount = "REQUESTS_WITH_ERRORS_COUNT",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    ServiceId = "SERVICE_ID",
    Timestamp = "TIMESTAMP"
}
export declare type ErrorStatsDimensions = {
    __typename?: 'ErrorStatsDimensions';
    accountId: Maybe<Scalars['ID']>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    path: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type ErrorStatsFilter = {
    accountId: Maybe<Scalars['ID']>;
    and: Maybe<Array<ErrorStatsFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    in: Maybe<ErrorStatsFilterIn>;
    not: Maybe<ErrorStatsFilter>;
    or: Maybe<Array<ErrorStatsFilter>>;
    path: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type ErrorStatsFilterIn = {
    accountId: Maybe<Array<Maybe<Scalars['ID']>>>;
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    path: Maybe<Array<Maybe<Scalars['String']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    queryName: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    serviceId: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type ErrorStatsMetrics = {
    __typename?: 'ErrorStatsMetrics';
    errorsCount: Scalars['Long'];
    requestsWithErrorsCount: Scalars['Long'];
};
export declare type ErrorStatsOrderBySpec = {
    column: ErrorStatsColumn;
    direction: Ordering;
};
export declare type ErrorStatsRecord = {
    __typename?: 'ErrorStatsRecord';
    groupBy: ErrorStatsDimensions;
    metrics: ErrorStatsMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare enum EventEnum {
    ClickCheckList = "CLICK_CHECK_LIST",
    ClickGoToGraphSettings = "CLICK_GO_TO_GRAPH_SETTINGS",
    RunExplorerOperation = "RUN_EXPLORER_OPERATION"
}
export declare type ExcludedOperation = {
    __typename?: 'ExcludedOperation';
    ID: Scalars['ID'];
};
export declare type ExcludedOperationInput = {
    ID: Scalars['ID'];
};
export declare type FeatureIntros = {
    __typename?: 'FeatureIntros';
    devGraph: Scalars['Boolean'];
    federatedGraph: Scalars['Boolean'];
    freeConsumerSeats: Scalars['Boolean'];
};
export declare type FeatureIntrosInput = {
    devGraph: Maybe<Scalars['Boolean']>;
    federatedGraph: Maybe<Scalars['Boolean']>;
    freeConsumerSeats: Maybe<Scalars['Boolean']>;
};
export declare type FederatedImplementingService = {
    __typename?: 'FederatedImplementingService';
    activePartialSchema: PartialSchema;
    createdAt: Scalars['Timestamp'];
    graphID: Scalars['String'];
    graphVariant: Scalars['String'];
    name: Scalars['String'];
    revision: Scalars['String'];
    updatedAt: Scalars['Timestamp'];
    url: Maybe<Scalars['String']>;
};
export declare type FederatedImplementingServicePartialSchema = {
    __typename?: 'FederatedImplementingServicePartialSchema';
    name: Scalars['String'];
    sdl: Scalars['String'];
};
export declare type FederatedImplementingServices = {
    __typename?: 'FederatedImplementingServices';
    services: Array<FederatedImplementingService>;
};
export declare type FieldChangeSummaryCounts = {
    __typename?: 'FieldChangeSummaryCounts';
    additions: Scalars['Int'];
    edits: Scalars['Int'];
    removals: Scalars['Int'];
};
export declare enum FieldLatenciesColumn {
    Field = "FIELD",
    FieldHistogram = "FIELD_HISTOGRAM",
    FieldName = "FIELD_NAME",
    ParentType = "PARENT_TYPE",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    ServiceId = "SERVICE_ID",
    Timestamp = "TIMESTAMP"
}
export declare type FieldLatenciesDimensions = {
    __typename?: 'FieldLatenciesDimensions';
    field: Maybe<Scalars['String']>;
    fieldName: Maybe<Scalars['String']>;
    parentType: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type FieldLatenciesFilter = {
    and: Maybe<Array<FieldLatenciesFilter>>;
    field: Maybe<Scalars['String']>;
    fieldName: Maybe<Scalars['String']>;
    in: Maybe<FieldLatenciesFilterIn>;
    not: Maybe<FieldLatenciesFilter>;
    or: Maybe<Array<FieldLatenciesFilter>>;
    parentType: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type FieldLatenciesFilterIn = {
    field: Maybe<Array<Maybe<Scalars['String']>>>;
    fieldName: Maybe<Array<Maybe<Scalars['String']>>>;
    parentType: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    serviceId: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type FieldLatenciesMetrics = {
    __typename?: 'FieldLatenciesMetrics';
    fieldHistogram: DurationHistogram;
};
export declare type FieldLatenciesOrderBySpec = {
    column: FieldLatenciesColumn;
    direction: Ordering;
};
export declare type FieldLatenciesRecord = {
    __typename?: 'FieldLatenciesRecord';
    groupBy: FieldLatenciesDimensions;
    metrics: FieldLatenciesMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare enum FieldUsageColumn {
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    ExecutionCount = "EXECUTION_COUNT",
    Field = "FIELD",
    FieldName = "FIELD_NAME",
    ParentType = "PARENT_TYPE",
    QueryId = "QUERY_ID",
    QueryName = "QUERY_NAME",
    ReferencingOperationCount = "REFERENCING_OPERATION_COUNT",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    ServiceId = "SERVICE_ID",
    Timestamp = "TIMESTAMP"
}
export declare type FieldUsageDimensions = {
    __typename?: 'FieldUsageDimensions';
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    field: Maybe<Scalars['String']>;
    fieldName: Maybe<Scalars['String']>;
    parentType: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type FieldUsageFilter = {
    and: Maybe<Array<FieldUsageFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    field: Maybe<Scalars['String']>;
    fieldName: Maybe<Scalars['String']>;
    in: Maybe<FieldUsageFilterIn>;
    not: Maybe<FieldUsageFilter>;
    or: Maybe<Array<FieldUsageFilter>>;
    parentType: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type FieldUsageFilterIn = {
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    field: Maybe<Array<Maybe<Scalars['String']>>>;
    fieldName: Maybe<Array<Maybe<Scalars['String']>>>;
    parentType: Maybe<Array<Maybe<Scalars['String']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    queryName: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    serviceId: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type FieldUsageMetrics = {
    __typename?: 'FieldUsageMetrics';
    executionCount: Scalars['Long'];
    referencingOperationCount: Scalars['Long'];
};
export declare type FieldUsageOrderBySpec = {
    column: FieldUsageColumn;
    direction: Ordering;
};
export declare type FieldUsageRecord = {
    __typename?: 'FieldUsageRecord';
    groupBy: FieldUsageDimensions;
    metrics: FieldUsageMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare type FilterBuildInput = {
    __typename?: 'FilterBuildInput';
    filterConfig: FilterConfig;
    schemaHash: Scalars['String'];
};
export declare type FilterConfig = {
    __typename?: 'FilterConfig';
    exclude: Array<Scalars['String']>;
    include: Array<Scalars['String']>;
};
export declare type FilterConfigInput = {
    exclude: Array<Scalars['String']>;
    include: Array<Scalars['String']>;
};
export declare type GitContext = {
    __typename?: 'GitContext';
    branch: Maybe<Scalars['String']>;
    commit: Maybe<Scalars['ID']>;
    commitUrl: Maybe<Scalars['String']>;
    committer: Maybe<Scalars['String']>;
    message: Maybe<Scalars['String']>;
    remoteHost: Maybe<GitRemoteHost>;
    remoteUrl: Maybe<Scalars['String']>;
};
export declare type GitContextInput = {
    branch: Maybe<Scalars['String']>;
    commit: Maybe<Scalars['ID']>;
    committer: Maybe<Scalars['String']>;
    message: Maybe<Scalars['String']>;
    remoteUrl: Maybe<Scalars['String']>;
};
export declare enum GitRemoteHost {
    Bitbucket = "BITBUCKET",
    Github = "GITHUB",
    Gitlab = "GITLAB"
}
export declare type GlobalExperimentalFeatures = {
    __typename?: 'GlobalExperimentalFeatures';
    operationsCollections: Scalars['Boolean'];
    sandboxesFullRelease: Scalars['Boolean'];
    sandboxesPreview: Scalars['Boolean'];
    sandboxesSchemaChecksPage: Scalars['Boolean'];
    sandboxesSchemaDiffPage: Scalars['Boolean'];
};
export declare type GraphApiKey = ApiKey & {
    __typename?: 'GraphApiKey';
    createdAt: Scalars['Timestamp'];
    createdBy: Maybe<Identity>;
    id: Scalars['ID'];
    keyName: Maybe<Scalars['String']>;
    role: UserPermission;
    token: Scalars['String'];
};
export declare type GraphImplementors = FederatedImplementingServices | NonFederatedImplementingService;
export declare type GraphVariant = {
    __typename?: 'GraphVariant';
    activeSchemaPublish: Maybe<SchemaTag>;
    compositionVersion: Scalars['String'];
    contractFilterConfig: Maybe<FilterConfig>;
    defaultHeaders: Maybe<Scalars['String']>;
    derivedVariantCount: Scalars['Int'];
    graph: Service;
    graphId: Scalars['String'];
    id: Scalars['ID'];
    isContract: Scalars['Boolean'];
    isFavoriteOfCurrentUser: Scalars['Boolean'];
    isProtected: Scalars['Boolean'];
    isPublic: Scalars['Boolean'];
    isPubliclyListed: Scalars['Boolean'];
    isVerified: Scalars['Boolean'];
    latestLaunch: Maybe<Launch>;
    launch: Maybe<Launch>;
    launchHistory: Array<Launch>;
    links: Maybe<Array<LinkInfo>>;
    name: Scalars['String'];
    permissions: GraphVariantPermissions;
    preflightScript: Maybe<Scalars['String']>;
    readme: Maybe<Readme>;
    requestsInLastDay: Maybe<Scalars['Long']>;
    sendCookies: Maybe<Scalars['Boolean']>;
    sourceVariant: Maybe<GraphVariant>;
    subscriptionUrl: Maybe<Scalars['String']>;
    supportedDirectives: Maybe<Array<DirectiveSupportStatus>>;
    url: Maybe<Scalars['String']>;
    usageLastReportedAt: Maybe<Scalars['Timestamp']>;
};
export declare type GraphVariantLaunchArgs = {
    id: Scalars['ID'];
};
export declare type GraphVariantLaunchHistoryArgs = {
    limit?: Scalars['Int'];
};
export declare type GraphVariantLookup = GraphVariant | InvalidRefFormat;
export declare type GraphVariantMutation = {
    __typename?: 'GraphVariantMutation';
    addLinkToVariant: GraphVariant;
    configureComposition: Maybe<GraphVariant>;
    enableTagAndInaccessible: Maybe<GraphVariant>;
    graphId: Scalars['String'];
    id: Scalars['ID'];
    name: Scalars['String'];
    relaunch: RelaunchResult;
    removeLinkFromVariant: GraphVariant;
    setIsFavoriteOfCurrentUser: GraphVariant;
    updateDefaultHeaders: Maybe<GraphVariant>;
    updateIsProtected: Maybe<GraphVariant>;
    updatePreflightScript: Maybe<GraphVariant>;
    updateSendCookies: Maybe<GraphVariant>;
    updateSubscriptionURL: Maybe<GraphVariant>;
    updateURL: Maybe<GraphVariant>;
    updateVariantIsPublic: Maybe<GraphVariant>;
    updateVariantIsPubliclyListed: Maybe<GraphVariant>;
    updateVariantIsVerified: Maybe<GraphVariant>;
    updateVariantReadme: Maybe<GraphVariant>;
};
export declare type GraphVariantMutationAddLinkToVariantArgs = {
    title: Maybe<Scalars['String']>;
    type: LinkInfoType;
    url: Scalars['String'];
};
export declare type GraphVariantMutationConfigureCompositionArgs = {
    enableTagAndInaccessible: Maybe<Scalars['Boolean']>;
    version: Maybe<Scalars['String']>;
};
export declare type GraphVariantMutationEnableTagAndInaccessibleArgs = {
    enabled: Scalars['Boolean'];
};
export declare type GraphVariantMutationRemoveLinkFromVariantArgs = {
    linkInfoId: Scalars['ID'];
};
export declare type GraphVariantMutationSetIsFavoriteOfCurrentUserArgs = {
    favorite: Scalars['Boolean'];
};
export declare type GraphVariantMutationUpdateDefaultHeadersArgs = {
    defaultHeaders: Maybe<Scalars['String']>;
};
export declare type GraphVariantMutationUpdateIsProtectedArgs = {
    isProtected: Scalars['Boolean'];
};
export declare type GraphVariantMutationUpdatePreflightScriptArgs = {
    preflightScript: Maybe<Scalars['String']>;
};
export declare type GraphVariantMutationUpdateSendCookiesArgs = {
    sendCookies: Scalars['Boolean'];
};
export declare type GraphVariantMutationUpdateSubscriptionUrlArgs = {
    subscriptionUrl: Maybe<Scalars['String']>;
};
export declare type GraphVariantMutationUpdateUrlArgs = {
    url: Maybe<Scalars['String']>;
};
export declare type GraphVariantMutationUpdateVariantIsPublicArgs = {
    isPublic: Scalars['Boolean'];
};
export declare type GraphVariantMutationUpdateVariantIsPubliclyListedArgs = {
    isPubliclyListed: Scalars['Boolean'];
};
export declare type GraphVariantMutationUpdateVariantIsVerifiedArgs = {
    isVerified: Scalars['Boolean'];
};
export declare type GraphVariantMutationUpdateVariantReadmeArgs = {
    readme: Scalars['String'];
};
export declare type GraphVariantPermissions = {
    __typename?: 'GraphVariantPermissions';
    canManageBuildConfig: Scalars['Boolean'];
    canManageExplorerSettings: Scalars['Boolean'];
    canPushSchemas: Scalars['Boolean'];
    canQueryBuildConfig: Scalars['Boolean'];
    canQuerySchemas: Scalars['Boolean'];
    canUpdateVariantLinkInfo: Scalars['Boolean'];
    canUpdateVariantReadme: Scalars['Boolean'];
};
export declare enum HttpMethod {
    Connect = "CONNECT",
    Delete = "DELETE",
    Get = "GET",
    Head = "HEAD",
    Options = "OPTIONS",
    Patch = "PATCH",
    Post = "POST",
    Put = "PUT",
    Trace = "TRACE",
    Unknown = "UNKNOWN",
    Unrecognized = "UNRECOGNIZED"
}
export declare type HistoricQueryParameters = {
    excludedClients: Maybe<Array<ClientInfoFilter>>;
    from: Maybe<Scalars['Timestamp']>;
    ignoredOperations: Maybe<Array<Scalars['ID']>>;
    includedVariants: Maybe<Array<Scalars['String']>>;
    queryCountThreshold: Maybe<Scalars['Int']>;
    queryCountThresholdPercentage: Maybe<Scalars['Float']>;
    to: Maybe<Scalars['Timestamp']>;
};
export declare type Identity = {
    asActor: Actor;
    id: Scalars['ID'];
    name: Scalars['String'];
};
export declare type IdentityAndClientInfo = {
    __typename?: 'IdentityAndClientInfo';
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    identity: Maybe<Identity>;
};
export declare type IdentityMutation = ServiceMutation | UserMutation;
export declare type IgnoreOperationsInChecksResult = {
    __typename?: 'IgnoreOperationsInChecksResult';
    graph: Service;
};
export declare type ImplementingServiceLocation = {
    __typename?: 'ImplementingServiceLocation';
    name: Scalars['String'];
    path: Scalars['String'];
};
export declare type InternalAdminUser = {
    __typename?: 'InternalAdminUser';
    role: InternalMdgAdminRole;
    userID: Scalars['String'];
};
export declare type InternalIdentity = Identity & {
    __typename?: 'InternalIdentity';
    accounts: Array<Account>;
    asActor: Actor;
    email: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    name: Scalars['String'];
};
export declare enum InternalMdgAdminRole {
    InternalMdgReadOnly = "INTERNAL_MDG_READ_ONLY",
    InternalMdgSales = "INTERNAL_MDG_SALES",
    InternalMdgSuperAdmin = "INTERNAL_MDG_SUPER_ADMIN",
    InternalMdgSupport = "INTERNAL_MDG_SUPPORT"
}
export declare type IntrospectionDirective = {
    __typename?: 'IntrospectionDirective';
    args: Array<IntrospectionInputValue>;
    description: Maybe<Scalars['String']>;
    locations: Array<IntrospectionDirectiveLocation>;
    name: Scalars['String'];
};
export declare type IntrospectionDirectiveInput = {
    args: Array<IntrospectionInputValueInput>;
    description: Maybe<Scalars['String']>;
    isRepeatable: Maybe<Scalars['Boolean']>;
    locations: Array<IntrospectionDirectiveLocation>;
    name: Scalars['String'];
};
export declare enum IntrospectionDirectiveLocation {
    ArgumentDefinition = "ARGUMENT_DEFINITION",
    Enum = "ENUM",
    EnumValue = "ENUM_VALUE",
    Field = "FIELD",
    FieldDefinition = "FIELD_DEFINITION",
    FragmentDefinition = "FRAGMENT_DEFINITION",
    FragmentSpread = "FRAGMENT_SPREAD",
    InlineFragment = "INLINE_FRAGMENT",
    InputFieldDefinition = "INPUT_FIELD_DEFINITION",
    InputObject = "INPUT_OBJECT",
    Interface = "INTERFACE",
    Mutation = "MUTATION",
    Object = "OBJECT",
    Query = "QUERY",
    Scalar = "SCALAR",
    Schema = "SCHEMA",
    Subscription = "SUBSCRIPTION",
    Union = "UNION",
    VariableDefinition = "VARIABLE_DEFINITION"
}
export declare type IntrospectionEnumValue = {
    __typename?: 'IntrospectionEnumValue';
    depreactionReason: Maybe<Scalars['String']>;
    deprecationReason: Maybe<Scalars['String']>;
    description: Maybe<Scalars['String']>;
    isDeprecated: Scalars['Boolean'];
    name: Scalars['String'];
};
export declare type IntrospectionEnumValueInput = {
    deprecationReason: Maybe<Scalars['String']>;
    description: Maybe<Scalars['String']>;
    isDeprecated: Scalars['Boolean'];
    name: Scalars['String'];
};
export declare type IntrospectionField = {
    __typename?: 'IntrospectionField';
    args: Array<IntrospectionInputValue>;
    deprecationReason: Maybe<Scalars['String']>;
    description: Maybe<Scalars['String']>;
    isDeprecated: Scalars['Boolean'];
    name: Scalars['String'];
    type: IntrospectionType;
};
export declare type IntrospectionFieldInput = {
    args: Array<IntrospectionInputValueInput>;
    deprecationReason: Maybe<Scalars['String']>;
    description: Maybe<Scalars['String']>;
    isDeprecated: Scalars['Boolean'];
    name: Scalars['String'];
    type: IntrospectionTypeInput;
};
export declare type IntrospectionInputValue = {
    __typename?: 'IntrospectionInputValue';
    defaultValue: Maybe<Scalars['String']>;
    description: Maybe<Scalars['String']>;
    name: Scalars['String'];
    type: IntrospectionType;
};
export declare type IntrospectionInputValueInput = {
    defaultValue: Maybe<Scalars['String']>;
    deprecationReason: Maybe<Scalars['String']>;
    description: Maybe<Scalars['String']>;
    isDeprecated: Maybe<Scalars['Boolean']>;
    name: Scalars['String'];
    type: IntrospectionTypeInput;
};
export declare type IntrospectionSchema = {
    __typename?: 'IntrospectionSchema';
    directives: Array<IntrospectionDirective>;
    mutationType: Maybe<IntrospectionType>;
    queryType: IntrospectionType;
    subscriptionType: Maybe<IntrospectionType>;
    types: Array<IntrospectionType>;
};
export declare type IntrospectionSchemaTypesArgs = {
    filter?: Maybe<TypeFilterConfig>;
};
export declare type IntrospectionSchemaInput = {
    description: Maybe<Scalars['String']>;
    directives: Array<IntrospectionDirectiveInput>;
    mutationType: Maybe<IntrospectionTypeRefInput>;
    queryType: IntrospectionTypeRefInput;
    subscriptionType: Maybe<IntrospectionTypeRefInput>;
    types: Maybe<Array<IntrospectionTypeInput>>;
};
export declare type IntrospectionType = {
    __typename?: 'IntrospectionType';
    baseKind: Maybe<IntrospectionTypeKind>;
    description: Maybe<Scalars['String']>;
    enumValues: Maybe<Array<IntrospectionEnumValue>>;
    fields: Maybe<Array<IntrospectionField>>;
    inputFields: Maybe<Array<IntrospectionInputValue>>;
    interfaces: Maybe<Array<IntrospectionType>>;
    kind: Maybe<IntrospectionTypeKind>;
    name: Maybe<Scalars['String']>;
    ofType: Maybe<IntrospectionType>;
    possibleTypes: Maybe<Array<IntrospectionType>>;
    printed: Scalars['String'];
};
export declare type IntrospectionTypeEnumValuesArgs = {
    includeDeprecated?: Maybe<Scalars['Boolean']>;
};
export declare type IntrospectionTypeInput = {
    description: Maybe<Scalars['String']>;
    enumValues: Maybe<Array<IntrospectionEnumValueInput>>;
    fields: Maybe<Array<IntrospectionFieldInput>>;
    inputFields: Maybe<Array<IntrospectionInputValueInput>>;
    interfaces: Maybe<Array<IntrospectionTypeInput>>;
    kind: IntrospectionTypeKind;
    name: Maybe<Scalars['String']>;
    ofType: Maybe<IntrospectionTypeInput>;
    possibleTypes: Maybe<Array<IntrospectionTypeInput>>;
    specifiedByUrl: Maybe<Scalars['String']>;
};
export declare enum IntrospectionTypeKind {
    Enum = "ENUM",
    InputObject = "INPUT_OBJECT",
    Interface = "INTERFACE",
    List = "LIST",
    NonNull = "NON_NULL",
    Object = "OBJECT",
    Scalar = "SCALAR",
    Union = "UNION"
}
export declare type IntrospectionTypeRefInput = {
    kind: Maybe<Scalars['String']>;
    name: Scalars['String'];
};
export declare type InvalidOperation = {
    __typename?: 'InvalidOperation';
    errors: Maybe<Array<OperationValidationError>>;
    signature: Scalars['ID'];
};
export declare type InvalidRefFormat = Error & {
    __typename?: 'InvalidRefFormat';
    message: Scalars['String'];
};
export declare type Invoice = {
    __typename?: 'Invoice';
    closedAt: Maybe<Scalars['Timestamp']>;
    collectionMethod: Maybe<Scalars['String']>;
    createdAt: Scalars['Timestamp'];
    invoiceNumber: Scalars['Int'];
    state: InvoiceState;
    totalInCents: Scalars['Int'];
    updatedAt: Scalars['Timestamp'];
    uuid: Scalars['ID'];
};
export declare enum InvoiceState {
    Collected = "COLLECTED",
    Failed = "FAILED",
    Open = "OPEN",
    PastDue = "PAST_DUE",
    Unknown = "UNKNOWN"
}
export declare type Launch = {
    __typename?: 'Launch';
    approvedAt: Maybe<Scalars['Timestamp']>;
    build: Maybe<Build>;
    buildInput: BuildInput;
    completedAt: Maybe<Scalars['Timestamp']>;
    createdAt: Scalars['Timestamp'];
    downstreamLaunches: Maybe<Array<Launch>>;
    id: Scalars['ID'];
    isAvailable: Maybe<Scalars['Boolean']>;
    isCompleted: Maybe<Scalars['Boolean']>;
    isPublished: Maybe<Scalars['Boolean']>;
    isTarget: Maybe<Scalars['Boolean']>;
    latestSequenceStep: Maybe<LaunchSequenceStep>;
    results: Array<LaunchResult>;
    schemaTag: Maybe<SchemaTag>;
    sequence: Array<LaunchSequenceStep>;
    shortenedID: Scalars['String'];
    status: LaunchStatus;
    subgraphChanges: Maybe<Array<SubgraphChange>>;
    supersededAt: Maybe<Scalars['Timestamp']>;
    supersededBy: Maybe<Launch>;
};
export declare type LaunchResult = ChangelogLaunchResult;
export declare type LaunchSequenceBuildStep = {
    __typename?: 'LaunchSequenceBuildStep';
    completedAt: Maybe<Scalars['Timestamp']>;
    startedAt: Maybe<Scalars['Timestamp']>;
};
export declare type LaunchSequenceCheckStep = {
    __typename?: 'LaunchSequenceCheckStep';
    completedAt: Maybe<Scalars['Timestamp']>;
    startedAt: Maybe<Scalars['Timestamp']>;
};
export declare type LaunchSequenceCompletedStep = {
    __typename?: 'LaunchSequenceCompletedStep';
    completedAt: Maybe<Scalars['Timestamp']>;
};
export declare type LaunchSequenceInitiatedStep = {
    __typename?: 'LaunchSequenceInitiatedStep';
    startedAt: Maybe<Scalars['Timestamp']>;
};
export declare type LaunchSequencePublishStep = {
    __typename?: 'LaunchSequencePublishStep';
    completedAt: Maybe<Scalars['Timestamp']>;
    startedAt: Maybe<Scalars['Timestamp']>;
};
export declare type LaunchSequenceStep = LaunchSequenceBuildStep | LaunchSequenceCheckStep | LaunchSequenceCompletedStep | LaunchSequenceInitiatedStep | LaunchSequencePublishStep | LaunchSequenceSupersededStep;
export declare type LaunchSequenceSupersededStep = {
    __typename?: 'LaunchSequenceSupersededStep';
    completedAt: Maybe<Scalars['Timestamp']>;
};
export declare enum LaunchStatus {
    LaunchCompleted = "LAUNCH_COMPLETED",
    LaunchFailed = "LAUNCH_FAILED",
    LaunchInitiated = "LAUNCH_INITIATED"
}
export declare type LinkInfo = {
    __typename?: 'LinkInfo';
    createdAt: Scalars['Timestamp'];
    id: Scalars['ID'];
    title: Maybe<Scalars['String']>;
    type: LinkInfoType;
    url: Scalars['String'];
};
export declare enum LinkInfoType {
    DeveloperPortal = "DEVELOPER_PORTAL",
    Other = "OTHER",
    Repository = "REPOSITORY"
}
export declare type MarkChangesForOperationAsSafeResult = {
    __typename?: 'MarkChangesForOperationAsSafeResult';
    affectedOperation: Maybe<AffectedQuery>;
    message: Scalars['String'];
    success: Scalars['Boolean'];
};
export declare type MediaUploadInfo = {
    __typename?: 'MediaUploadInfo';
    csrfToken: Scalars['String'];
    maxContentLength: Scalars['Int'];
    url: Scalars['String'];
};
export declare type Mutation = {
    __typename?: 'Mutation';
    account: Maybe<AccountMutation>;
    finalizePasswordReset: Maybe<Scalars['String']>;
    joinAccount: Maybe<Account>;
    me: Maybe<IdentityMutation>;
    newAccount: Maybe<Account>;
    newService: Maybe<Service>;
    plansRefreshBilling: Maybe<Scalars['Void']>;
    reportSchema: Maybe<ReportSchemaResult>;
    resetPassword: Maybe<Scalars['Void']>;
    resolveAllInternalCronExecutions: Maybe<Scalars['Void']>;
    resolveInternalCronExecution: Maybe<CronExecution>;
    service: Maybe<ServiceMutation>;
    setSubscriptions: Maybe<EmailPreferences>;
    setUserSettings: Maybe<UserSettings>;
    signUp: Maybe<User>;
    submitPostDeletionFeedback: Maybe<Scalars['Void']>;
    track: Maybe<Scalars['Void']>;
    unsubscribeFromAll: Maybe<EmailPreferences>;
    user: Maybe<UserMutation>;
};
export declare type MutationAccountArgs = {
    id: Scalars['ID'];
};
export declare type MutationFinalizePasswordResetArgs = {
    newPassword: Scalars['String'];
    resetToken: Scalars['String'];
};
export declare type MutationJoinAccountArgs = {
    accountId: Scalars['ID'];
    joinToken: Scalars['String'];
};
export declare type MutationNewAccountArgs = {
    companyUrl: Maybe<Scalars['String']>;
    id: Scalars['ID'];
};
export declare type MutationNewServiceArgs = {
    accountId: Scalars['ID'];
    description: Maybe<Scalars['String']>;
    hiddenFromUninvitedNonAdminAccountMembers?: Scalars['Boolean'];
    id: Scalars['ID'];
    isDev?: Scalars['Boolean'];
    name: Maybe<Scalars['String']>;
    title: Maybe<Scalars['String']>;
};
export declare type MutationReportSchemaArgs = {
    coreSchema: Maybe<Scalars['String']>;
    report: SchemaReport;
};
export declare type MutationResetPasswordArgs = {
    email: Scalars['String'];
};
export declare type MutationResolveAllInternalCronExecutionsArgs = {
    group: Maybe<Scalars['String']>;
    name: Maybe<Scalars['String']>;
};
export declare type MutationResolveInternalCronExecutionArgs = {
    id: Scalars['ID'];
};
export declare type MutationServiceArgs = {
    id: Scalars['ID'];
};
export declare type MutationSetSubscriptionsArgs = {
    email: Scalars['String'];
    subscriptions: Array<EmailCategory>;
    token: Scalars['String'];
};
export declare type MutationSetUserSettingsArgs = {
    newSettings: Maybe<UserSettingsInput>;
};
export declare type MutationSignUpArgs = {
    email: Scalars['String'];
    fullName: Scalars['String'];
    password: Scalars['String'];
    referrer: Maybe<Scalars['String']>;
    trackingGoogleClientId: Maybe<Scalars['String']>;
    trackingMarketoClientId: Maybe<Scalars['String']>;
    userSegment: Maybe<UserSegment>;
    utmCampaign: Maybe<Scalars['String']>;
    utmMedium: Maybe<Scalars['String']>;
    utmSource: Maybe<Scalars['String']>;
};
export declare type MutationSubmitPostDeletionFeedbackArgs = {
    feedback: Scalars['String'];
    targetIdentifier: Scalars['ID'];
    targetType: DeletionTargetType;
};
export declare type MutationTrackArgs = {
    event: EventEnum;
    graphID: Scalars['String'];
    graphVariant?: Scalars['String'];
};
export declare type MutationUnsubscribeFromAllArgs = {
    email: Scalars['String'];
    token: Scalars['String'];
};
export declare type MutationUserArgs = {
    id: Scalars['ID'];
};
export declare type NamedIntrospectionArg = {
    __typename?: 'NamedIntrospectionArg';
    description: Maybe<Scalars['String']>;
    name: Maybe<Scalars['String']>;
};
export declare type NamedIntrospectionArgNoDescription = {
    __typename?: 'NamedIntrospectionArgNoDescription';
    name: Maybe<Scalars['String']>;
};
export declare type NamedIntrospectionType = {
    __typename?: 'NamedIntrospectionType';
    description: Maybe<Scalars['String']>;
    kind: Maybe<IntrospectionTypeKind>;
    name: Maybe<Scalars['String']>;
};
export declare type NamedIntrospectionTypeNoDescription = {
    __typename?: 'NamedIntrospectionTypeNoDescription';
    name: Maybe<Scalars['String']>;
};
export declare type NamedIntrospectionValue = {
    __typename?: 'NamedIntrospectionValue';
    description: Maybe<Scalars['String']>;
    name: Maybe<Scalars['String']>;
    printedType: Maybe<Scalars['String']>;
};
export declare type NamedIntrospectionValueNoDescription = {
    __typename?: 'NamedIntrospectionValueNoDescription';
    name: Maybe<Scalars['String']>;
    printedType: Maybe<Scalars['String']>;
};
export declare type NonFederatedImplementingService = {
    __typename?: 'NonFederatedImplementingService';
    createdAt: Scalars['Timestamp'];
    graphID: Scalars['String'];
    graphVariant: Scalars['String'];
};
export declare type OdysseyCourse = {
    __typename?: 'OdysseyCourse';
    completedAt: Maybe<Scalars['Timestamp']>;
    enrolledAt: Maybe<Scalars['Timestamp']>;
    id: Scalars['ID'];
};
export declare type OdysseyCourseInput = {
    completedAt: Maybe<Scalars['Timestamp']>;
    courseId: Scalars['String'];
};
export declare type OdysseyTask = {
    __typename?: 'OdysseyTask';
    completedAt: Maybe<Scalars['Timestamp']>;
    id: Scalars['ID'];
    value: Maybe<Scalars['String']>;
};
export declare type OdysseyTaskInput = {
    completedAt: Maybe<Scalars['Timestamp']>;
    taskId: Scalars['String'];
    value: Maybe<Scalars['String']>;
};
export declare type Operation = {
    __typename?: 'Operation';
    id: Scalars['ID'];
    name: Maybe<Scalars['String']>;
    signature: Maybe<Scalars['String']>;
    truncated: Scalars['Boolean'];
};
export declare type OperationAcceptedChange = {
    __typename?: 'OperationAcceptedChange';
    acceptedAt: Scalars['Timestamp'];
    acceptedBy: Identity;
    change: StoredApprovedChange;
    checkID: Scalars['ID'];
    graphID: Scalars['ID'];
    id: Scalars['ID'];
    operationID: Scalars['String'];
};
export declare enum OperationCheckStatsColumn {
    CachedRequestsCount = "CACHED_REQUESTS_COUNT",
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    QueryId = "QUERY_ID",
    SchemaTag = "SCHEMA_TAG",
    ServiceId = "SERVICE_ID",
    Timestamp = "TIMESTAMP",
    UncachedRequestsCount = "UNCACHED_REQUESTS_COUNT"
}
export declare type OperationCheckStatsDimensions = {
    __typename?: 'OperationCheckStatsDimensions';
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type OperationCheckStatsFilter = {
    and: Maybe<Array<OperationCheckStatsFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    in: Maybe<OperationCheckStatsFilterIn>;
    not: Maybe<OperationCheckStatsFilter>;
    or: Maybe<Array<OperationCheckStatsFilter>>;
    queryId: Maybe<Scalars['ID']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type OperationCheckStatsFilterIn = {
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    serviceId: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type OperationCheckStatsMetrics = {
    __typename?: 'OperationCheckStatsMetrics';
    cachedRequestsCount: Scalars['Long'];
    uncachedRequestsCount: Scalars['Long'];
};
export declare type OperationCheckStatsOrderBySpec = {
    column: OperationCheckStatsColumn;
    direction: Ordering;
};
export declare type OperationCheckStatsRecord = {
    __typename?: 'OperationCheckStatsRecord';
    groupBy: OperationCheckStatsDimensions;
    metrics: OperationCheckStatsMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare type OperationDocument = {
    __typename?: 'OperationDocument';
    body: Scalars['String'];
    name: Maybe<Scalars['String']>;
};
export declare type OperationDocumentInput = {
    body: Scalars['String'];
    name: Maybe<Scalars['String']>;
};
export declare type OperationValidationError = {
    __typename?: 'OperationValidationError';
    message: Scalars['String'];
};
export declare type OperationsCheckResult = {
    __typename?: 'OperationsCheckResult';
    affectedQueries: Maybe<Array<AffectedQuery>>;
    changeSummary: ChangeSummary;
    changes: Array<Change>;
    checkSeverity: ChangeSeverity;
    checkedVariant: GraphVariant;
    createdAt: Scalars['Timestamp'];
    id: Scalars['ID'];
    numberOfAffectedOperations: Scalars['Int'];
    numberOfCheckedOperations: Scalars['Int'];
    workflowTask: OperationsCheckTask;
};
export declare type OperationsCheckTask = CheckWorkflowTask & {
    __typename?: 'OperationsCheckTask';
    completedAt: Maybe<Scalars['Timestamp']>;
    createdAt: Scalars['Timestamp'];
    id: Scalars['ID'];
    result: Maybe<OperationsCheckResult>;
    status: CheckWorkflowTaskStatus;
    workflow: CheckWorkflow;
};
export declare type OperationsCollection = {
    __typename?: 'OperationsCollection';
    id: Scalars['ID'];
};
export declare enum Ordering {
    Ascending = "ASCENDING",
    Descending = "DESCENDING"
}
export declare type OrganizationInviteLink = {
    __typename?: 'OrganizationInviteLink';
    createdAt: Scalars['Timestamp'];
    joinToken: Scalars['String'];
    role: UserPermission;
};
export declare type OrganizationSso = {
    __typename?: 'OrganizationSSO';
    defaultRole: UserPermission;
    idpid: Scalars['ID'];
    provider: OrganizationSsoProvider;
};
export declare enum OrganizationSsoProvider {
    Pingone = "PINGONE"
}
export declare type PagerDutyChannel = Channel & {
    __typename?: 'PagerDutyChannel';
    id: Scalars['ID'];
    name: Scalars['String'];
    routingKey: Scalars['String'];
    subscriptions: Array<ChannelSubscription>;
};
export declare type PagerDutyChannelInput = {
    name: Maybe<Scalars['String']>;
    routingKey: Scalars['String'];
};
export declare type PartialSchema = {
    __typename?: 'PartialSchema';
    createdAt: Scalars['Timestamp'];
    isLive: Scalars['Boolean'];
    sdl: Scalars['String'];
    sdlPath: Scalars['String'];
};
export declare type PartialSchemaInput = {
    hash: Maybe<Scalars['String']>;
    sdl: Maybe<Scalars['String']>;
};
export declare type PromoteSchemaError = {
    __typename?: 'PromoteSchemaError';
    code: PromoteSchemaErrorCode;
    message: Scalars['String'];
};
export declare enum PromoteSchemaErrorCode {
    CannotPromoteSchemaForFederatedGraph = "CANNOT_PROMOTE_SCHEMA_FOR_FEDERATED_GRAPH"
}
export declare type PromoteSchemaResponse = {
    __typename?: 'PromoteSchemaResponse';
    code: PromoteSchemaResponseCode;
    tag: SchemaTag;
};
export declare enum PromoteSchemaResponseCode {
    NoChangesDetected = "NO_CHANGES_DETECTED",
    PromotionSuccess = "PROMOTION_SUCCESS"
}
export declare type PromoteSchemaResponseOrError = PromoteSchemaError | PromoteSchemaResponse;
export declare type Protobuf = {
    __typename?: 'Protobuf';
    json: Maybe<Scalars['String']>;
    object: Maybe<Scalars['Object']>;
    raw: Scalars['Blob'];
    text: Scalars['String'];
};
export declare type Query = {
    __typename?: 'Query';
    _odysseyFakeField: Maybe<Scalars['Boolean']>;
    account: Maybe<Account>;
    accountIDAvailable: Scalars['Boolean'];
    allAccounts: Maybe<Array<Account>>;
    allPlans: Array<BillingPlan>;
    allServices: Maybe<Array<Service>>;
    allTimezoneOffsets: Array<TimezoneOffset>;
    allUsers: Maybe<Array<User>>;
    canBypassPlanRestrictions: Scalars['Boolean'];
    diffSchemas: Array<Change>;
    emailPreferences: Maybe<EmailPreferences>;
    experimentalFeatures: GlobalExperimentalFeatures;
    frontendUrlRoot: Scalars['String'];
    helloWorldBilling: Maybe<Scalars['String']>;
    helloWorldOperationsCollections: Maybe<Scalars['String']>;
    internalActiveCronJobs: Array<CronJob>;
    internalAdminUsers: Maybe<Array<InternalAdminUser>>;
    internalUnresolvedCronExecutionFailures: Array<CronExecution>;
    me: Maybe<Identity>;
    plan: Maybe<BillingPlan>;
    publiclyListedVariants: Maybe<Array<GraphVariant>>;
    service: Maybe<Service>;
    stats: StatsWindow;
    studioSettings: Maybe<UserSettings>;
    teamPlan: BillingPlan;
    trialPlan: BillingPlan;
    user: Maybe<User>;
    variant: Maybe<GraphVariantLookup>;
};
export declare type QueryAccountArgs = {
    id: Scalars['ID'];
};
export declare type QueryAccountIdAvailableArgs = {
    id: Scalars['ID'];
};
export declare type QueryAllAccountsArgs = {
    search: Maybe<Scalars['String']>;
    tier: Maybe<BillingPlanTier>;
};
export declare type QueryAllServicesArgs = {
    search: Maybe<Scalars['String']>;
};
export declare type QueryAllUsersArgs = {
    search: Maybe<Scalars['String']>;
};
export declare type QueryDiffSchemasArgs = {
    baseSchema: Scalars['String'];
    nextSchema: Scalars['String'];
};
export declare type QueryEmailPreferencesArgs = {
    email: Scalars['String'];
    token: Scalars['String'];
};
export declare type QueryPlanArgs = {
    id: Maybe<Scalars['ID']>;
};
export declare type QueryServiceArgs = {
    id: Scalars['ID'];
};
export declare type QueryStatsArgs = {
    from: Scalars['Timestamp'];
    resolution: Maybe<Resolution>;
    to: Maybe<Scalars['Timestamp']>;
};
export declare type QueryTeamPlanArgs = {
    billingPeriod: BillingPeriod;
};
export declare type QueryUserArgs = {
    id: Scalars['ID'];
};
export declare type QueryVariantArgs = {
    ref: Scalars['ID'];
};
export declare type QueryDocumentInput = {
    document: Maybe<Scalars['String']>;
};
export declare enum QueryStatsColumn {
    AccountId = "ACCOUNT_ID",
    CachedHistogram = "CACHED_HISTOGRAM",
    CachedRequestsCount = "CACHED_REQUESTS_COUNT",
    CacheTtlHistogram = "CACHE_TTL_HISTOGRAM",
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    ForbiddenOperationCount = "FORBIDDEN_OPERATION_COUNT",
    FromEngineproxy = "FROM_ENGINEPROXY",
    QueryId = "QUERY_ID",
    QueryName = "QUERY_NAME",
    RegisteredOperationCount = "REGISTERED_OPERATION_COUNT",
    RequestsWithErrorsCount = "REQUESTS_WITH_ERRORS_COUNT",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    ServiceId = "SERVICE_ID",
    Timestamp = "TIMESTAMP",
    UncachedHistogram = "UNCACHED_HISTOGRAM",
    UncachedRequestsCount = "UNCACHED_REQUESTS_COUNT"
}
export declare type QueryStatsDimensions = {
    __typename?: 'QueryStatsDimensions';
    accountId: Maybe<Scalars['ID']>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    fromEngineproxy: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    querySignature: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type QueryStatsFilter = {
    accountId: Maybe<Scalars['ID']>;
    and: Maybe<Array<QueryStatsFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    fromEngineproxy: Maybe<Scalars['String']>;
    in: Maybe<QueryStatsFilterIn>;
    not: Maybe<QueryStatsFilter>;
    or: Maybe<Array<QueryStatsFilter>>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
};
export declare type QueryStatsFilterIn = {
    accountId: Maybe<Array<Maybe<Scalars['ID']>>>;
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    fromEngineproxy: Maybe<Array<Maybe<Scalars['String']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    queryName: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    serviceId: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type QueryStatsMetrics = {
    __typename?: 'QueryStatsMetrics';
    cacheTtlHistogram: DurationHistogram;
    cachedHistogram: DurationHistogram;
    cachedRequestsCount: Scalars['Long'];
    forbiddenOperationCount: Scalars['Long'];
    registeredOperationCount: Scalars['Long'];
    requestsWithErrorsCount: Scalars['Long'];
    totalLatencyHistogram: DurationHistogram;
    totalRequestCount: Scalars['Long'];
    uncachedHistogram: DurationHistogram;
    uncachedRequestsCount: Scalars['Long'];
};
export declare type QueryStatsOrderBySpec = {
    column: QueryStatsColumn;
    direction: Ordering;
};
export declare type QueryStatsRecord = {
    __typename?: 'QueryStatsRecord';
    groupBy: QueryStatsDimensions;
    metrics: QueryStatsMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare type QueryTrigger = ChannelSubscription & {
    __typename?: 'QueryTrigger';
    channels: Array<Channel>;
    comparisonOperator: ComparisonOperator;
    enabled: Scalars['Boolean'];
    excludedOperationNames: Array<Scalars['String']>;
    id: Scalars['ID'];
    metric: QueryTriggerMetric;
    operationNames: Array<Scalars['String']>;
    percentile: Maybe<Scalars['Float']>;
    scope: QueryTriggerScope;
    serviceId: Scalars['String'];
    state: QueryTriggerState;
    threshold: Scalars['Float'];
    variant: Maybe<Scalars['String']>;
    window: QueryTriggerWindow;
};
export declare type QueryTriggerInput = {
    channelIds: Maybe<Array<Scalars['String']>>;
    comparisonOperator: ComparisonOperator;
    enabled: Maybe<Scalars['Boolean']>;
    excludedOperationNames: Maybe<Array<Scalars['String']>>;
    metric: QueryTriggerMetric;
    operationNames: Maybe<Array<Scalars['String']>>;
    percentile: Maybe<Scalars['Float']>;
    scope: Maybe<QueryTriggerScope>;
    threshold: Scalars['Float'];
    variant: Maybe<Scalars['String']>;
    window: QueryTriggerWindow;
};
export declare enum QueryTriggerMetric {
    ErrorCount = "ERROR_COUNT",
    ErrorPercentage = "ERROR_PERCENTAGE",
    RequestCount = "REQUEST_COUNT",
    RequestServiceTime = "REQUEST_SERVICE_TIME"
}
export declare enum QueryTriggerScope {
    All = "ALL",
    Any = "ANY",
    Unrecognized = "UNRECOGNIZED"
}
export declare type QueryTriggerState = {
    __typename?: 'QueryTriggerState';
    evaluatedAt: Scalars['Timestamp'];
    lastTriggeredAt: Maybe<Scalars['Timestamp']>;
    operations: Array<QueryTriggerStateOperation>;
    triggered: Scalars['Boolean'];
};
export declare type QueryTriggerStateOperation = {
    __typename?: 'QueryTriggerStateOperation';
    count: Scalars['Long'];
    operation: Scalars['String'];
    triggered: Scalars['Boolean'];
    value: Scalars['Float'];
};
export declare enum QueryTriggerWindow {
    FifteenMinutes = "FIFTEEN_MINUTES",
    FiveMinutes = "FIVE_MINUTES",
    OneMinute = "ONE_MINUTE",
    Unrecognized = "UNRECOGNIZED"
}
export declare type Readme = {
    __typename?: 'Readme';
    content: Scalars['String'];
    id: Scalars['ID'];
    lastUpdatedAt: Scalars['Timestamp'];
    lastUpdatedBy: Maybe<Identity>;
};
export declare type RegisterOperationsMutationResponse = {
    __typename?: 'RegisterOperationsMutationResponse';
    invalidOperations: Maybe<Array<InvalidOperation>>;
    newOperations: Maybe<Array<RegisteredOperation>>;
    registrationSuccess: Scalars['Boolean'];
};
export declare type RegisteredClientIdentityInput = {
    identifier: Scalars['String'];
    name: Scalars['String'];
    version: Maybe<Scalars['String']>;
};
export declare type RegisteredOperation = {
    __typename?: 'RegisteredOperation';
    signature: Scalars['ID'];
};
export declare type RegisteredOperationInput = {
    document: Maybe<Scalars['String']>;
    metadata: Maybe<RegisteredOperationMetadataInput>;
    signature: Scalars['ID'];
};
export declare type RegisteredOperationMetadataInput = {
    engineSignature: Maybe<Scalars['String']>;
};
export declare type RegistryApiKey = {
    __typename?: 'RegistryApiKey';
    keyName: Maybe<Scalars['String']>;
    token: Scalars['String'];
};
export declare type RegistryStatsWindow = {
    __typename?: 'RegistryStatsWindow';
    schemaCheckStats: Array<AccountChecksStatsRecord>;
    schemaPublishStats: Array<AccountPublishesStatsRecord>;
};
export declare type RegistrySubscription = ChannelSubscription & {
    __typename?: 'RegistrySubscription';
    channel: Maybe<Channel>;
    channels: Array<Channel>;
    createdAt: Scalars['Timestamp'];
    enabled: Scalars['Boolean'];
    id: Scalars['ID'];
    lastUpdatedAt: Scalars['Timestamp'];
    options: SubscriptionOptions;
    variant: Maybe<Scalars['String']>;
};
export declare type RelaunchComplete = {
    __typename?: 'RelaunchComplete';
    latestLaunch: Launch;
    updated: Scalars['Boolean'];
};
export declare type RelaunchError = {
    __typename?: 'RelaunchError';
    message: Scalars['String'];
};
export declare type RelaunchResult = RelaunchComplete | RelaunchError;
export declare type ReportSchemaError = ReportSchemaResult & {
    __typename?: 'ReportSchemaError';
    code: ReportSchemaErrorCode;
    inSeconds: Scalars['Int'];
    message: Scalars['String'];
    withCoreSchema: Scalars['Boolean'];
};
export declare enum ReportSchemaErrorCode {
    BootIdIsNotValidUuid = "BOOT_ID_IS_NOT_VALID_UUID",
    BootIdIsRequired = "BOOT_ID_IS_REQUIRED",
    CoreSchemaHashIsNotSchemaSha256 = "CORE_SCHEMA_HASH_IS_NOT_SCHEMA_SHA256",
    CoreSchemaHashIsRequired = "CORE_SCHEMA_HASH_IS_REQUIRED",
    CoreSchemaHashIsTooLong = "CORE_SCHEMA_HASH_IS_TOO_LONG",
    ExecutableSchemaIdIsNotSchemaSha256 = "EXECUTABLE_SCHEMA_ID_IS_NOT_SCHEMA_SHA256",
    ExecutableSchemaIdIsRequired = "EXECUTABLE_SCHEMA_ID_IS_REQUIRED",
    ExecutableSchemaIdIsTooLong = "EXECUTABLE_SCHEMA_ID_IS_TOO_LONG",
    GraphRefInvalidFormat = "GRAPH_REF_INVALID_FORMAT",
    GraphRefIsRequired = "GRAPH_REF_IS_REQUIRED",
    GraphVariantDoesNotMatchRegex = "GRAPH_VARIANT_DOES_NOT_MATCH_REGEX",
    GraphVariantIsRequired = "GRAPH_VARIANT_IS_REQUIRED",
    LibraryVersionIsTooLong = "LIBRARY_VERSION_IS_TOO_LONG",
    PlatformIsTooLong = "PLATFORM_IS_TOO_LONG",
    RuntimeVersionIsTooLong = "RUNTIME_VERSION_IS_TOO_LONG",
    SchemaIsNotParsable = "SCHEMA_IS_NOT_PARSABLE",
    SchemaIsNotValid = "SCHEMA_IS_NOT_VALID",
    ServerIdIsTooLong = "SERVER_ID_IS_TOO_LONG",
    UserVersionIsTooLong = "USER_VERSION_IS_TOO_LONG"
}
export declare type ReportSchemaResponse = ReportSchemaResult & {
    __typename?: 'ReportSchemaResponse';
    inSeconds: Scalars['Int'];
    withCoreSchema: Scalars['Boolean'];
};
export declare type ReportSchemaResult = {
    inSeconds: Scalars['Int'];
    withCoreSchema: Scalars['Boolean'];
};
export declare type ReportServerInfoError = ReportServerInfoResult & {
    __typename?: 'ReportServerInfoError';
    code: ReportSchemaErrorCode;
    inSeconds: Scalars['Int'];
    message: Scalars['String'];
    withExecutableSchema: Scalars['Boolean'];
};
export declare type ReportServerInfoResponse = ReportServerInfoResult & {
    __typename?: 'ReportServerInfoResponse';
    inSeconds: Scalars['Int'];
    withExecutableSchema: Scalars['Boolean'];
};
export declare type ReportServerInfoResult = {
    inSeconds: Scalars['Int'];
    withExecutableSchema: Scalars['Boolean'];
};
export declare enum Resolution {
    R1D = "R1D",
    R1H = "R1H",
    R1M = "R1M",
    R5M = "R5M",
    R6H = "R6H",
    R15M = "R15M"
}
export declare enum ResponseHints {
    None = "NONE",
    SampleResponses = "SAMPLE_RESPONSES",
    Subgraphs = "SUBGRAPHS",
    Timings = "TIMINGS",
    TraceTimings = "TRACE_TIMINGS"
}
export declare type RoleOverride = {
    __typename?: 'RoleOverride';
    graph: Service;
    lastUpdatedAt: Scalars['Timestamp'];
    role: UserPermission;
    user: User;
};
export declare type ScheduledSummary = ChannelSubscription & {
    __typename?: 'ScheduledSummary';
    channel: Maybe<Channel>;
    channels: Array<Channel>;
    enabled: Scalars['Boolean'];
    id: Scalars['ID'];
    timezone: Scalars['String'];
    variant: Scalars['String'];
};
export declare type Schema = {
    __typename?: 'Schema';
    createTemporaryURL: Maybe<TemporaryUrl>;
    createdAt: Scalars['Timestamp'];
    document: Scalars['GraphQLDocument'];
    fieldCount: Scalars['Int'];
    gitContext: Maybe<GitContext>;
    hash: Scalars['ID'];
    introspection: IntrospectionSchema;
    typeCount: Scalars['Int'];
};
export declare type SchemaCreateTemporaryUrlArgs = {
    expiresInSeconds?: Scalars['Int'];
};
export declare type SchemaCompositionError = {
    __typename?: 'SchemaCompositionError';
    code: Maybe<Scalars['String']>;
    locations: Array<Maybe<SourceLocation>>;
    message: Scalars['String'];
};
export declare type SchemaDiff = {
    __typename?: 'SchemaDiff';
    affectedClients: Maybe<Array<AffectedClient>>;
    affectedQueries: Maybe<Array<AffectedQuery>>;
    changeSummary: ChangeSummary;
    changes: Array<Change>;
    numberOfAffectedOperations: Scalars['Int'];
    numberOfCheckedOperations: Maybe<Scalars['Int']>;
    severity: ChangeSeverity;
    tag: Maybe<Scalars['String']>;
    type: ChangeType;
    validationConfig: Maybe<SchemaDiffValidationConfig>;
};
export declare type SchemaDiffValidationConfig = {
    __typename?: 'SchemaDiffValidationConfig';
    excludedClients: Maybe<Array<ClientInfoFilterOutput>>;
    from: Maybe<Scalars['Timestamp']>;
    ignoredOperations: Maybe<Array<Scalars['ID']>>;
    includedVariants: Maybe<Array<Scalars['String']>>;
    queryCountThreshold: Maybe<Scalars['Int']>;
    queryCountThresholdPercentage: Maybe<Scalars['Float']>;
    to: Maybe<Scalars['Timestamp']>;
};
export declare type SchemaPublishSubscription = ChannelSubscription & {
    __typename?: 'SchemaPublishSubscription';
    channels: Array<Channel>;
    createdAt: Scalars['Timestamp'];
    enabled: Scalars['Boolean'];
    id: Scalars['ID'];
    lastUpdatedAt: Scalars['Timestamp'];
    variant: Maybe<Scalars['String']>;
};
export declare type SchemaReport = {
    bootId: Scalars['String'];
    coreSchemaHash: Scalars['String'];
    graphRef: Scalars['String'];
    libraryVersion: Maybe<Scalars['String']>;
    platform: Maybe<Scalars['String']>;
    runtimeVersion: Maybe<Scalars['String']>;
    serverId: Maybe<Scalars['String']>;
    userVersion: Maybe<Scalars['String']>;
};
export declare type SchemaTag = {
    __typename?: 'SchemaTag';
    compositionResult: Maybe<CompositionResult>;
    createdAt: Scalars['Timestamp'];
    diffToPrevious: Maybe<SchemaDiff>;
    gitContext: Maybe<GitContext>;
    history: Array<SchemaTag>;
    historyLength: Scalars['Int'];
    historyOrder: Scalars['Int'];
    id: Scalars['ID'];
    publishedAt: Scalars['Timestamp'];
    publishedBy: Maybe<IdentityAndClientInfo>;
    reversionFrom: Maybe<SchemaTag>;
    schema: Schema;
    slackNotificationBody: Maybe<Scalars['String']>;
    tag: Scalars['String'];
    variant: GraphVariant;
    webhookNotificationBody: Scalars['String'];
};
export declare type SchemaTagHistoryArgs = {
    includeUnchanged?: Scalars['Boolean'];
    limit?: Scalars['Int'];
    offset?: Maybe<Scalars['Int']>;
};
export declare type SchemaTagSlackNotificationBodyArgs = {
    graphDisplayName: Scalars['String'];
};
export declare type Seats = {
    __typename?: 'Seats';
    free: Scalars['Int'];
    fullPrice: Scalars['Int'];
};
export declare type SemanticChange = {
    __typename?: 'SemanticChange';
    argNode: Maybe<NamedIntrospectionArg>;
    childNode: Maybe<NamedIntrospectionValue>;
    definition: ChangeDefinition;
    parentNode: Maybe<NamedIntrospectionType>;
};
export declare type Service = Identity & {
    __typename?: 'Service';
    account: Maybe<Account>;
    accountId: Maybe<Scalars['ID']>;
    apiKeys: Maybe<Array<GraphApiKey>>;
    asActor: Actor;
    avatarUpload: Maybe<AvatarUploadResult>;
    avatarUrl: Maybe<Scalars['String']>;
    channels: Maybe<Array<Channel>>;
    checkConfiguration: Maybe<CheckConfiguration>;
    checkWorkflow: Maybe<CheckWorkflow>;
    checkWorkflows: Array<CheckWorkflow>;
    checksAuthorOptions: Array<Scalars['String']>;
    checksBranchOptions: Array<Scalars['String']>;
    checksSubgraphOptions: Array<Scalars['String']>;
    compositionResultById: Maybe<CompositionResult>;
    createdAt: Scalars['Timestamp'];
    createdBy: Maybe<Identity>;
    datadogMetricsConfig: Maybe<DatadogMetricsConfig>;
    deletedAt: Maybe<Scalars['Timestamp']>;
    description: Maybe<Scalars['String']>;
    devGraphOwner: Maybe<User>;
    document: Maybe<Scalars['String']>;
    hiddenFromUninvitedNonAdminAccountMembers: Scalars['Boolean'];
    id: Scalars['ID'];
    implementingServices: Maybe<GraphImplementors>;
    lastReportedAt: Maybe<Scalars['Timestamp']>;
    me: Maybe<Identity>;
    mostRecentCompositionPublish: Maybe<CompositionPublishResult>;
    myRole: Maybe<UserPermission>;
    name: Scalars['String'];
    operation: Maybe<Operation>;
    operationsAcceptedChanges: Array<OperationAcceptedChange>;
    operationsCheck: Maybe<OperationsCheckResult>;
    queryTriggers: Maybe<Array<QueryTrigger>>;
    readme: Maybe<Readme>;
    registrySubscriptionsEnabled: Scalars['Boolean'];
    reportingEnabled: Scalars['Boolean'];
    roleOverrides: Maybe<Array<RoleOverride>>;
    roles: Maybe<ServiceRoles>;
    scheduledSummaries: Array<ScheduledSummary>;
    schema: Maybe<Schema>;
    schemaTag: Maybe<SchemaTag>;
    schemaTagById: Maybe<SchemaTag>;
    schemaTags: Maybe<Array<SchemaTag>>;
    stats: ServiceStatsWindow;
    statsWindow: Maybe<ServiceStatsWindow>;
    testSchemaPublishBody: Scalars['String'];
    title: Scalars['String'];
    trace: Maybe<Trace>;
    traceStorageEnabled: Scalars['Boolean'];
    variant: Maybe<GraphVariant>;
    variants: Array<GraphVariant>;
};
export declare type ServiceAvatarUrlArgs = {
    size?: Scalars['Int'];
};
export declare type ServiceChannelsArgs = {
    channelIds: Maybe<Array<Scalars['ID']>>;
};
export declare type ServiceCheckWorkflowArgs = {
    id: Scalars['ID'];
};
export declare type ServiceCheckWorkflowsArgs = {
    filter: Maybe<CheckFilterInput>;
    limit?: Scalars['Int'];
};
export declare type ServiceChecksAuthorOptionsArgs = {
    filter: Maybe<CheckFilterInput>;
};
export declare type ServiceChecksBranchOptionsArgs = {
    filter: Maybe<CheckFilterInput>;
};
export declare type ServiceChecksSubgraphOptionsArgs = {
    filter: Maybe<CheckFilterInput>;
};
export declare type ServiceCompositionResultByIdArgs = {
    id: Scalars['ID'];
};
export declare type ServiceDocumentArgs = {
    hash: Maybe<Scalars['SHA256']>;
};
export declare type ServiceImplementingServicesArgs = {
    graphVariant: Scalars['String'];
    includeDeleted: Maybe<Scalars['Boolean']>;
};
export declare type ServiceLastReportedAtArgs = {
    graphVariant: Maybe<Scalars['String']>;
};
export declare type ServiceMostRecentCompositionPublishArgs = {
    graphVariant: Scalars['String'];
};
export declare type ServiceOperationArgs = {
    id: Scalars['ID'];
};
export declare type ServiceOperationsAcceptedChangesArgs = {
    checkID: Scalars['ID'];
    operationID: Scalars['String'];
};
export declare type ServiceOperationsCheckArgs = {
    checkID: Scalars['ID'];
};
export declare type ServiceQueryTriggersArgs = {
    graphVariant: Maybe<Scalars['String']>;
    operationNames: Maybe<Array<Scalars['String']>>;
};
export declare type ServiceRegistrySubscriptionsEnabledArgs = {
    graphVariant: Maybe<Scalars['String']>;
};
export declare type ServiceSchemaArgs = {
    hash: Maybe<Scalars['ID']>;
    tag: Maybe<Scalars['String']>;
};
export declare type ServiceSchemaTagArgs = {
    tag: Scalars['String'];
};
export declare type ServiceSchemaTagByIdArgs = {
    id: Scalars['ID'];
};
export declare type ServiceSchemaTagsArgs = {
    tags: Maybe<Array<Scalars['String']>>;
};
export declare type ServiceStatsArgs = {
    from: Scalars['Timestamp'];
    resolution: Maybe<Resolution>;
    to: Maybe<Scalars['Timestamp']>;
};
export declare type ServiceStatsWindowArgs = {
    from: Scalars['Timestamp'];
    resolution: Maybe<Resolution>;
    to: Maybe<Scalars['Timestamp']>;
};
export declare type ServiceTestSchemaPublishBodyArgs = {
    variant: Scalars['String'];
};
export declare type ServiceTraceArgs = {
    id: Scalars['ID'];
};
export declare type ServiceVariantArgs = {
    name: Scalars['String'];
};
export declare enum ServiceEdgeServerInfosColumn {
    BootId = "BOOT_ID",
    ExecutableSchemaId = "EXECUTABLE_SCHEMA_ID",
    LibraryVersion = "LIBRARY_VERSION",
    Platform = "PLATFORM",
    RuntimeVersion = "RUNTIME_VERSION",
    SchemaTag = "SCHEMA_TAG",
    ServerId = "SERVER_ID",
    Timestamp = "TIMESTAMP",
    UserVersion = "USER_VERSION"
}
export declare type ServiceEdgeServerInfosDimensions = {
    __typename?: 'ServiceEdgeServerInfosDimensions';
    bootId: Maybe<Scalars['ID']>;
    executableSchemaId: Maybe<Scalars['ID']>;
    libraryVersion: Maybe<Scalars['String']>;
    platform: Maybe<Scalars['String']>;
    runtimeVersion: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serverId: Maybe<Scalars['ID']>;
    userVersion: Maybe<Scalars['String']>;
};
export declare type ServiceEdgeServerInfosFilter = {
    and: Maybe<Array<ServiceEdgeServerInfosFilter>>;
    bootId: Maybe<Scalars['ID']>;
    executableSchemaId: Maybe<Scalars['ID']>;
    in: Maybe<ServiceEdgeServerInfosFilterIn>;
    libraryVersion: Maybe<Scalars['String']>;
    not: Maybe<ServiceEdgeServerInfosFilter>;
    or: Maybe<Array<ServiceEdgeServerInfosFilter>>;
    platform: Maybe<Scalars['String']>;
    runtimeVersion: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serverId: Maybe<Scalars['ID']>;
    userVersion: Maybe<Scalars['String']>;
};
export declare type ServiceEdgeServerInfosFilterIn = {
    bootId: Maybe<Array<Maybe<Scalars['ID']>>>;
    executableSchemaId: Maybe<Array<Maybe<Scalars['ID']>>>;
    libraryVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    platform: Maybe<Array<Maybe<Scalars['String']>>>;
    runtimeVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    serverId: Maybe<Array<Maybe<Scalars['ID']>>>;
    userVersion: Maybe<Array<Maybe<Scalars['String']>>>;
};
export declare type ServiceEdgeServerInfosOrderBySpec = {
    column: ServiceEdgeServerInfosColumn;
    direction: Ordering;
};
export declare type ServiceEdgeServerInfosRecord = {
    __typename?: 'ServiceEdgeServerInfosRecord';
    groupBy: ServiceEdgeServerInfosDimensions;
    timestamp: Scalars['Timestamp'];
};
export declare enum ServiceErrorStatsColumn {
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    ErrorsCount = "ERRORS_COUNT",
    Path = "PATH",
    QueryId = "QUERY_ID",
    QueryName = "QUERY_NAME",
    RequestsWithErrorsCount = "REQUESTS_WITH_ERRORS_COUNT",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    Timestamp = "TIMESTAMP"
}
export declare type ServiceErrorStatsDimensions = {
    __typename?: 'ServiceErrorStatsDimensions';
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    path: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
};
export declare type ServiceErrorStatsFilter = {
    and: Maybe<Array<ServiceErrorStatsFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    in: Maybe<ServiceErrorStatsFilterIn>;
    not: Maybe<ServiceErrorStatsFilter>;
    or: Maybe<Array<ServiceErrorStatsFilter>>;
    path: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
};
export declare type ServiceErrorStatsFilterIn = {
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    path: Maybe<Array<Maybe<Scalars['String']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    queryName: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
};
export declare type ServiceErrorStatsMetrics = {
    __typename?: 'ServiceErrorStatsMetrics';
    errorsCount: Scalars['Long'];
    requestsWithErrorsCount: Scalars['Long'];
};
export declare type ServiceErrorStatsOrderBySpec = {
    column: ServiceErrorStatsColumn;
    direction: Ordering;
};
export declare type ServiceErrorStatsRecord = {
    __typename?: 'ServiceErrorStatsRecord';
    groupBy: ServiceErrorStatsDimensions;
    metrics: ServiceErrorStatsMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare enum ServiceFieldLatenciesColumn {
    Field = "FIELD",
    FieldHistogram = "FIELD_HISTOGRAM",
    FieldName = "FIELD_NAME",
    ParentType = "PARENT_TYPE",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    Timestamp = "TIMESTAMP"
}
export declare type ServiceFieldLatenciesDimensions = {
    __typename?: 'ServiceFieldLatenciesDimensions';
    field: Maybe<Scalars['String']>;
    fieldName: Maybe<Scalars['String']>;
    parentType: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
};
export declare type ServiceFieldLatenciesFilter = {
    and: Maybe<Array<ServiceFieldLatenciesFilter>>;
    field: Maybe<Scalars['String']>;
    fieldName: Maybe<Scalars['String']>;
    in: Maybe<ServiceFieldLatenciesFilterIn>;
    not: Maybe<ServiceFieldLatenciesFilter>;
    or: Maybe<Array<ServiceFieldLatenciesFilter>>;
    parentType: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
};
export declare type ServiceFieldLatenciesFilterIn = {
    field: Maybe<Array<Maybe<Scalars['String']>>>;
    fieldName: Maybe<Array<Maybe<Scalars['String']>>>;
    parentType: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
};
export declare type ServiceFieldLatenciesMetrics = {
    __typename?: 'ServiceFieldLatenciesMetrics';
    fieldHistogram: DurationHistogram;
};
export declare type ServiceFieldLatenciesOrderBySpec = {
    column: ServiceFieldLatenciesColumn;
    direction: Ordering;
};
export declare type ServiceFieldLatenciesRecord = {
    __typename?: 'ServiceFieldLatenciesRecord';
    groupBy: ServiceFieldLatenciesDimensions;
    metrics: ServiceFieldLatenciesMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare enum ServiceFieldUsageColumn {
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    ExecutionCount = "EXECUTION_COUNT",
    Field = "FIELD",
    FieldName = "FIELD_NAME",
    ParentType = "PARENT_TYPE",
    QueryId = "QUERY_ID",
    QueryName = "QUERY_NAME",
    ReferencingOperationCount = "REFERENCING_OPERATION_COUNT",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    Timestamp = "TIMESTAMP"
}
export declare type ServiceFieldUsageDimensions = {
    __typename?: 'ServiceFieldUsageDimensions';
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    field: Maybe<Scalars['String']>;
    fieldName: Maybe<Scalars['String']>;
    parentType: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
};
export declare type ServiceFieldUsageFilter = {
    and: Maybe<Array<ServiceFieldUsageFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    field: Maybe<Scalars['String']>;
    fieldName: Maybe<Scalars['String']>;
    in: Maybe<ServiceFieldUsageFilterIn>;
    not: Maybe<ServiceFieldUsageFilter>;
    or: Maybe<Array<ServiceFieldUsageFilter>>;
    parentType: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
};
export declare type ServiceFieldUsageFilterIn = {
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    field: Maybe<Array<Maybe<Scalars['String']>>>;
    fieldName: Maybe<Array<Maybe<Scalars['String']>>>;
    parentType: Maybe<Array<Maybe<Scalars['String']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    queryName: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
};
export declare type ServiceFieldUsageMetrics = {
    __typename?: 'ServiceFieldUsageMetrics';
    executionCount: Scalars['Long'];
    referencingOperationCount: Scalars['Long'];
};
export declare type ServiceFieldUsageOrderBySpec = {
    column: ServiceFieldUsageColumn;
    direction: Ordering;
};
export declare type ServiceFieldUsageRecord = {
    __typename?: 'ServiceFieldUsageRecord';
    groupBy: ServiceFieldUsageDimensions;
    metrics: ServiceFieldUsageMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare type ServiceMutation = {
    __typename?: 'ServiceMutation';
    checkPartialSchema: CheckPartialSchemaResult;
    checkSchema: CheckSchemaResult;
    checkWorkflow: Maybe<CheckWorkflowMutation>;
    createCompositionStatusSubscription: SchemaPublishSubscription;
    createSchemaPublishSubscription: SchemaPublishSubscription;
    delete: Maybe<Scalars['Void']>;
    deleteAvatar: Maybe<AvatarDeleteError>;
    deleteChannel: Scalars['Boolean'];
    deleteQueryTrigger: Scalars['Boolean'];
    deleteRegistrySubscription: Scalars['Boolean'];
    deleteRegistrySubscriptions: Array<Scalars['ID']>;
    deleteScheduledSummary: Scalars['Boolean'];
    deleteSchemaTag: DeleteSchemaTagResult;
    deleteTraces: Maybe<Scalars['Void']>;
    disableDatadogForwardingLegacyMetricNames: Maybe<Service>;
    hardDelete: Maybe<Scalars['Void']>;
    id: Scalars['ID'];
    ignoreOperationsInChecks: Maybe<IgnoreOperationsInChecksResult>;
    markChangesForOperationAsSafe: MarkChangesForOperationAsSafeResult;
    newKey: GraphApiKey;
    overrideUserPermission: Maybe<Service>;
    previewContractVariant: ContractVariantPreviewResult;
    promoteSchema: PromoteSchemaResponseOrError;
    registerOperationsWithResponse: Maybe<RegisterOperationsMutationResponse>;
    removeImplementingServiceAndTriggerComposition: CompositionAndRemoveResult;
    removeKey: Maybe<Scalars['Void']>;
    renameKey: Maybe<GraphApiKey>;
    reportServerInfo: Maybe<ReportServerInfoResult>;
    service: Service;
    storeSchemaDocument: StoreSchemaResponseOrError;
    testSlackChannel: Maybe<Scalars['Void']>;
    testSubscriptionForChannel: Scalars['String'];
    transfer: Maybe<Service>;
    triggerRepublish: Maybe<Scalars['Void']>;
    undelete: Maybe<Service>;
    unignoreOperationsInChecks: Maybe<UnignoreOperationsInChecksResult>;
    unmarkChangesForOperationAsSafe: MarkChangesForOperationAsSafeResult;
    updateCheckConfiguration: CheckConfiguration;
    updateDatadogMetricsConfig: Maybe<DatadogMetricsConfig>;
    updateDescription: Maybe<Service>;
    updateHiddenFromUninvitedNonAdminAccountMembers: Maybe<Service>;
    updateReadme: Maybe<Service>;
    updateTitle: Maybe<Service>;
    uploadSchema: Maybe<UploadSchemaMutationResponse>;
    upsertChannel: Maybe<Channel>;
    upsertContractVariant: ContractVariantUpsertResult;
    upsertImplementingServiceAndTriggerComposition: Maybe<CompositionAndUpsertResult>;
    upsertPagerDutyChannel: Maybe<PagerDutyChannel>;
    upsertQueryTrigger: Maybe<QueryTrigger>;
    upsertRegistrySubscription: RegistrySubscription;
    upsertScheduledSummary: Maybe<ScheduledSummary>;
    upsertSlackChannel: Maybe<SlackChannel>;
    upsertWebhookChannel: Maybe<WebhookChannel>;
    validateOperations: ValidateOperationsResult;
    validatePartialSchemaOfImplementingServiceAgainstGraph: CompositionValidationResult;
    variant: Maybe<GraphVariantMutation>;
};
export declare type ServiceMutationCheckPartialSchemaArgs = {
    frontend: Maybe<Scalars['String']>;
    gitContext: Maybe<GitContextInput>;
    graphVariant: Scalars['String'];
    historicParameters: Maybe<HistoricQueryParameters>;
    implementingServiceName: Scalars['String'];
    partialSchema: PartialSchemaInput;
    useMaximumRetention: Maybe<Scalars['Boolean']>;
};
export declare type ServiceMutationCheckSchemaArgs = {
    baseSchemaTag?: Maybe<Scalars['String']>;
    frontend: Maybe<Scalars['String']>;
    gitContext: Maybe<GitContextInput>;
    historicParameters: Maybe<HistoricQueryParameters>;
    proposedSchema: Maybe<IntrospectionSchemaInput>;
    proposedSchemaDocument: Maybe<Scalars['String']>;
    proposedSchemaHash: Maybe<Scalars['String']>;
    useMaximumRetention: Maybe<Scalars['Boolean']>;
};
export declare type ServiceMutationCheckWorkflowArgs = {
    id: Scalars['ID'];
};
export declare type ServiceMutationCreateCompositionStatusSubscriptionArgs = {
    channelID: Scalars['ID'];
    variant: Scalars['String'];
};
export declare type ServiceMutationCreateSchemaPublishSubscriptionArgs = {
    channelID: Scalars['ID'];
    variant: Scalars['String'];
};
export declare type ServiceMutationDeleteChannelArgs = {
    id: Scalars['ID'];
};
export declare type ServiceMutationDeleteQueryTriggerArgs = {
    id: Scalars['ID'];
};
export declare type ServiceMutationDeleteRegistrySubscriptionArgs = {
    id: Scalars['ID'];
};
export declare type ServiceMutationDeleteRegistrySubscriptionsArgs = {
    variant: Scalars['String'];
};
export declare type ServiceMutationDeleteScheduledSummaryArgs = {
    id: Scalars['ID'];
};
export declare type ServiceMutationDeleteSchemaTagArgs = {
    tag: Scalars['String'];
};
export declare type ServiceMutationDeleteTracesArgs = {
    from: Scalars['Timestamp'];
    to: Maybe<Scalars['Timestamp']>;
};
export declare type ServiceMutationIgnoreOperationsInChecksArgs = {
    ids: Array<Scalars['ID']>;
};
export declare type ServiceMutationMarkChangesForOperationAsSafeArgs = {
    checkID: Scalars['ID'];
    operationID: Scalars['ID'];
};
export declare type ServiceMutationNewKeyArgs = {
    keyName: Maybe<Scalars['String']>;
    role?: UserPermission;
};
export declare type ServiceMutationOverrideUserPermissionArgs = {
    permission: Maybe<UserPermission>;
    userID: Scalars['ID'];
};
export declare type ServiceMutationPreviewContractVariantArgs = {
    filterConfig: FilterConfigInput;
    sourceVariant: Scalars['String'];
};
export declare type ServiceMutationPromoteSchemaArgs = {
    graphVariant: Scalars['String'];
    historicParameters: Maybe<HistoricQueryParameters>;
    overrideComposedSchema?: Scalars['Boolean'];
    sha256: Scalars['SHA256'];
};
export declare type ServiceMutationRegisterOperationsWithResponseArgs = {
    clientIdentity: Maybe<RegisteredClientIdentityInput>;
    gitContext: Maybe<GitContextInput>;
    graphVariant?: Scalars['String'];
    manifestVersion: Maybe<Scalars['Int']>;
    operations: Array<RegisteredOperationInput>;
};
export declare type ServiceMutationRemoveImplementingServiceAndTriggerCompositionArgs = {
    dryRun?: Scalars['Boolean'];
    graphVariant: Scalars['String'];
    name: Scalars['String'];
};
export declare type ServiceMutationRemoveKeyArgs = {
    id: Maybe<Scalars['ID']>;
};
export declare type ServiceMutationRenameKeyArgs = {
    id: Scalars['ID'];
    newKeyName: Maybe<Scalars['String']>;
};
export declare type ServiceMutationReportServerInfoArgs = {
    executableSchema: Maybe<Scalars['String']>;
    info: EdgeServerInfo;
};
export declare type ServiceMutationStoreSchemaDocumentArgs = {
    schemaDocument: Scalars['String'];
};
export declare type ServiceMutationTestSlackChannelArgs = {
    id: Scalars['ID'];
    notification: SlackNotificationInput;
};
export declare type ServiceMutationTestSubscriptionForChannelArgs = {
    channelID: Scalars['ID'];
    subscriptionID: Scalars['ID'];
};
export declare type ServiceMutationTransferArgs = {
    to: Scalars['String'];
};
export declare type ServiceMutationTriggerRepublishArgs = {
    graphVariant: Scalars['String'];
};
export declare type ServiceMutationUnignoreOperationsInChecksArgs = {
    ids: Array<Scalars['ID']>;
};
export declare type ServiceMutationUnmarkChangesForOperationAsSafeArgs = {
    checkID: Scalars['ID'];
    operationID: Scalars['ID'];
};
export declare type ServiceMutationUpdateCheckConfigurationArgs = {
    excludedClients: Maybe<Array<ClientFilterInput>>;
    excludedOperations: Maybe<Array<ExcludedOperationInput>>;
    includeBaseVariant: Maybe<Scalars['Boolean']>;
    includedVariants: Maybe<Array<Scalars['String']>>;
    operationCountThreshold: Maybe<Scalars['Int']>;
    operationCountThresholdPercentage: Maybe<Scalars['Float']>;
    timeRangeSeconds: Maybe<Scalars['Long']>;
};
export declare type ServiceMutationUpdateDatadogMetricsConfigArgs = {
    apiKey: Maybe<Scalars['String']>;
    apiRegion: Maybe<DatadogApiRegion>;
    enabled: Maybe<Scalars['Boolean']>;
};
export declare type ServiceMutationUpdateDescriptionArgs = {
    description: Scalars['String'];
};
export declare type ServiceMutationUpdateHiddenFromUninvitedNonAdminAccountMembersArgs = {
    hiddenFromUninvitedNonAdminAccountMembers: Scalars['Boolean'];
};
export declare type ServiceMutationUpdateReadmeArgs = {
    readme: Scalars['String'];
};
export declare type ServiceMutationUpdateTitleArgs = {
    title: Scalars['String'];
};
export declare type ServiceMutationUploadSchemaArgs = {
    errorOnBadRequest?: Scalars['Boolean'];
    gitContext: Maybe<GitContextInput>;
    historicParameters: Maybe<HistoricQueryParameters>;
    overrideComposedSchema?: Scalars['Boolean'];
    schema: Maybe<IntrospectionSchemaInput>;
    schemaDocument: Maybe<Scalars['String']>;
    tag: Scalars['String'];
};
export declare type ServiceMutationUpsertChannelArgs = {
    id: Maybe<Scalars['ID']>;
    pagerDutyChannel: Maybe<PagerDutyChannelInput>;
    slackChannel: Maybe<SlackChannelInput>;
    webhookChannel: Maybe<WebhookChannelInput>;
};
export declare type ServiceMutationUpsertContractVariantArgs = {
    contractVariantName: Scalars['String'];
    filterConfig: FilterConfigInput;
    initiateLaunch?: Scalars['Boolean'];
    sourceVariant: Scalars['String'];
};
export declare type ServiceMutationUpsertImplementingServiceAndTriggerCompositionArgs = {
    activePartialSchema: PartialSchemaInput;
    gitContext: Maybe<GitContextInput>;
    graphVariant: Scalars['String'];
    name: Scalars['String'];
    revision: Scalars['String'];
    url: Maybe<Scalars['String']>;
};
export declare type ServiceMutationUpsertPagerDutyChannelArgs = {
    channel: PagerDutyChannelInput;
    id: Maybe<Scalars['ID']>;
};
export declare type ServiceMutationUpsertQueryTriggerArgs = {
    id: Maybe<Scalars['ID']>;
    trigger: QueryTriggerInput;
};
export declare type ServiceMutationUpsertRegistrySubscriptionArgs = {
    channelID: Maybe<Scalars['ID']>;
    id: Maybe<Scalars['ID']>;
    options: Maybe<SubscriptionOptionsInput>;
    variant: Maybe<Scalars['String']>;
};
export declare type ServiceMutationUpsertScheduledSummaryArgs = {
    channelID: Maybe<Scalars['ID']>;
    enabled: Maybe<Scalars['Boolean']>;
    id: Maybe<Scalars['ID']>;
    tag: Maybe<Scalars['String']>;
    timezone: Maybe<Scalars['String']>;
    variant: Maybe<Scalars['String']>;
};
export declare type ServiceMutationUpsertSlackChannelArgs = {
    channel: SlackChannelInput;
    id: Maybe<Scalars['ID']>;
};
export declare type ServiceMutationUpsertWebhookChannelArgs = {
    id: Maybe<Scalars['ID']>;
    name: Maybe<Scalars['String']>;
    secretToken: Maybe<Scalars['String']>;
    url: Scalars['String'];
};
export declare type ServiceMutationValidateOperationsArgs = {
    gitContext: Maybe<GitContextInput>;
    operations: Array<OperationDocumentInput>;
    tag?: Maybe<Scalars['String']>;
};
export declare type ServiceMutationValidatePartialSchemaOfImplementingServiceAgainstGraphArgs = {
    graphVariant: Scalars['String'];
    implementingServiceName: Scalars['String'];
    partialSchema: PartialSchemaInput;
};
export declare type ServiceMutationVariantArgs = {
    name: Scalars['String'];
};
export declare enum ServiceOperationCheckStatsColumn {
    CachedRequestsCount = "CACHED_REQUESTS_COUNT",
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    QueryId = "QUERY_ID",
    SchemaTag = "SCHEMA_TAG",
    Timestamp = "TIMESTAMP",
    UncachedRequestsCount = "UNCACHED_REQUESTS_COUNT"
}
export declare type ServiceOperationCheckStatsDimensions = {
    __typename?: 'ServiceOperationCheckStatsDimensions';
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    schemaTag: Maybe<Scalars['String']>;
};
export declare type ServiceOperationCheckStatsFilter = {
    and: Maybe<Array<ServiceOperationCheckStatsFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    in: Maybe<ServiceOperationCheckStatsFilterIn>;
    not: Maybe<ServiceOperationCheckStatsFilter>;
    or: Maybe<Array<ServiceOperationCheckStatsFilter>>;
    queryId: Maybe<Scalars['ID']>;
    schemaTag: Maybe<Scalars['String']>;
};
export declare type ServiceOperationCheckStatsFilterIn = {
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
};
export declare type ServiceOperationCheckStatsMetrics = {
    __typename?: 'ServiceOperationCheckStatsMetrics';
    cachedRequestsCount: Scalars['Long'];
    uncachedRequestsCount: Scalars['Long'];
};
export declare type ServiceOperationCheckStatsOrderBySpec = {
    column: ServiceOperationCheckStatsColumn;
    direction: Ordering;
};
export declare type ServiceOperationCheckStatsRecord = {
    __typename?: 'ServiceOperationCheckStatsRecord';
    groupBy: ServiceOperationCheckStatsDimensions;
    metrics: ServiceOperationCheckStatsMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare enum ServiceQueryStatsColumn {
    CachedHistogram = "CACHED_HISTOGRAM",
    CachedRequestsCount = "CACHED_REQUESTS_COUNT",
    CacheTtlHistogram = "CACHE_TTL_HISTOGRAM",
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    ForbiddenOperationCount = "FORBIDDEN_OPERATION_COUNT",
    FromEngineproxy = "FROM_ENGINEPROXY",
    QueryId = "QUERY_ID",
    QueryName = "QUERY_NAME",
    RegisteredOperationCount = "REGISTERED_OPERATION_COUNT",
    RequestsWithErrorsCount = "REQUESTS_WITH_ERRORS_COUNT",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    Timestamp = "TIMESTAMP",
    UncachedHistogram = "UNCACHED_HISTOGRAM",
    UncachedRequestsCount = "UNCACHED_REQUESTS_COUNT"
}
export declare type ServiceQueryStatsDimensions = {
    __typename?: 'ServiceQueryStatsDimensions';
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    fromEngineproxy: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    querySignature: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
};
export declare type ServiceQueryStatsFilter = {
    and: Maybe<Array<ServiceQueryStatsFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    fromEngineproxy: Maybe<Scalars['String']>;
    in: Maybe<ServiceQueryStatsFilterIn>;
    not: Maybe<ServiceQueryStatsFilter>;
    or: Maybe<Array<ServiceQueryStatsFilter>>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
};
export declare type ServiceQueryStatsFilterIn = {
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    fromEngineproxy: Maybe<Array<Maybe<Scalars['String']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    queryName: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
};
export declare type ServiceQueryStatsMetrics = {
    __typename?: 'ServiceQueryStatsMetrics';
    cacheTtlHistogram: DurationHistogram;
    cachedHistogram: DurationHistogram;
    cachedRequestsCount: Scalars['Long'];
    forbiddenOperationCount: Scalars['Long'];
    registeredOperationCount: Scalars['Long'];
    requestsWithErrorsCount: Scalars['Long'];
    totalLatencyHistogram: DurationHistogram;
    totalRequestCount: Scalars['Long'];
    uncachedHistogram: DurationHistogram;
    uncachedRequestsCount: Scalars['Long'];
};
export declare type ServiceQueryStatsOrderBySpec = {
    column: ServiceQueryStatsColumn;
    direction: Ordering;
};
export declare type ServiceQueryStatsRecord = {
    __typename?: 'ServiceQueryStatsRecord';
    groupBy: ServiceQueryStatsDimensions;
    metrics: ServiceQueryStatsMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare type ServiceRoles = {
    __typename?: 'ServiceRoles';
    canCheckSchemas: Scalars['Boolean'];
    canCreateVariants: Scalars['Boolean'];
    canDelete: Scalars['Boolean'];
    canManageAccess: Scalars['Boolean'];
    canManageBuildConfig: Scalars['Boolean'];
    canManageIntegrations: Scalars['Boolean'];
    canManageKeys: Scalars['Boolean'];
    canManageVariants: Scalars['Boolean'];
    canQueryBuildConfig: Scalars['Boolean'];
    canQueryCheckConfiguration: Scalars['Boolean'];
    canQueryDeletedImplementingServices: Scalars['Boolean'];
    canQueryImplementingServices: Scalars['Boolean'];
    canQueryIntegrations: Scalars['Boolean'];
    canQueryPrivateInfo: Scalars['Boolean'];
    canQueryPublicInfo: Scalars['Boolean'];
    canQueryReadmeAuthor: Scalars['Boolean'];
    canQueryRoleOverrides: Scalars['Boolean'];
    canQuerySchemas: Scalars['Boolean'];
    canQueryStats: Scalars['Boolean'];
    canQueryTokens: Scalars['Boolean'];
    canQueryTraces: Scalars['Boolean'];
    canRegisterOperations: Scalars['Boolean'];
    canStoreSchemasWithoutVariant: Scalars['Boolean'];
    canUndelete: Scalars['Boolean'];
    canUpdateAvatar: Scalars['Boolean'];
    canUpdateDescription: Scalars['Boolean'];
    canUpdateTitle: Scalars['Boolean'];
    canVisualizeStats: Scalars['Boolean'];
    canWriteCheckConfiguration: Scalars['Boolean'];
    canWriteTraces: Scalars['Boolean'];
};
export declare type ServiceStatsWindow = {
    __typename?: 'ServiceStatsWindow';
    edgeServerInfos: Array<ServiceEdgeServerInfosRecord>;
    errorStats: Array<ServiceErrorStatsRecord>;
    fieldLatencies: Array<ServiceFieldLatenciesRecord>;
    fieldStats: Array<ServiceFieldLatenciesRecord>;
    fieldUsage: Array<ServiceFieldUsageRecord>;
    operationCheckStats: Array<ServiceOperationCheckStatsRecord>;
    queryStats: Array<ServiceQueryStatsRecord>;
    roundedDownFrom: Scalars['Timestamp'];
    roundedUpTo: Scalars['Timestamp'];
    tracePathErrorsRefs: Array<ServiceTracePathErrorsRefsRecord>;
    traceRefs: Array<ServiceTraceRefsRecord>;
};
export declare type ServiceStatsWindowEdgeServerInfosArgs = {
    filter: Maybe<ServiceEdgeServerInfosFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<ServiceEdgeServerInfosOrderBySpec>>;
};
export declare type ServiceStatsWindowErrorStatsArgs = {
    filter: Maybe<ServiceErrorStatsFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<ServiceErrorStatsOrderBySpec>>;
};
export declare type ServiceStatsWindowFieldLatenciesArgs = {
    filter: Maybe<ServiceFieldLatenciesFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<ServiceFieldLatenciesOrderBySpec>>;
};
export declare type ServiceStatsWindowFieldStatsArgs = {
    filter: Maybe<ServiceFieldLatenciesFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<ServiceFieldLatenciesOrderBySpec>>;
};
export declare type ServiceStatsWindowFieldUsageArgs = {
    filter: Maybe<ServiceFieldUsageFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<ServiceFieldUsageOrderBySpec>>;
};
export declare type ServiceStatsWindowOperationCheckStatsArgs = {
    filter: Maybe<ServiceOperationCheckStatsFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<ServiceOperationCheckStatsOrderBySpec>>;
};
export declare type ServiceStatsWindowQueryStatsArgs = {
    filter: Maybe<ServiceQueryStatsFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<ServiceQueryStatsOrderBySpec>>;
};
export declare type ServiceStatsWindowTracePathErrorsRefsArgs = {
    filter: Maybe<ServiceTracePathErrorsRefsFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<ServiceTracePathErrorsRefsOrderBySpec>>;
};
export declare type ServiceStatsWindowTraceRefsArgs = {
    filter: Maybe<ServiceTraceRefsFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<ServiceTraceRefsOrderBySpec>>;
};
export declare enum ServiceTracePathErrorsRefsColumn {
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    DurationBucket = "DURATION_BUCKET",
    ErrorsCountInPath = "ERRORS_COUNT_IN_PATH",
    ErrorsCountInTrace = "ERRORS_COUNT_IN_TRACE",
    ErrorMessage = "ERROR_MESSAGE",
    Path = "PATH",
    QueryId = "QUERY_ID",
    QueryName = "QUERY_NAME",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    Timestamp = "TIMESTAMP",
    TraceHttpStatusCode = "TRACE_HTTP_STATUS_CODE",
    TraceId = "TRACE_ID",
    TraceSizeBytes = "TRACE_SIZE_BYTES",
    TraceStartsAt = "TRACE_STARTS_AT"
}
export declare type ServiceTracePathErrorsRefsDimensions = {
    __typename?: 'ServiceTracePathErrorsRefsDimensions';
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    durationBucket: Maybe<Scalars['Int']>;
    errorMessage: Maybe<Scalars['String']>;
    path: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    traceHttpStatusCode: Maybe<Scalars['Int']>;
    traceId: Maybe<Scalars['ID']>;
    traceStartsAt: Maybe<Scalars['Timestamp']>;
};
export declare type ServiceTracePathErrorsRefsFilter = {
    and: Maybe<Array<ServiceTracePathErrorsRefsFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    durationBucket: Maybe<Scalars['Int']>;
    errorMessage: Maybe<Scalars['String']>;
    in: Maybe<ServiceTracePathErrorsRefsFilterIn>;
    not: Maybe<ServiceTracePathErrorsRefsFilter>;
    or: Maybe<Array<ServiceTracePathErrorsRefsFilter>>;
    path: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    traceHttpStatusCode: Maybe<Scalars['Int']>;
    traceId: Maybe<Scalars['ID']>;
};
export declare type ServiceTracePathErrorsRefsFilterIn = {
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    durationBucket: Maybe<Array<Maybe<Scalars['Int']>>>;
    errorMessage: Maybe<Array<Maybe<Scalars['String']>>>;
    path: Maybe<Array<Maybe<Scalars['String']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    queryName: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    traceHttpStatusCode: Maybe<Array<Maybe<Scalars['Int']>>>;
    traceId: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type ServiceTracePathErrorsRefsMetrics = {
    __typename?: 'ServiceTracePathErrorsRefsMetrics';
    errorsCountInPath: Scalars['Long'];
    errorsCountInTrace: Scalars['Long'];
    traceSizeBytes: Scalars['Long'];
};
export declare type ServiceTracePathErrorsRefsOrderBySpec = {
    column: ServiceTracePathErrorsRefsColumn;
    direction: Ordering;
};
export declare type ServiceTracePathErrorsRefsRecord = {
    __typename?: 'ServiceTracePathErrorsRefsRecord';
    groupBy: ServiceTracePathErrorsRefsDimensions;
    metrics: ServiceTracePathErrorsRefsMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare enum ServiceTraceRefsColumn {
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    DurationBucket = "DURATION_BUCKET",
    DurationNs = "DURATION_NS",
    QueryId = "QUERY_ID",
    QueryName = "QUERY_NAME",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    Timestamp = "TIMESTAMP",
    TraceId = "TRACE_ID",
    TraceSizeBytes = "TRACE_SIZE_BYTES"
}
export declare type ServiceTraceRefsDimensions = {
    __typename?: 'ServiceTraceRefsDimensions';
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    durationBucket: Maybe<Scalars['Int']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    querySignature: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    traceId: Maybe<Scalars['ID']>;
};
export declare type ServiceTraceRefsFilter = {
    and: Maybe<Array<ServiceTraceRefsFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    durationBucket: Maybe<Scalars['Int']>;
    in: Maybe<ServiceTraceRefsFilterIn>;
    not: Maybe<ServiceTraceRefsFilter>;
    or: Maybe<Array<ServiceTraceRefsFilter>>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    traceId: Maybe<Scalars['ID']>;
};
export declare type ServiceTraceRefsFilterIn = {
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    durationBucket: Maybe<Array<Maybe<Scalars['Int']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    queryName: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    traceId: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type ServiceTraceRefsMetrics = {
    __typename?: 'ServiceTraceRefsMetrics';
    durationNs: Scalars['Long'];
    traceSizeBytes: Scalars['Long'];
};
export declare type ServiceTraceRefsOrderBySpec = {
    column: ServiceTraceRefsColumn;
    direction: Ordering;
};
export declare type ServiceTraceRefsRecord = {
    __typename?: 'ServiceTraceRefsRecord';
    groupBy: ServiceTraceRefsDimensions;
    metrics: ServiceTraceRefsMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare type SlackChannel = Channel & {
    __typename?: 'SlackChannel';
    id: Scalars['ID'];
    name: Scalars['String'];
    subscriptions: Array<ChannelSubscription>;
    url: Scalars['String'];
};
export declare type SlackChannelInput = {
    name: Maybe<Scalars['String']>;
    url: Scalars['String'];
};
export declare type SlackNotificationField = {
    key: Scalars['String'];
    value: Scalars['String'];
};
export declare type SlackNotificationInput = {
    color: Maybe<Scalars['String']>;
    fallback: Scalars['String'];
    fields: Maybe<Array<SlackNotificationField>>;
    iconUrl: Maybe<Scalars['String']>;
    text: Maybe<Scalars['String']>;
    timestamp: Maybe<Scalars['Timestamp']>;
    title: Maybe<Scalars['String']>;
    titleLink: Maybe<Scalars['String']>;
    username: Maybe<Scalars['String']>;
};
export declare type SourceLocation = {
    __typename?: 'SourceLocation';
    column: Scalars['Int'];
    line: Scalars['Int'];
};
export declare type StatsWindow = {
    __typename?: 'StatsWindow';
    edgeServerInfos: Array<EdgeServerInfosRecord>;
    errorStats: Array<ErrorStatsRecord>;
    fieldLatencies: Array<FieldLatenciesRecord>;
    fieldUsage: Array<FieldUsageRecord>;
    operationCheckStats: Array<OperationCheckStatsRecord>;
    queryStats: Array<QueryStatsRecord>;
    roundedDownFrom: Scalars['Timestamp'];
    roundedUpTo: Scalars['Timestamp'];
    tracePathErrorsRefs: Array<TracePathErrorsRefsRecord>;
    traceRefs: Array<TraceRefsRecord>;
};
export declare type StatsWindowEdgeServerInfosArgs = {
    filter: Maybe<EdgeServerInfosFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<EdgeServerInfosOrderBySpec>>;
};
export declare type StatsWindowErrorStatsArgs = {
    filter: Maybe<ErrorStatsFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<ErrorStatsOrderBySpec>>;
};
export declare type StatsWindowFieldLatenciesArgs = {
    filter: Maybe<FieldLatenciesFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<FieldLatenciesOrderBySpec>>;
};
export declare type StatsWindowFieldUsageArgs = {
    filter: Maybe<FieldUsageFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<FieldUsageOrderBySpec>>;
};
export declare type StatsWindowOperationCheckStatsArgs = {
    filter: Maybe<OperationCheckStatsFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<OperationCheckStatsOrderBySpec>>;
};
export declare type StatsWindowQueryStatsArgs = {
    filter: Maybe<QueryStatsFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<QueryStatsOrderBySpec>>;
};
export declare type StatsWindowTracePathErrorsRefsArgs = {
    filter: Maybe<TracePathErrorsRefsFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<TracePathErrorsRefsOrderBySpec>>;
};
export declare type StatsWindowTraceRefsArgs = {
    filter: Maybe<TraceRefsFilter>;
    limit?: Maybe<Scalars['Int']>;
    orderBy: Maybe<Array<TraceRefsOrderBySpec>>;
};
export declare type StoreSchemaError = {
    __typename?: 'StoreSchemaError';
    code: StoreSchemaErrorCode;
    message: Scalars['String'];
};
export declare enum StoreSchemaErrorCode {
    SchemaIsNotParsable = "SCHEMA_IS_NOT_PARSABLE",
    SchemaIsNotValid = "SCHEMA_IS_NOT_VALID"
}
export declare type StoreSchemaResponse = {
    __typename?: 'StoreSchemaResponse';
    sha256: Scalars['SHA256'];
};
export declare type StoreSchemaResponseOrError = StoreSchemaError | StoreSchemaResponse;
export declare type StoredApprovedChange = {
    __typename?: 'StoredApprovedChange';
    argNode: Maybe<NamedIntrospectionArgNoDescription>;
    childNode: Maybe<NamedIntrospectionValueNoDescription>;
    code: ChangeCode;
    parentNode: Maybe<NamedIntrospectionTypeNoDescription>;
};
export declare type StringToString = {
    __typename?: 'StringToString';
    key: Scalars['String'];
    value: Scalars['String'];
};
export declare type StringToStringInput = {
    key: Scalars['String'];
    value: Scalars['String'];
};
export declare type Subgraph = {
    __typename?: 'Subgraph';
    hash: Scalars['String'];
    name: Scalars['String'];
    routingURL: Scalars['String'];
};
export declare type SubgraphChange = {
    __typename?: 'SubgraphChange';
    name: Scalars['ID'];
    type: SubgraphChangeType;
};
export declare enum SubgraphChangeType {
    Addition = "ADDITION",
    Deletion = "DELETION",
    Modification = "MODIFICATION"
}
export declare type SubgraphConfig = {
    __typename?: 'SubgraphConfig';
    id: Scalars['ID'];
    name: Scalars['String'];
    schemaHash: Scalars['String'];
    sdl: Scalars['String'];
    url: Scalars['String'];
};
export declare type SubscriptionOptions = {
    __typename?: 'SubscriptionOptions';
    schemaUpdates: Scalars['Boolean'];
};
export declare type SubscriptionOptionsInput = {
    schemaUpdates: Scalars['Boolean'];
};
export declare enum SubscriptionState {
    Active = "ACTIVE",
    Canceled = "CANCELED",
    Expired = "EXPIRED",
    Future = "FUTURE",
    PastDue = "PAST_DUE",
    Paused = "PAUSED",
    Pending = "PENDING",
    Unknown = "UNKNOWN"
}
export declare type TemporaryUrl = {
    __typename?: 'TemporaryURL';
    url: Scalars['String'];
};
export declare enum ThemeName {
    Dark = "DARK",
    Light = "LIGHT"
}
export declare enum TicketPriority {
    P0 = "P0",
    P1 = "P1",
    P2 = "P2",
    P3 = "P3"
}
export declare enum TicketStatus {
    Closed = "CLOSED",
    Hold = "HOLD",
    New = "NEW",
    Open = "OPEN",
    Pending = "PENDING",
    Solved = "SOLVED"
}
export declare type TimezoneOffset = {
    __typename?: 'TimezoneOffset';
    minutesOffsetFromUTC: Scalars['Int'];
    zoneID: Scalars['String'];
};
export declare type TotalChangeSummaryCounts = {
    __typename?: 'TotalChangeSummaryCounts';
    additions: Scalars['Int'];
    deprecations: Scalars['Int'];
    edits: Scalars['Int'];
    removals: Scalars['Int'];
};
export declare type Trace = {
    __typename?: 'Trace';
    cacheMaxAgeMs: Maybe<Scalars['Float']>;
    cacheScope: Maybe<CacheScope>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    durationMs: Scalars['Float'];
    endTime: Scalars['Timestamp'];
    http: Maybe<TraceHttp>;
    id: Scalars['ID'];
    operationName: Maybe<Scalars['String']>;
    protobuf: Protobuf;
    root: TraceNode;
    signature: Scalars['String'];
    signatureId: Scalars['ID'];
    startTime: Scalars['Timestamp'];
    variablesJSON: Array<StringToString>;
};
export declare type TraceError = {
    __typename?: 'TraceError';
    json: Scalars['String'];
    locations: Array<TraceSourceLocation>;
    message: Scalars['String'];
    timestamp: Maybe<Scalars['Timestamp']>;
};
export declare type TraceHttp = {
    __typename?: 'TraceHTTP';
    host: Maybe<Scalars['String']>;
    method: HttpMethod;
    path: Maybe<Scalars['String']>;
    protocol: Maybe<Scalars['String']>;
    requestHeaders: Array<StringToString>;
    responseHeaders: Array<StringToString>;
    secure: Scalars['Boolean'];
    statusCode: Scalars['Int'];
};
export declare type TraceNode = {
    __typename?: 'TraceNode';
    cacheMaxAgeMs: Maybe<Scalars['Float']>;
    cacheScope: Maybe<CacheScope>;
    children: Array<TraceNode>;
    childrenIds: Array<Scalars['ID']>;
    descendants: Array<TraceNode>;
    descendantsIds: Array<Scalars['ID']>;
    endTime: Scalars['Timestamp'];
    errors: Array<TraceError>;
    id: Scalars['ID'];
    key: Maybe<Scalars['StringOrInt']>;
    originalFieldName: Maybe<Scalars['String']>;
    parent: Scalars['ID'];
    parentId: Maybe<Scalars['ID']>;
    path: Array<Scalars['String']>;
    startTime: Scalars['Timestamp'];
    type: Maybe<Scalars['String']>;
};
export declare enum TracePathErrorsRefsColumn {
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    DurationBucket = "DURATION_BUCKET",
    ErrorsCountInPath = "ERRORS_COUNT_IN_PATH",
    ErrorsCountInTrace = "ERRORS_COUNT_IN_TRACE",
    ErrorMessage = "ERROR_MESSAGE",
    Path = "PATH",
    QueryId = "QUERY_ID",
    QueryName = "QUERY_NAME",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    ServiceId = "SERVICE_ID",
    Timestamp = "TIMESTAMP",
    TraceHttpStatusCode = "TRACE_HTTP_STATUS_CODE",
    TraceId = "TRACE_ID",
    TraceSizeBytes = "TRACE_SIZE_BYTES",
    TraceStartsAt = "TRACE_STARTS_AT"
}
export declare type TracePathErrorsRefsDimensions = {
    __typename?: 'TracePathErrorsRefsDimensions';
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    durationBucket: Maybe<Scalars['Int']>;
    errorMessage: Maybe<Scalars['String']>;
    path: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
    traceHttpStatusCode: Maybe<Scalars['Int']>;
    traceId: Maybe<Scalars['ID']>;
    traceStartsAt: Maybe<Scalars['Timestamp']>;
};
export declare type TracePathErrorsRefsFilter = {
    and: Maybe<Array<TracePathErrorsRefsFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    durationBucket: Maybe<Scalars['Int']>;
    errorMessage: Maybe<Scalars['String']>;
    in: Maybe<TracePathErrorsRefsFilterIn>;
    not: Maybe<TracePathErrorsRefsFilter>;
    or: Maybe<Array<TracePathErrorsRefsFilter>>;
    path: Maybe<Scalars['String']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
    traceHttpStatusCode: Maybe<Scalars['Int']>;
    traceId: Maybe<Scalars['ID']>;
};
export declare type TracePathErrorsRefsFilterIn = {
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    durationBucket: Maybe<Array<Maybe<Scalars['Int']>>>;
    errorMessage: Maybe<Array<Maybe<Scalars['String']>>>;
    path: Maybe<Array<Maybe<Scalars['String']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    queryName: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    serviceId: Maybe<Array<Maybe<Scalars['ID']>>>;
    traceHttpStatusCode: Maybe<Array<Maybe<Scalars['Int']>>>;
    traceId: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type TracePathErrorsRefsMetrics = {
    __typename?: 'TracePathErrorsRefsMetrics';
    errorsCountInPath: Scalars['Long'];
    errorsCountInTrace: Scalars['Long'];
    traceSizeBytes: Scalars['Long'];
};
export declare type TracePathErrorsRefsOrderBySpec = {
    column: TracePathErrorsRefsColumn;
    direction: Ordering;
};
export declare type TracePathErrorsRefsRecord = {
    __typename?: 'TracePathErrorsRefsRecord';
    groupBy: TracePathErrorsRefsDimensions;
    metrics: TracePathErrorsRefsMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare enum TraceRefsColumn {
    ClientName = "CLIENT_NAME",
    ClientVersion = "CLIENT_VERSION",
    DurationBucket = "DURATION_BUCKET",
    DurationNs = "DURATION_NS",
    QueryId = "QUERY_ID",
    QueryName = "QUERY_NAME",
    SchemaHash = "SCHEMA_HASH",
    SchemaTag = "SCHEMA_TAG",
    ServiceId = "SERVICE_ID",
    Timestamp = "TIMESTAMP",
    TraceId = "TRACE_ID",
    TraceSizeBytes = "TRACE_SIZE_BYTES"
}
export declare type TraceRefsDimensions = {
    __typename?: 'TraceRefsDimensions';
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    durationBucket: Maybe<Scalars['Int']>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    querySignature: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
    traceId: Maybe<Scalars['ID']>;
};
export declare type TraceRefsFilter = {
    and: Maybe<Array<TraceRefsFilter>>;
    clientName: Maybe<Scalars['String']>;
    clientVersion: Maybe<Scalars['String']>;
    durationBucket: Maybe<Scalars['Int']>;
    in: Maybe<TraceRefsFilterIn>;
    not: Maybe<TraceRefsFilter>;
    or: Maybe<Array<TraceRefsFilter>>;
    queryId: Maybe<Scalars['ID']>;
    queryName: Maybe<Scalars['String']>;
    schemaHash: Maybe<Scalars['String']>;
    schemaTag: Maybe<Scalars['String']>;
    serviceId: Maybe<Scalars['ID']>;
    traceId: Maybe<Scalars['ID']>;
};
export declare type TraceRefsFilterIn = {
    clientName: Maybe<Array<Maybe<Scalars['String']>>>;
    clientVersion: Maybe<Array<Maybe<Scalars['String']>>>;
    durationBucket: Maybe<Array<Maybe<Scalars['Int']>>>;
    queryId: Maybe<Array<Maybe<Scalars['ID']>>>;
    queryName: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaHash: Maybe<Array<Maybe<Scalars['String']>>>;
    schemaTag: Maybe<Array<Maybe<Scalars['String']>>>;
    serviceId: Maybe<Array<Maybe<Scalars['ID']>>>;
    traceId: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type TraceRefsMetrics = {
    __typename?: 'TraceRefsMetrics';
    durationNs: Scalars['Long'];
    traceSizeBytes: Scalars['Long'];
};
export declare type TraceRefsOrderBySpec = {
    column: TraceRefsColumn;
    direction: Ordering;
};
export declare type TraceRefsRecord = {
    __typename?: 'TraceRefsRecord';
    groupBy: TraceRefsDimensions;
    metrics: TraceRefsMetrics;
    timestamp: Scalars['Timestamp'];
};
export declare type TraceSourceLocation = {
    __typename?: 'TraceSourceLocation';
    column: Scalars['Int'];
    line: Scalars['Int'];
};
export declare type TypeChangeSummaryCounts = {
    __typename?: 'TypeChangeSummaryCounts';
    additions: Scalars['Int'];
    edits: Scalars['Int'];
    removals: Scalars['Int'];
};
export declare type TypeFilterConfig = {
    includeAbstractTypes: Maybe<Scalars['Boolean']>;
    includeBuiltInTypes: Maybe<Scalars['Boolean']>;
    includeIntrospectionTypes: Maybe<Scalars['Boolean']>;
};
export declare type Uri = {
    __typename?: 'URI';
    gcs: Scalars['String'];
};
export declare type UnignoreOperationsInChecksResult = {
    __typename?: 'UnignoreOperationsInChecksResult';
    graph: Service;
};
export declare type UploadSchemaMutationResponse = {
    __typename?: 'UploadSchemaMutationResponse';
    code: Scalars['String'];
    message: Scalars['String'];
    success: Scalars['Boolean'];
    tag: Maybe<SchemaTag>;
};
export declare type User = Identity & {
    __typename?: 'User';
    acceptedPrivacyPolicyAt: Maybe<Scalars['Timestamp']>;
    accounts: Array<Account>;
    apiKeys: Array<UserApiKey>;
    asActor: Actor;
    avatarUpload: Maybe<AvatarUploadResult>;
    avatarUrl: Maybe<Scalars['String']>;
    betaFeaturesOn: Scalars['Boolean'];
    canUpdateAvatar: Scalars['Boolean'];
    canUpdateEmail: Scalars['Boolean'];
    canUpdateFullName: Scalars['Boolean'];
    createdAt: Scalars['Timestamp'];
    email: Maybe<Scalars['String']>;
    emailModifiedAt: Maybe<Scalars['Timestamp']>;
    emailVerified: Scalars['Boolean'];
    experimentalFeatures: UserExperimentalFeatures;
    featureIntros: Maybe<FeatureIntros>;
    fullName: Scalars['String'];
    githubUsername: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    internalAdminRole: Maybe<InternalMdgAdminRole>;
    lastAuthenticatedAt: Maybe<Scalars['Timestamp']>;
    logoutAfterIdleMs: Maybe<Scalars['Int']>;
    memberships: Array<UserMembership>;
    name: Scalars['String'];
    odysseyCourses: Array<OdysseyCourse>;
    odysseyTasks: Array<OdysseyTask>;
    synchronized: Scalars['Boolean'];
    tickets: Maybe<Array<ZendeskTicket>>;
    type: UserType;
};
export declare type UserApiKeysArgs = {
    includeCookies?: Maybe<Scalars['Boolean']>;
};
export declare type UserAvatarUrlArgs = {
    size?: Scalars['Int'];
};
export declare type UserApiKey = ApiKey & {
    __typename?: 'UserApiKey';
    id: Scalars['ID'];
    keyName: Maybe<Scalars['String']>;
    token: Scalars['String'];
};
export declare type UserExperimentalFeatures = {
    __typename?: 'UserExperimentalFeatures';
    exampleFeature: Scalars['Boolean'];
};
export declare type UserMembership = {
    __typename?: 'UserMembership';
    account: Account;
    createdAt: Scalars['Timestamp'];
    permission: UserPermission;
    user: User;
};
export declare type UserMutation = {
    __typename?: 'UserMutation';
    acceptPrivacyPolicy: Maybe<Scalars['Void']>;
    changePassword: Maybe<Scalars['Void']>;
    createOdysseyCourses: Maybe<Array<OdysseyCourse>>;
    createOdysseyTasks: Maybe<Array<OdysseyTask>>;
    deleteAvatar: Maybe<AvatarDeleteError>;
    hardDelete: Maybe<Scalars['Void']>;
    newKey: UserApiKey;
    provisionKey: Maybe<ApiKeyProvision>;
    refresh: Maybe<User>;
    removeKey: Maybe<Scalars['Void']>;
    renameKey: Maybe<UserApiKey>;
    resendVerificationEmail: Maybe<Scalars['Void']>;
    setOdysseyCourse: Maybe<OdysseyCourse>;
    setOdysseyTask: Maybe<OdysseyTask>;
    submitZendeskTicket: Maybe<ZendeskTicket>;
    update: Maybe<User>;
    updateBetaFeaturesOn: Maybe<User>;
    updateFeatureIntros: Maybe<User>;
    updateRole: Maybe<User>;
    user: User;
    verifyEmail: Maybe<User>;
};
export declare type UserMutationChangePasswordArgs = {
    newPassword: Scalars['String'];
    previousPassword: Scalars['String'];
};
export declare type UserMutationCreateOdysseyCoursesArgs = {
    courses: Array<OdysseyCourseInput>;
};
export declare type UserMutationCreateOdysseyTasksArgs = {
    tasks: Array<OdysseyTaskInput>;
};
export declare type UserMutationNewKeyArgs = {
    keyName: Scalars['String'];
};
export declare type UserMutationProvisionKeyArgs = {
    keyName?: Scalars['String'];
};
export declare type UserMutationRemoveKeyArgs = {
    id: Scalars['ID'];
};
export declare type UserMutationRenameKeyArgs = {
    id: Scalars['ID'];
    newKeyName: Maybe<Scalars['String']>;
};
export declare type UserMutationSetOdysseyCourseArgs = {
    course: OdysseyCourseInput;
};
export declare type UserMutationSetOdysseyTaskArgs = {
    task: OdysseyTaskInput;
};
export declare type UserMutationSubmitZendeskTicketArgs = {
    collaborators: Maybe<Array<Scalars['String']>>;
    email: Scalars['String'];
    ticket: ZendeskTicketInput;
};
export declare type UserMutationUpdateArgs = {
    email: Maybe<Scalars['String']>;
    fullName: Maybe<Scalars['String']>;
    referrer: Maybe<Scalars['String']>;
    trackingGoogleClientId: Maybe<Scalars['String']>;
    trackingMarketoClientId: Maybe<Scalars['String']>;
    userSegment: Maybe<UserSegment>;
    utmCampaign: Maybe<Scalars['String']>;
    utmMedium: Maybe<Scalars['String']>;
    utmSource: Maybe<Scalars['String']>;
};
export declare type UserMutationUpdateBetaFeaturesOnArgs = {
    betaFeaturesOn: Scalars['Boolean'];
};
export declare type UserMutationUpdateFeatureIntrosArgs = {
    newFeatureIntros: Maybe<FeatureIntrosInput>;
};
export declare type UserMutationUpdateRoleArgs = {
    newRole: Maybe<InternalMdgAdminRole>;
};
export declare type UserMutationVerifyEmailArgs = {
    token: Scalars['String'];
};
export declare enum UserPermission {
    BillingManager = "BILLING_MANAGER",
    Consumer = "CONSUMER",
    Contributor = "CONTRIBUTOR",
    GraphAdmin = "GRAPH_ADMIN",
    LegacyGraphKey = "LEGACY_GRAPH_KEY",
    Observer = "OBSERVER",
    OrgAdmin = "ORG_ADMIN"
}
export declare enum UserSegment {
    JoinMyTeam = "JOIN_MY_TEAM",
    LocalDevelopment = "LOCAL_DEVELOPMENT",
    NotSpecified = "NOT_SPECIFIED",
    ProductionGraphs = "PRODUCTION_GRAPHS",
    Sandbox = "SANDBOX",
    TryTeam = "TRY_TEAM"
}
export declare type UserSettings = {
    __typename?: 'UserSettings';
    appNavCollapsed: Scalars['Boolean'];
    autoManageVariables: Scalars['Boolean'];
    id: Scalars['String'];
    mockingResponses: Scalars['Boolean'];
    preflightScriptEnabled: Scalars['Boolean'];
    responseHints: ResponseHints;
    tableMode: Scalars['Boolean'];
    themeName: ThemeName;
};
export declare type UserSettingsInput = {
    appNavCollapsed: Maybe<Scalars['Boolean']>;
    autoManageVariables: Maybe<Scalars['Boolean']>;
    mockingResponses: Maybe<Scalars['Boolean']>;
    preflightScriptEnabled: Maybe<Scalars['Boolean']>;
    responseHints: Maybe<ResponseHints>;
    tableMode: Maybe<Scalars['Boolean']>;
    themeName: Maybe<ThemeName>;
};
export declare enum UserType {
    Apollo = "APOLLO",
    Github = "GITHUB",
    Sso = "SSO"
}
export declare type ValidateOperationsResult = {
    __typename?: 'ValidateOperationsResult';
    validationResults: Array<ValidationResult>;
};
export declare enum ValidationErrorCode {
    DeprecatedField = "DEPRECATED_FIELD",
    InvalidOperation = "INVALID_OPERATION",
    NonParseableDocument = "NON_PARSEABLE_DOCUMENT"
}
export declare enum ValidationErrorType {
    Failure = "FAILURE",
    Invalid = "INVALID",
    Warning = "WARNING"
}
export declare type ValidationResult = {
    __typename?: 'ValidationResult';
    code: ValidationErrorCode;
    description: Scalars['String'];
    operation: OperationDocument;
    type: ValidationErrorType;
};
export declare type WebhookChannel = Channel & {
    __typename?: 'WebhookChannel';
    id: Scalars['ID'];
    name: Scalars['String'];
    secretToken: Maybe<Scalars['String']>;
    subscriptions: Array<ChannelSubscription>;
    url: Scalars['String'];
};
export declare type WebhookChannelInput = {
    name: Maybe<Scalars['String']>;
    secretToken: Maybe<Scalars['String']>;
    url: Scalars['String'];
};
export declare type ZendeskTicket = {
    __typename?: 'ZendeskTicket';
    createdAt: Scalars['Timestamp'];
    description: Scalars['String'];
    graph: Maybe<Service>;
    id: Scalars['Int'];
    organization: Maybe<Account>;
    priority: TicketPriority;
    status: Maybe<TicketStatus>;
    subject: Scalars['String'];
    user: Maybe<User>;
};
export declare type ZendeskTicketInput = {
    description: Scalars['String'];
    graphId: Maybe<Scalars['String']>;
    organizationId: Maybe<Scalars['String']>;
    priority: TicketPriority;
    subject: Scalars['String'];
};
export declare type FrontendUrlRootQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type FrontendUrlRootQuery = {
    __typename?: 'Query';
    frontendUrlRoot: string;
};
export declare type SchemaTagsAndFieldStatsQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type SchemaTagsAndFieldStatsQuery = {
    __typename?: 'Query';
    service: Maybe<{
        __typename?: 'Service';
        schemaTags: Maybe<Array<{
            __typename?: 'SchemaTag';
            tag: string;
        }>>;
        stats: {
            __typename?: 'ServiceStatsWindow';
            fieldLatencies: Array<{
                __typename?: 'ServiceFieldLatenciesRecord';
                groupBy: {
                    __typename?: 'ServiceFieldLatenciesDimensions';
                    parentType: Maybe<string>;
                    fieldName: Maybe<string>;
                };
                metrics: {
                    __typename?: 'ServiceFieldLatenciesMetrics';
                    fieldHistogram: {
                        __typename?: 'DurationHistogram';
                        durationMs: Maybe<number>;
                    };
                };
            }>;
        };
    }>;
};
export declare type GetSchemaByTagQueryVariables = Exact<{
    tag: Scalars['String'];
    id: Scalars['ID'];
}>;
export declare type GetSchemaByTagQuery = {
    __typename?: 'Query';
    service: Maybe<{
        __typename: 'Service';
        schema: Maybe<{
            __typename?: 'Schema';
            hash: string;
            __schema: {
                __typename?: 'IntrospectionSchema';
                queryType: {
                    __typename?: 'IntrospectionType';
                    name: Maybe<string>;
                };
                mutationType: Maybe<{
                    __typename?: 'IntrospectionType';
                    name: Maybe<string>;
                }>;
                subscriptionType: Maybe<{
                    __typename?: 'IntrospectionType';
                    name: Maybe<string>;
                }>;
                types: Array<{
                    __typename?: 'IntrospectionType';
                    kind: Maybe<IntrospectionTypeKind>;
                    name: Maybe<string>;
                    description: Maybe<string>;
                    fields: Maybe<Array<{
                        __typename?: 'IntrospectionField';
                        name: string;
                        description: Maybe<string>;
                        isDeprecated: boolean;
                        deprecationReason: Maybe<string>;
                        args: Array<{
                            __typename?: 'IntrospectionInputValue';
                            name: string;
                            description: Maybe<string>;
                            defaultValue: Maybe<string>;
                            type: {
                                __typename?: 'IntrospectionType';
                                kind: Maybe<IntrospectionTypeKind>;
                                name: Maybe<string>;
                                ofType: Maybe<{
                                    __typename?: 'IntrospectionType';
                                    kind: Maybe<IntrospectionTypeKind>;
                                    name: Maybe<string>;
                                    ofType: Maybe<{
                                        __typename?: 'IntrospectionType';
                                        kind: Maybe<IntrospectionTypeKind>;
                                        name: Maybe<string>;
                                        ofType: Maybe<{
                                            __typename?: 'IntrospectionType';
                                            kind: Maybe<IntrospectionTypeKind>;
                                            name: Maybe<string>;
                                            ofType: Maybe<{
                                                __typename?: 'IntrospectionType';
                                                kind: Maybe<IntrospectionTypeKind>;
                                                name: Maybe<string>;
                                                ofType: Maybe<{
                                                    __typename?: 'IntrospectionType';
                                                    kind: Maybe<IntrospectionTypeKind>;
                                                    name: Maybe<string>;
                                                    ofType: Maybe<{
                                                        __typename?: 'IntrospectionType';
                                                        kind: Maybe<IntrospectionTypeKind>;
                                                        name: Maybe<string>;
                                                        ofType: Maybe<{
                                                            __typename?: 'IntrospectionType';
                                                            kind: Maybe<IntrospectionTypeKind>;
                                                            name: Maybe<string>;
                                                        }>;
                                                    }>;
                                                }>;
                                            }>;
                                        }>;
                                    }>;
                                }>;
                            };
                        }>;
                        type: {
                            __typename?: 'IntrospectionType';
                            kind: Maybe<IntrospectionTypeKind>;
                            name: Maybe<string>;
                            ofType: Maybe<{
                                __typename?: 'IntrospectionType';
                                kind: Maybe<IntrospectionTypeKind>;
                                name: Maybe<string>;
                                ofType: Maybe<{
                                    __typename?: 'IntrospectionType';
                                    kind: Maybe<IntrospectionTypeKind>;
                                    name: Maybe<string>;
                                    ofType: Maybe<{
                                        __typename?: 'IntrospectionType';
                                        kind: Maybe<IntrospectionTypeKind>;
                                        name: Maybe<string>;
                                        ofType: Maybe<{
                                            __typename?: 'IntrospectionType';
                                            kind: Maybe<IntrospectionTypeKind>;
                                            name: Maybe<string>;
                                            ofType: Maybe<{
                                                __typename?: 'IntrospectionType';
                                                kind: Maybe<IntrospectionTypeKind>;
                                                name: Maybe<string>;
                                                ofType: Maybe<{
                                                    __typename?: 'IntrospectionType';
                                                    kind: Maybe<IntrospectionTypeKind>;
                                                    name: Maybe<string>;
                                                    ofType: Maybe<{
                                                        __typename?: 'IntrospectionType';
                                                        kind: Maybe<IntrospectionTypeKind>;
                                                        name: Maybe<string>;
                                                    }>;
                                                }>;
                                            }>;
                                        }>;
                                    }>;
                                }>;
                            }>;
                        };
                    }>>;
                    inputFields: Maybe<Array<{
                        __typename?: 'IntrospectionInputValue';
                        name: string;
                        description: Maybe<string>;
                        defaultValue: Maybe<string>;
                        type: {
                            __typename?: 'IntrospectionType';
                            kind: Maybe<IntrospectionTypeKind>;
                            name: Maybe<string>;
                            ofType: Maybe<{
                                __typename?: 'IntrospectionType';
                                kind: Maybe<IntrospectionTypeKind>;
                                name: Maybe<string>;
                                ofType: Maybe<{
                                    __typename?: 'IntrospectionType';
                                    kind: Maybe<IntrospectionTypeKind>;
                                    name: Maybe<string>;
                                    ofType: Maybe<{
                                        __typename?: 'IntrospectionType';
                                        kind: Maybe<IntrospectionTypeKind>;
                                        name: Maybe<string>;
                                        ofType: Maybe<{
                                            __typename?: 'IntrospectionType';
                                            kind: Maybe<IntrospectionTypeKind>;
                                            name: Maybe<string>;
                                            ofType: Maybe<{
                                                __typename?: 'IntrospectionType';
                                                kind: Maybe<IntrospectionTypeKind>;
                                                name: Maybe<string>;
                                                ofType: Maybe<{
                                                    __typename?: 'IntrospectionType';
                                                    kind: Maybe<IntrospectionTypeKind>;
                                                    name: Maybe<string>;
                                                    ofType: Maybe<{
                                                        __typename?: 'IntrospectionType';
                                                        kind: Maybe<IntrospectionTypeKind>;
                                                        name: Maybe<string>;
                                                    }>;
                                                }>;
                                            }>;
                                        }>;
                                    }>;
                                }>;
                            }>;
                        };
                    }>>;
                    interfaces: Maybe<Array<{
                        __typename?: 'IntrospectionType';
                        kind: Maybe<IntrospectionTypeKind>;
                        name: Maybe<string>;
                        ofType: Maybe<{
                            __typename?: 'IntrospectionType';
                            kind: Maybe<IntrospectionTypeKind>;
                            name: Maybe<string>;
                            ofType: Maybe<{
                                __typename?: 'IntrospectionType';
                                kind: Maybe<IntrospectionTypeKind>;
                                name: Maybe<string>;
                                ofType: Maybe<{
                                    __typename?: 'IntrospectionType';
                                    kind: Maybe<IntrospectionTypeKind>;
                                    name: Maybe<string>;
                                    ofType: Maybe<{
                                        __typename?: 'IntrospectionType';
                                        kind: Maybe<IntrospectionTypeKind>;
                                        name: Maybe<string>;
                                        ofType: Maybe<{
                                            __typename?: 'IntrospectionType';
                                            kind: Maybe<IntrospectionTypeKind>;
                                            name: Maybe<string>;
                                            ofType: Maybe<{
                                                __typename?: 'IntrospectionType';
                                                kind: Maybe<IntrospectionTypeKind>;
                                                name: Maybe<string>;
                                                ofType: Maybe<{
                                                    __typename?: 'IntrospectionType';
                                                    kind: Maybe<IntrospectionTypeKind>;
                                                    name: Maybe<string>;
                                                }>;
                                            }>;
                                        }>;
                                    }>;
                                }>;
                            }>;
                        }>;
                    }>>;
                    enumValues: Maybe<Array<{
                        __typename?: 'IntrospectionEnumValue';
                        name: string;
                        description: Maybe<string>;
                        isDeprecated: boolean;
                        deprecationReason: Maybe<string>;
                    }>>;
                    possibleTypes: Maybe<Array<{
                        __typename?: 'IntrospectionType';
                        kind: Maybe<IntrospectionTypeKind>;
                        name: Maybe<string>;
                        ofType: Maybe<{
                            __typename?: 'IntrospectionType';
                            kind: Maybe<IntrospectionTypeKind>;
                            name: Maybe<string>;
                            ofType: Maybe<{
                                __typename?: 'IntrospectionType';
                                kind: Maybe<IntrospectionTypeKind>;
                                name: Maybe<string>;
                                ofType: Maybe<{
                                    __typename?: 'IntrospectionType';
                                    kind: Maybe<IntrospectionTypeKind>;
                                    name: Maybe<string>;
                                    ofType: Maybe<{
                                        __typename?: 'IntrospectionType';
                                        kind: Maybe<IntrospectionTypeKind>;
                                        name: Maybe<string>;
                                        ofType: Maybe<{
                                            __typename?: 'IntrospectionType';
                                            kind: Maybe<IntrospectionTypeKind>;
                                            name: Maybe<string>;
                                            ofType: Maybe<{
                                                __typename?: 'IntrospectionType';
                                                kind: Maybe<IntrospectionTypeKind>;
                                                name: Maybe<string>;
                                                ofType: Maybe<{
                                                    __typename?: 'IntrospectionType';
                                                    kind: Maybe<IntrospectionTypeKind>;
                                                    name: Maybe<string>;
                                                }>;
                                            }>;
                                        }>;
                                    }>;
                                }>;
                            }>;
                        }>;
                    }>>;
                }>;
                directives: Array<{
                    __typename?: 'IntrospectionDirective';
                    name: string;
                    description: Maybe<string>;
                    locations: Array<IntrospectionDirectiveLocation>;
                    args: Array<{
                        __typename?: 'IntrospectionInputValue';
                        name: string;
                        description: Maybe<string>;
                        defaultValue: Maybe<string>;
                        type: {
                            __typename?: 'IntrospectionType';
                            kind: Maybe<IntrospectionTypeKind>;
                            name: Maybe<string>;
                            ofType: Maybe<{
                                __typename?: 'IntrospectionType';
                                kind: Maybe<IntrospectionTypeKind>;
                                name: Maybe<string>;
                                ofType: Maybe<{
                                    __typename?: 'IntrospectionType';
                                    kind: Maybe<IntrospectionTypeKind>;
                                    name: Maybe<string>;
                                    ofType: Maybe<{
                                        __typename?: 'IntrospectionType';
                                        kind: Maybe<IntrospectionTypeKind>;
                                        name: Maybe<string>;
                                        ofType: Maybe<{
                                            __typename?: 'IntrospectionType';
                                            kind: Maybe<IntrospectionTypeKind>;
                                            name: Maybe<string>;
                                            ofType: Maybe<{
                                                __typename?: 'IntrospectionType';
                                                kind: Maybe<IntrospectionTypeKind>;
                                                name: Maybe<string>;
                                                ofType: Maybe<{
                                                    __typename?: 'IntrospectionType';
                                                    kind: Maybe<IntrospectionTypeKind>;
                                                    name: Maybe<string>;
                                                    ofType: Maybe<{
                                                        __typename?: 'IntrospectionType';
                                                        kind: Maybe<IntrospectionTypeKind>;
                                                        name: Maybe<string>;
                                                    }>;
                                                }>;
                                            }>;
                                        }>;
                                    }>;
                                }>;
                            }>;
                        };
                    }>;
                }>;
            };
        }>;
    }>;
};
export declare type IntrospectionFullTypeFragment = {
    __typename?: 'IntrospectionType';
    kind: Maybe<IntrospectionTypeKind>;
    name: Maybe<string>;
    description: Maybe<string>;
    fields: Maybe<Array<{
        __typename?: 'IntrospectionField';
        name: string;
        description: Maybe<string>;
        isDeprecated: boolean;
        deprecationReason: Maybe<string>;
        args: Array<{
            __typename?: 'IntrospectionInputValue';
            name: string;
            description: Maybe<string>;
            defaultValue: Maybe<string>;
            type: {
                __typename?: 'IntrospectionType';
                kind: Maybe<IntrospectionTypeKind>;
                name: Maybe<string>;
                ofType: Maybe<{
                    __typename?: 'IntrospectionType';
                    kind: Maybe<IntrospectionTypeKind>;
                    name: Maybe<string>;
                    ofType: Maybe<{
                        __typename?: 'IntrospectionType';
                        kind: Maybe<IntrospectionTypeKind>;
                        name: Maybe<string>;
                        ofType: Maybe<{
                            __typename?: 'IntrospectionType';
                            kind: Maybe<IntrospectionTypeKind>;
                            name: Maybe<string>;
                            ofType: Maybe<{
                                __typename?: 'IntrospectionType';
                                kind: Maybe<IntrospectionTypeKind>;
                                name: Maybe<string>;
                                ofType: Maybe<{
                                    __typename?: 'IntrospectionType';
                                    kind: Maybe<IntrospectionTypeKind>;
                                    name: Maybe<string>;
                                    ofType: Maybe<{
                                        __typename?: 'IntrospectionType';
                                        kind: Maybe<IntrospectionTypeKind>;
                                        name: Maybe<string>;
                                        ofType: Maybe<{
                                            __typename?: 'IntrospectionType';
                                            kind: Maybe<IntrospectionTypeKind>;
                                            name: Maybe<string>;
                                        }>;
                                    }>;
                                }>;
                            }>;
                        }>;
                    }>;
                }>;
            };
        }>;
        type: {
            __typename?: 'IntrospectionType';
            kind: Maybe<IntrospectionTypeKind>;
            name: Maybe<string>;
            ofType: Maybe<{
                __typename?: 'IntrospectionType';
                kind: Maybe<IntrospectionTypeKind>;
                name: Maybe<string>;
                ofType: Maybe<{
                    __typename?: 'IntrospectionType';
                    kind: Maybe<IntrospectionTypeKind>;
                    name: Maybe<string>;
                    ofType: Maybe<{
                        __typename?: 'IntrospectionType';
                        kind: Maybe<IntrospectionTypeKind>;
                        name: Maybe<string>;
                        ofType: Maybe<{
                            __typename?: 'IntrospectionType';
                            kind: Maybe<IntrospectionTypeKind>;
                            name: Maybe<string>;
                            ofType: Maybe<{
                                __typename?: 'IntrospectionType';
                                kind: Maybe<IntrospectionTypeKind>;
                                name: Maybe<string>;
                                ofType: Maybe<{
                                    __typename?: 'IntrospectionType';
                                    kind: Maybe<IntrospectionTypeKind>;
                                    name: Maybe<string>;
                                    ofType: Maybe<{
                                        __typename?: 'IntrospectionType';
                                        kind: Maybe<IntrospectionTypeKind>;
                                        name: Maybe<string>;
                                    }>;
                                }>;
                            }>;
                        }>;
                    }>;
                }>;
            }>;
        };
    }>>;
    inputFields: Maybe<Array<{
        __typename?: 'IntrospectionInputValue';
        name: string;
        description: Maybe<string>;
        defaultValue: Maybe<string>;
        type: {
            __typename?: 'IntrospectionType';
            kind: Maybe<IntrospectionTypeKind>;
            name: Maybe<string>;
            ofType: Maybe<{
                __typename?: 'IntrospectionType';
                kind: Maybe<IntrospectionTypeKind>;
                name: Maybe<string>;
                ofType: Maybe<{
                    __typename?: 'IntrospectionType';
                    kind: Maybe<IntrospectionTypeKind>;
                    name: Maybe<string>;
                    ofType: Maybe<{
                        __typename?: 'IntrospectionType';
                        kind: Maybe<IntrospectionTypeKind>;
                        name: Maybe<string>;
                        ofType: Maybe<{
                            __typename?: 'IntrospectionType';
                            kind: Maybe<IntrospectionTypeKind>;
                            name: Maybe<string>;
                            ofType: Maybe<{
                                __typename?: 'IntrospectionType';
                                kind: Maybe<IntrospectionTypeKind>;
                                name: Maybe<string>;
                                ofType: Maybe<{
                                    __typename?: 'IntrospectionType';
                                    kind: Maybe<IntrospectionTypeKind>;
                                    name: Maybe<string>;
                                    ofType: Maybe<{
                                        __typename?: 'IntrospectionType';
                                        kind: Maybe<IntrospectionTypeKind>;
                                        name: Maybe<string>;
                                    }>;
                                }>;
                            }>;
                        }>;
                    }>;
                }>;
            }>;
        };
    }>>;
    interfaces: Maybe<Array<{
        __typename?: 'IntrospectionType';
        kind: Maybe<IntrospectionTypeKind>;
        name: Maybe<string>;
        ofType: Maybe<{
            __typename?: 'IntrospectionType';
            kind: Maybe<IntrospectionTypeKind>;
            name: Maybe<string>;
            ofType: Maybe<{
                __typename?: 'IntrospectionType';
                kind: Maybe<IntrospectionTypeKind>;
                name: Maybe<string>;
                ofType: Maybe<{
                    __typename?: 'IntrospectionType';
                    kind: Maybe<IntrospectionTypeKind>;
                    name: Maybe<string>;
                    ofType: Maybe<{
                        __typename?: 'IntrospectionType';
                        kind: Maybe<IntrospectionTypeKind>;
                        name: Maybe<string>;
                        ofType: Maybe<{
                            __typename?: 'IntrospectionType';
                            kind: Maybe<IntrospectionTypeKind>;
                            name: Maybe<string>;
                            ofType: Maybe<{
                                __typename?: 'IntrospectionType';
                                kind: Maybe<IntrospectionTypeKind>;
                                name: Maybe<string>;
                                ofType: Maybe<{
                                    __typename?: 'IntrospectionType';
                                    kind: Maybe<IntrospectionTypeKind>;
                                    name: Maybe<string>;
                                }>;
                            }>;
                        }>;
                    }>;
                }>;
            }>;
        }>;
    }>>;
    enumValues: Maybe<Array<{
        __typename?: 'IntrospectionEnumValue';
        name: string;
        description: Maybe<string>;
        isDeprecated: boolean;
        deprecationReason: Maybe<string>;
    }>>;
    possibleTypes: Maybe<Array<{
        __typename?: 'IntrospectionType';
        kind: Maybe<IntrospectionTypeKind>;
        name: Maybe<string>;
        ofType: Maybe<{
            __typename?: 'IntrospectionType';
            kind: Maybe<IntrospectionTypeKind>;
            name: Maybe<string>;
            ofType: Maybe<{
                __typename?: 'IntrospectionType';
                kind: Maybe<IntrospectionTypeKind>;
                name: Maybe<string>;
                ofType: Maybe<{
                    __typename?: 'IntrospectionType';
                    kind: Maybe<IntrospectionTypeKind>;
                    name: Maybe<string>;
                    ofType: Maybe<{
                        __typename?: 'IntrospectionType';
                        kind: Maybe<IntrospectionTypeKind>;
                        name: Maybe<string>;
                        ofType: Maybe<{
                            __typename?: 'IntrospectionType';
                            kind: Maybe<IntrospectionTypeKind>;
                            name: Maybe<string>;
                            ofType: Maybe<{
                                __typename?: 'IntrospectionType';
                                kind: Maybe<IntrospectionTypeKind>;
                                name: Maybe<string>;
                                ofType: Maybe<{
                                    __typename?: 'IntrospectionType';
                                    kind: Maybe<IntrospectionTypeKind>;
                                    name: Maybe<string>;
                                }>;
                            }>;
                        }>;
                    }>;
                }>;
            }>;
        }>;
    }>>;
};
export declare type IntrospectionInputValueFragment = {
    __typename?: 'IntrospectionInputValue';
    name: string;
    description: Maybe<string>;
    defaultValue: Maybe<string>;
    type: {
        __typename?: 'IntrospectionType';
        kind: Maybe<IntrospectionTypeKind>;
        name: Maybe<string>;
        ofType: Maybe<{
            __typename?: 'IntrospectionType';
            kind: Maybe<IntrospectionTypeKind>;
            name: Maybe<string>;
            ofType: Maybe<{
                __typename?: 'IntrospectionType';
                kind: Maybe<IntrospectionTypeKind>;
                name: Maybe<string>;
                ofType: Maybe<{
                    __typename?: 'IntrospectionType';
                    kind: Maybe<IntrospectionTypeKind>;
                    name: Maybe<string>;
                    ofType: Maybe<{
                        __typename?: 'IntrospectionType';
                        kind: Maybe<IntrospectionTypeKind>;
                        name: Maybe<string>;
                        ofType: Maybe<{
                            __typename?: 'IntrospectionType';
                            kind: Maybe<IntrospectionTypeKind>;
                            name: Maybe<string>;
                            ofType: Maybe<{
                                __typename?: 'IntrospectionType';
                                kind: Maybe<IntrospectionTypeKind>;
                                name: Maybe<string>;
                                ofType: Maybe<{
                                    __typename?: 'IntrospectionType';
                                    kind: Maybe<IntrospectionTypeKind>;
                                    name: Maybe<string>;
                                }>;
                            }>;
                        }>;
                    }>;
                }>;
            }>;
        }>;
    };
};
export declare type IntrospectionTypeRefFragment = {
    __typename?: 'IntrospectionType';
    kind: Maybe<IntrospectionTypeKind>;
    name: Maybe<string>;
    ofType: Maybe<{
        __typename?: 'IntrospectionType';
        kind: Maybe<IntrospectionTypeKind>;
        name: Maybe<string>;
        ofType: Maybe<{
            __typename?: 'IntrospectionType';
            kind: Maybe<IntrospectionTypeKind>;
            name: Maybe<string>;
            ofType: Maybe<{
                __typename?: 'IntrospectionType';
                kind: Maybe<IntrospectionTypeKind>;
                name: Maybe<string>;
                ofType: Maybe<{
                    __typename?: 'IntrospectionType';
                    kind: Maybe<IntrospectionTypeKind>;
                    name: Maybe<string>;
                    ofType: Maybe<{
                        __typename?: 'IntrospectionType';
                        kind: Maybe<IntrospectionTypeKind>;
                        name: Maybe<string>;
                        ofType: Maybe<{
                            __typename?: 'IntrospectionType';
                            kind: Maybe<IntrospectionTypeKind>;
                            name: Maybe<string>;
                            ofType: Maybe<{
                                __typename?: 'IntrospectionType';
                                kind: Maybe<IntrospectionTypeKind>;
                                name: Maybe<string>;
                            }>;
                        }>;
                    }>;
                }>;
            }>;
        }>;
    }>;
};
//# sourceMappingURL=graphqlTypes.d.ts.map