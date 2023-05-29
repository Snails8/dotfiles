"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const graphql_1 = require("graphql");
const graphql_2 = require("../graphql");
describe("withTypenameFieldAddedWhereNeeded", () => {
    it("properly adds __typename to each selectionSet", () => {
        const query = graphql_tag_1.default `
      query Product {
        product {
          sku
          color {
            id
            value
          }
        }
      }
    `;
        const withTypenames = graphql_2.withTypenameFieldAddedWhereNeeded(query);
        expect(graphql_1.print(withTypenames)).toMatchInlineSnapshot(`
      "query Product {
        product {
          __typename
          sku
          color {
            __typename
            id
            value
          }
        }
      }
      "
    `);
    });
    it("adds __typename to InlineFragment nodes (as ApolloClient does)", () => {
        const query = graphql_tag_1.default `
      query CartItems {
        product {
          items {
            ... on Table {
              material
            }
            ... on Paint {
              color
            }
          }
        }
      }
    `;
        const withTypenames = graphql_2.withTypenameFieldAddedWhereNeeded(query);
        expect(graphql_1.print(withTypenames)).toMatchInlineSnapshot(`
      "query CartItems {
        product {
          __typename
          items {
            __typename
            ... on Table {
              __typename
              material
            }
            ... on Paint {
              __typename
              color
            }
          }
        }
      }
      "
    `);
    });
});
describe("removeDirectiveAnnotatedFields", () => {
    it("should remove fields with matching directives", () => {
        expect(graphql_1.print(graphql_2.removeDirectiveAnnotatedFields(graphql_1.parse(`query Query { fieldToKeep fieldToRemove @client }`), ["client"]))).toMatchInlineSnapshot(`
            "query Query {
              fieldToKeep
            }
            "
        `);
    });
    it("trim selections sets that are client only", () => {
        expect(graphql_1.print(graphql_2.removeDirectiveAnnotatedFields(graphql_1.parse(`
            query Query {
              fieldToKeep
              fieldToRemove @client {
                childField
              }
            }
          `), ["client"]))).toMatchInlineSnapshot(`
      "query Query {
        fieldToKeep
      }
      "
    `);
    });
    it("should remove fragments when a directive is used on a fragment spread", () => {
        expect(graphql_1.print(graphql_2.removeDirectiveAnnotatedFields(graphql_1.parse(`
            {
              me { name }
              ...ClientFields @client
            }
            fragment ClientFields on Query {
              hello
            }
          `), ["client"]))).toMatchInlineSnapshot(`
        "{
          me {
            name
          }
        }
        "
    `);
    });
    it("should remove fragments when client directive is used inline", () => {
        expect(graphql_1.print(graphql_2.removeDirectiveAnnotatedFields(graphql_1.parse(`
            {
              me { name }
              ... on Query @client {
                hello
              }
            }
          `), ["client"]))).toMatchInlineSnapshot(`
            "{
              me {
                name
              }
            }
            "
        `);
    });
    it("should remove fragments when the client directive is on the definition", () => {
        expect(graphql_1.print(graphql_2.removeDirectiveAnnotatedFields(graphql_1.parse(`
            fragment ClientObject on Query @client {
              hello
            }
            {
              me { name }
              ... ClientObject
            }
          `), ["client"]))).toMatchInlineSnapshot(`
      "{
        me {
          name
        }
      }
      "
    `);
    });
    it("should remove fragments that become unused when antecendant directives are removed", () => {
        expect(graphql_1.print(graphql_2.removeDirectiveAnnotatedFields(graphql_1.parse(`
            fragment ClientObjectFragment on ClientObject {
              string
              number
            }

            fragment LaunchTile on Launch {
              __typename
              id
              isBooked
              rocket {
                id
                name
              }
              mission {
                name
                missionPatch
              }
            }

            query LaunchDetails($launchId: ID!) {
              launch(id: $launchId) {
                isInCart @client
                clientObject @client {
                  ...ClientObjectFragment
                }
                site
                rocket {
                  type
                }
                ...LaunchTile
              }
            }
          `), ["client"]))).toMatchInlineSnapshot(`
      "fragment LaunchTile on Launch {
        __typename
        id
        isBooked
        rocket {
          id
          name
        }
        mission {
          name
          missionPatch
        }
      }

      query LaunchDetails($launchId: ID!) {
        launch(id: $launchId) {
          site
          rocket {
            type
          }
          ...LaunchTile
        }
      }
      "
    `);
    });
    it("should recursively remove fragments that become unused when antecendant directives are removed", () => {
        expect(graphql_1.print(graphql_2.removeDirectiveAnnotatedFields(graphql_1.parse(`
            fragment One on Node {
              ...Two
              user {
                friends {
                  name
                  ...Two @client
                }
              }
            }
            fragment Two on Node {
              id
            }

            query {
              me {
                ...One
              }
            }
          `), ["client"]))).toMatchInlineSnapshot(`
      "fragment One on Node {
        ...Two
        user {
          friends {
            name
          }
        }
      }

      fragment Two on Node {
        id
      }

      {
        me {
          ...One
        }
      }
      "
    `);
    });
    it("should remove fragment spreads from @client fragment definitions", () => {
        expect(graphql_1.print(graphql_2.removeDirectiveAnnotatedFields(graphql_1.parse(`
            fragment One on Node @client {
              ...Two
            }

            fragment Two on Node {
              id
            }

            query {
              me {
                name
                ...One
              }
            }
          `), ["client"]))).toMatchInlineSnapshot(`
      "{
        me {
          name
        }
      }
      "
    `);
    });
    it("should remove all operations that have no selection set after fragments are removed", () => {
        expect(graphql_1.print(graphql_2.removeDirectiveAnnotatedFields(graphql_1.parse(`
            fragment One on Node @client {
              ...Two
            }

            fragment Two on Node {
              id
            }

            {
              name
              me {
                ...One
              }
            }
          `), ["client"]))).toMatchInlineSnapshot(`
      "{
        name
      }
      "
    `);
    });
    it("should not remove fragment definitions that weren't removed by `removeDirectiveAnnotatedFields`", () => {
        expect(graphql_1.print(graphql_2.removeDirectiveAnnotatedFields(graphql_1.parse(`
            fragment One on Node {
              id
            }

            {
              me {
                name
              }
            }
          `), ["client"]))).toMatchInlineSnapshot(`
      "fragment One on Node {
        id
      }

      {
        me {
          name
        }
      }
      "
    `);
    });
});
//# sourceMappingURL=graphql.test.js.map