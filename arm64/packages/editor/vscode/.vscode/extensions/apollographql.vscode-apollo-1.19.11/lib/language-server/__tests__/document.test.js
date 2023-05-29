"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = require("../document");
describe("extractGraphQLDocuments", () => {
    describe("extracting documents from JavaScript template literals", () => {
        const mockTextDocument = (text) => ({
            getText: jest.fn().mockReturnValue(text),
            offsetAt() {
                return 0;
            },
            positionAt() {
                return {
                    character: 0,
                    line: 0,
                };
            },
            languageId: "javascript",
            lineCount: 0,
            uri: "",
            version: 1,
        });
        it("works with placeholders that span multiple rows", () => {
            var _a;
            const textDocument = mockTextDocument(`
      gql\`
        {
          hero {
            ...Hero_character
          }
        }

        \${Hero.fragments
          .character}
      \`
    `);
            const documents = document_1.extractGraphQLDocuments(textDocument);
            expect(documents === null || documents === void 0 ? void 0 : documents.length).toEqual(1);
            expect(documents === null || documents === void 0 ? void 0 : documents[0].syntaxErrors.length).toBe(0);
            expect((_a = documents === null || documents === void 0 ? void 0 : documents[0].ast) === null || _a === void 0 ? void 0 : _a.definitions.length).toBe(1);
        });
        it("works with multiple placeholders in a document", () => {
            var _a;
            const textDocument = mockTextDocument(`
      gql\`
        {
          hero {
            ...Hero_character
          }
        }

        \${Hero.fragments.character}

        {
          reviews(episode: NEWHOPE) {
            ...ReviewList_reviews
          }
        }

        \${ReviewList.fragments.reviews}
      \`
    `);
            const documents = document_1.extractGraphQLDocuments(textDocument);
            expect(documents === null || documents === void 0 ? void 0 : documents.length).toEqual(1);
            expect(documents === null || documents === void 0 ? void 0 : documents[0].syntaxErrors.length).toBe(0);
            expect((_a = documents === null || documents === void 0 ? void 0 : documents[0].ast) === null || _a === void 0 ? void 0 : _a.definitions.length).toBe(2);
        });
        it("works with a custom tagname", () => {
            var _a;
            const textDocument = mockTextDocument(`
      gqltag\`
        {
          hero {
            ...Hero_character
          }
        }

        \${Hero.fragments.character}

        {
          reviews(episode: NEWHOPE) {
            ...ReviewList_reviews
          }
        }

        \${ReviewList.fragments.reviews}
      \`
    `);
            const documents = document_1.extractGraphQLDocuments(textDocument, "gqltag");
            expect(documents === null || documents === void 0 ? void 0 : documents.length).toEqual(1);
            expect(documents === null || documents === void 0 ? void 0 : documents[0].syntaxErrors.length).toBe(0);
            expect((_a = documents === null || documents === void 0 ? void 0 : documents[0].ast) === null || _a === void 0 ? void 0 : _a.definitions.length).toBe(2);
        });
    });
    describe("extracting documents from ReasonML extension nodes", () => {
        const mockTextDocument = (text) => ({
            getText: jest.fn().mockReturnValue(text),
            offsetAt() {
                return 0;
            },
            positionAt() {
                return {
                    character: 0,
                    line: 0,
                };
            },
            languageId: "reason",
            lineCount: 0,
            uri: "",
            version: 1,
        });
        it("works with ReasonRelay nodes", () => {
            var _a, _b;
            const textDocument = mockTextDocument(`
      module Query = [%relay.query
      {|
        query SomeQuery {
          id
        }
      |}
      ];

      module Fragment = [%relay.fragment
      {|
        fragment X on Hero {
          id
        }
      |}
      ];
    `);
            const documents = document_1.extractGraphQLDocuments(textDocument);
            expect(documents === null || documents === void 0 ? void 0 : documents.length).toEqual(2);
            expect(documents === null || documents === void 0 ? void 0 : documents[0].syntaxErrors.length).toBe(0);
            expect(documents === null || documents === void 0 ? void 0 : documents[1].syntaxErrors.length).toBe(0);
            expect((_a = documents === null || documents === void 0 ? void 0 : documents[0].ast) === null || _a === void 0 ? void 0 : _a.definitions.length).toBe(1);
            expect((_b = documents === null || documents === void 0 ? void 0 : documents[1].ast) === null || _b === void 0 ? void 0 : _b.definitions.length).toBe(1);
        });
        it("works with graphql_ppx style node", () => {
            var _a;
            const textDocument = mockTextDocument(`
      module Query = [%graphql
      {|
        query SomeQuery {
          id
        }
      |}
      ];
    `);
            const documents = document_1.extractGraphQLDocuments(textDocument);
            expect(documents === null || documents === void 0 ? void 0 : documents.length).toEqual(1);
            expect(documents === null || documents === void 0 ? void 0 : documents[0].syntaxErrors.length).toBe(0);
            expect((_a = documents === null || documents === void 0 ? void 0 : documents[0].ast) === null || _a === void 0 ? void 0 : _a.definitions.length).toBe(1);
        });
    });
});
//# sourceMappingURL=document.test.js.map