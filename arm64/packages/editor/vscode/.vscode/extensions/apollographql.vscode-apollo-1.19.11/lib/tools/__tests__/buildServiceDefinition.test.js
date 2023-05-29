"use strict";
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const buildServiceDefinition_1 = require("../buildServiceDefinition");
const graphql_1 = require("graphql");
describe("buildServiceDefinition", () => {
    describe(`type definitions`, () => {
        it(`should include types from different modules`, () => {
            const service = buildServiceDefinition_1.buildServiceDefinition([
                {
                    typeDefs: graphql_tag_1.default `
            type User {
              name: String
            }
          `,
                },
                {
                    typeDefs: graphql_tag_1.default `
            type Post {
              title: String
            }
          `,
                },
            ]);
            expect(service.errors).toBeUndefined();
            expect(service.schema).toBeDefined();
            const schema = service.schema;
            expect(graphql_1.printType(schema.getType("User"))).toMatchInlineSnapshot(`
"type User {
  name: String
}"
`);
            expect(graphql_1.printType(schema.getType("Post"))).toMatchInlineSnapshot(`
"type Post {
  title: String
}"
`);
        });
        it(`should not allow two types with the same name in the same module`, () => {
            const service = buildServiceDefinition_1.buildServiceDefinition([
                {
                    typeDefs: graphql_tag_1.default `
            type User {
              name: String
            }
          `,
                },
                {
                    typeDefs: graphql_tag_1.default `
            type User {
              title: String
            }
          `,
                },
            ]);
            expect(service.errors).toMatchInlineSnapshot(`
Array [
  [GraphQLError: Type "User" was defined more than once.],
]
`);
        });
        it(`should not allow two types with the same name in different modules`, () => {
            const service = buildServiceDefinition_1.buildServiceDefinition([
                {
                    typeDefs: graphql_tag_1.default `
            type User {
              name: String
            }
          `,
                },
                {
                    typeDefs: graphql_tag_1.default `
            type User {
              title: String
            }
          `,
                },
            ]);
            expect(service.errors).toMatchInlineSnapshot(`
Array [
  [GraphQLError: Type "User" was defined more than once.],
]
`);
        });
        it(`should report multiple type duplication errors`, () => {
            const service = buildServiceDefinition_1.buildServiceDefinition([
                {
                    typeDefs: graphql_tag_1.default `
            type User {
              name: String
            }
          `,
                },
                {
                    typeDefs: graphql_tag_1.default `
            type User {
              title: String
            }
          `,
                },
                {
                    typeDefs: graphql_tag_1.default `
            type Post {
              title: String
            }
          `,
                },
                {
                    typeDefs: graphql_tag_1.default `
            type Post {
              name: String
            }
          `,
                },
            ]);
            expect(service.errors).toMatchInlineSnapshot(`
Array [
  [GraphQLError: Type "User" was defined more than once.],
  [GraphQLError: Type "Post" was defined more than once.],
]
`);
        });
    });
    describe(`directive definitions`, () => {
        it(`should include directive`, () => {
            const service = buildServiceDefinition_1.buildServiceDefinition([
                {
                    typeDefs: graphql_tag_1.default `
            directive @something on FIELD_DEFINITION
          `,
                },
            ]);
            expect(service.errors).toBeUndefined();
            expect(service.schema).toBeDefined();
            const schema = service.schema;
            const directive = schema.getDirective("something");
            expect(directive).toBeDefined();
        });
        it(`should include directives from different modules`, () => {
            const service = buildServiceDefinition_1.buildServiceDefinition([
                {
                    typeDefs: graphql_tag_1.default `
            directive @something on FIELD_DEFINITION
          `,
                },
                {
                    typeDefs: graphql_tag_1.default `
            directive @another on FIELD_DEFINITION
          `,
                },
            ]);
            expect(service.errors).toBeUndefined();
            expect(service.schema).toBeDefined();
            const schema = service.schema;
            expect(schema.getDirective("something")).toMatchInlineSnapshot(`"@something"`);
            expect(schema.getDirective("another")).toMatchInlineSnapshot(`"@another"`);
        });
        it(`should not allow two types with the same name in the same module`, () => {
            const service = buildServiceDefinition_1.buildServiceDefinition([
                {
                    typeDefs: graphql_tag_1.default `
            directive @something on FIELD_DEFINITION
          `,
                },
                {
                    typeDefs: graphql_tag_1.default `
            directive @something on FIELD_DEFINITION
          `,
                },
            ]);
            expect(service.errors).toMatchInlineSnapshot(`
Array [
  [GraphQLError: Directive "something" was defined more than once.],
]
`);
        });
        it(`should not allow two types with the same name in different modules`, () => {
            const service = buildServiceDefinition_1.buildServiceDefinition([
                {
                    typeDefs: graphql_tag_1.default `
            directive @something on FIELD_DEFINITION
          `,
                },
                {
                    typeDefs: graphql_tag_1.default `
            directive @something on FIELD_DEFINITION
          `,
                },
            ]);
            expect(service.errors).toMatchInlineSnapshot(`
Array [
  [GraphQLError: Directive "something" was defined more than once.],
]
`);
        });
        it(`should report multiple type duplication errors`, () => {
            const service = buildServiceDefinition_1.buildServiceDefinition([
                {
                    typeDefs: graphql_tag_1.default `
            directive @something on FIELD_DEFINITION
          `,
                },
                {
                    typeDefs: graphql_tag_1.default `
            directive @something on FIELD_DEFINITION
          `,
                },
                {
                    typeDefs: graphql_tag_1.default `
            directive @another on FIELD_DEFINITION
          `,
                },
                {
                    typeDefs: graphql_tag_1.default `
            directive @another on FIELD_DEFINITION
          `,
                },
            ]);
            expect(service.errors).toMatchInlineSnapshot(`
Array [
  [GraphQLError: Directive "something" was defined more than once.],
  [GraphQLError: Directive "another" was defined more than once.],
]
`);
        });
    });
    describe(`type extension`, () => {
        it(`should allow extending a type from the same module`, () => {
            const service = buildServiceDefinition_1.buildServiceDefinition([
                {
                    typeDefs: graphql_tag_1.default `
            type User {
              name: String
            }

            extend type User {
              email: String
            }
          `,
                },
            ]);
            expect(service.errors).toBeUndefined();
            expect(service.schema).toBeDefined();
            const schema = service.schema;
            expect(graphql_1.printType(schema.getType("User"))).toMatchInlineSnapshot(`
"type User {
  name: String
  email: String
}"
`);
        });
        it(`should allow extending a type from a different module`, () => {
            const service = buildServiceDefinition_1.buildServiceDefinition([
                {
                    typeDefs: graphql_tag_1.default `
            type User {
              name: String
            }
          `,
                },
                {
                    typeDefs: graphql_tag_1.default `
            extend type User {
              email: String
            }
          `,
                },
            ]);
            expect(service.errors).toBeUndefined();
            expect(service.schema).toBeDefined();
            const schema = service.schema;
            expect(graphql_1.printType(schema.getType("User"))).toMatchInlineSnapshot(`
"type User {
  name: String
  email: String
}"
`);
        });
        it(`should report an error when extending a non-existent type`, () => {
            const service = buildServiceDefinition_1.buildServiceDefinition([
                {
                    typeDefs: graphql_tag_1.default `
            extend type User {
              email: String
            }
          `,
                },
            ]);
            expect(service.errors).toMatchInlineSnapshot(`
Array [
  [GraphQLError: Cannot extend type "User" because it does not exist in the existing schema.],
]
`);
        });
    });
    describe(`extending root operation types that aren't defined elsewhere`, () => {
        it(`should be allowed`, () => {
            const service = buildServiceDefinition_1.buildServiceDefinition([
                {
                    typeDefs: graphql_tag_1.default `
            extend type Query {
              rootField: String
            }
          `,
                },
            ]);
            expect(service.errors).toBeUndefined();
            expect(service.schema).toBeDefined();
            const schema = service.schema;
            expect(graphql_1.printType(schema.getType("Query"))).toMatchInlineSnapshot(`
"type Query {
  rootField: String
}"
`);
        });
        it(`should be allowed with non default type names`, () => {
            const service = buildServiceDefinition_1.buildServiceDefinition([
                {
                    typeDefs: graphql_tag_1.default `
            schema {
              query: QueryRoot
            }
            extend type QueryRoot {
              rootField: String
            }
          `,
                },
            ]);
            expect(service.errors).toBeUndefined();
            expect(service.schema).toBeDefined();
            const schema = service.schema;
            expect(graphql_1.printType(schema.getType("QueryRoot"))).toMatchInlineSnapshot(`
"type QueryRoot {
  rootField: String
}"
`);
        });
        it(`should be allowed with non default nanmes specified in schema extensions`, () => {
            const service = buildServiceDefinition_1.buildServiceDefinition([
                {
                    typeDefs: graphql_tag_1.default `
            schema {
              query: QueryRoot
            }
            type QueryRoot {
              rootField: String
            }
          `,
                },
                {
                    typeDefs: graphql_tag_1.default `
          extend schema {
            mutation: MutationRoot
          }
          extend type MutationRoot {
            rootField: String
          }
        `,
                },
            ]);
            expect(service.errors).toBeUndefined();
            expect(service.schema).toBeDefined();
            const schema = service.schema;
            expect(graphql_1.printType(schema.getType("MutationRoot"))).toMatchInlineSnapshot(`
"type MutationRoot {
  rootField: String
}"
`);
        });
    });
    describe(`resolvers`, () => {
        it(`should add a resolver for a field`, () => {
            const name = () => { };
            const service = buildServiceDefinition_1.buildServiceDefinition([
                {
                    typeDefs: graphql_tag_1.default `
            type User {
              name: String
            }
          `,
                    resolvers: {
                        User: {
                            name,
                        },
                    },
                },
            ]);
            expect(service.schema).toBeDefined();
            const schema = service.schema;
            const userType = schema.getType("User");
            expect(userType).toBeDefined();
            const nameField = userType.getFields()["name"];
            expect(nameField).toBeDefined();
            expect(nameField.resolve).toEqual(name);
        });
        it(`should handle subscriptions`, () => {
            const commentAddedSubscription = () => function () {
                return __asyncGenerator(this, arguments, function* () {
                    yield yield __await("111");
                    yield yield __await("222");
                    yield yield __await("333");
                });
            };
            const service = buildServiceDefinition_1.buildServiceDefinition([
                {
                    typeDefs: graphql_tag_1.default `
            type Subscription {
              commentAdded: String
            }
          `,
                    resolvers: {
                        Subscription: {
                            commentAdded: {
                                subscribe: commentAddedSubscription,
                            },
                        },
                    },
                },
            ]);
            expect(service.schema).toBeDefined();
            const schema = service.schema;
            const subscriptionType = schema.getType("Subscription");
            expect(subscriptionType).toBeDefined();
            const commentAdded = subscriptionType.getFields()["commentAdded"];
            expect(commentAdded).toBeDefined();
            expect(commentAdded.subscribe).toEqual(commentAddedSubscription);
        });
    });
});
//# sourceMappingURL=buildServiceDefinition.test.js.map