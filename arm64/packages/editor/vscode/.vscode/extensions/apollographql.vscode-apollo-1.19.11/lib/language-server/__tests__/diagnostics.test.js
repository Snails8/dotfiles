"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const document_1 = require("../document");
const diagnostics_1 = require("../diagnostics");
const starwarsSchema_1 = require("./fixtures/starwarsSchema");
const schema = graphql_1.buildClientSchema(starwarsSchema_1.starwarsSchema);
const validDocument = new document_1.GraphQLDocument(new graphql_1.Source(`
    query HeroAndFriendsNames {
      hero {
        name
        friends {
          name
        }
      }
    }`));
const invalidDocument = new document_1.GraphQLDocument(new graphql_1.Source(`
    query HeroAndFriendsNames {
      hero {
        nam         # Missing letter 'e'
        friend {    # Missing letter 's'
          name
        }
      }
    }`));
const documentWithTypes = new document_1.GraphQLDocument(new graphql_1.Source(`
    type SomeType {
      thing: String
    }
     enum SomeEnum {
      THING_ONE
      THING_TWO
    }
     query HeroAndFriendsNames {
      hero {
        name
        friends {
          name
        }
      }
    }`));
const documentWithOffset = new document_1.GraphQLDocument(new graphql_1.Source(`query QueryWithOffset { hero { nam } }`, "testDocument", {
    line: 5,
    column: 10,
}));
describe("Language server diagnostics", () => {
    describe("#collectExecutableDefinitionDiagnositics", () => {
        it("returns no diagnostics for a correct document", () => {
            const diagnostics = diagnostics_1.collectExecutableDefinitionDiagnositics(schema, validDocument);
            expect(diagnostics.length).toEqual(0);
        });
        it("returns two diagnostics for a document with two errors", () => {
            const diagnostics = diagnostics_1.collectExecutableDefinitionDiagnositics(schema, invalidDocument);
            expect(diagnostics.length).toEqual(2);
        });
        it("returns no diagnostics for a document that includes type definitions", () => {
            const diagnostics = diagnostics_1.collectExecutableDefinitionDiagnositics(schema, documentWithTypes);
            expect(diagnostics.length).toEqual(0);
        });
        it("correctly offsets locations", () => {
            const diagnostics = diagnostics_1.collectExecutableDefinitionDiagnositics(schema, documentWithOffset);
            expect(diagnostics.length).toEqual(1);
            expect(diagnostics[0].range.start.character).toEqual(40);
        });
    });
});
//# sourceMappingURL=diagnostics.test.js.map