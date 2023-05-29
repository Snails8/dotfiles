"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../validation");
const client_1 = require("../../project/client");
const path_1 = require("path");
const memfs_1 = require("memfs");
const config_1 = require("../../config");
const vscode_uri_1 = __importDefault(require("vscode-uri"));
const serviceSchema = `
  type Query {
    me: User
  }

  type User {
    name: String
    friends: [User]
  }
`;
const clientSchema = `
  extend type Query {
    isOnline: Boolean
  }
  extend type User {
    isLiked: Boolean
    localUser: User
  }
`;
const a = `
  query a {
    isOnline
    me {
      name
      localUser @client {
        friends {
          isLiked
        }
      }
      friends {
        name
        isLiked
      }
    }
  }
`;
const b = `
  query b {
    me {
      ... {
        isLiked
      }
      ... @client {
        localUser {
          name
        }
      }
    }
  }
`;
const c = `
  query c {
    me {
      ...isLiked
    }
  }
  fragment localUser on User @client {
    localUser {
      name
    }
  }
  fragment isLiked on User {
    isLiked
    ...localUser
  }
`;
const d = `
  fragment isLiked on User {
    isLiked
  }
  query d {
    me {
      ...isLiked
      ...locaUser
    }
  }
  fragment localUser on User @client {
    localUser {
      name
    }
  }
`;
const e = `
  fragment friends on User {
    friends {
      ...isLiked
      ... on User @client {
        localUser {
          name
        }
      }
    }
  }
  query e {
    isOnline @client
    me {
      ...friends
    }
  }
  fragment isLiked on User {
    isLiked
  }
`;
const f = `
  query f {
    me {
      ...isLiked @client
    }
  }
  fragment isLiked on User {
    isLiked
  }
`;
const rootURI = vscode_uri_1.default.file(process.cwd());
const config = new config_1.ApolloConfig({
    client: {
        service: {
            name: "server",
            localSchemaFile: "./schema.graphql",
        },
        includes: ["./src/**.graphql"],
        excludes: ["./__tests__"],
        validationRules: [validation_1.NoMissingClientDirectives],
    },
    engine: {},
});
class MockLoadingHandler {
    handle(_message, value) {
        return value;
    }
    handleSync(_message, value) {
        return value();
    }
    showError(_message) { }
}
jest.mock("fs");
describe("client state", () => {
    beforeEach(() => {
        memfs_1.vol.fromJSON({
            "apollo.config.js": `module.exports = {
            client: {
                service: {
                    localSchemaFile: './schema.graphql'
                }
            }
        }`,
            "schema.graphql": serviceSchema,
            "src/client-schema.graphql": clientSchema,
            "src/a.graphql": a,
            "src/b.graphql": b,
            "src/c.graphql": c,
            "src/d.graphql": d,
            "src/e.graphql": e,
        });
    });
    afterEach(jest.restoreAllMocks);
    it("should report validation errors for missing @client directives", async () => {
        const project = new client_1.GraphQLClientProject({
            config,
            loadingHandler: new MockLoadingHandler(),
            configFolderURI: rootURI,
        });
        const errors = Object.create(null);
        project.onDiagnostics(({ diagnostics, uri }) => {
            const path = path_1.basename(vscode_uri_1.default.parse(uri).path);
            diagnostics.forEach(({ error }) => {
                if (!errors[path])
                    errors[path] = [];
                errors[path].push(error);
            });
        });
        await project.whenReady;
        await project.validate();
        expect(errors).toMatchInlineSnapshot(`
      Object {
        "a.graphql": Array [
          [GraphQLError: @client directive is missing on local field "isOnline"],
          [GraphQLError: @client directive is missing on local field "isLiked"],
        ],
        "b.graphql": Array [
          [GraphQLError: @client directive is missing on fragment around local fields "isLiked"],
        ],
        "c.graphql": Array [
          [GraphQLError: @client directive is missing on fragment "isLiked" around local fields "isLiked,localUser"],
        ],
        "d.graphql": Array [
          [GraphQLError: @client directive is missing on fragment "isLiked" around local fields "isLiked"],
        ],
        "e.graphql": Array [
          [GraphQLError: @client directive is missing on fragment "isLiked" around local fields "isLiked"],
        ],
      }
    `);
    });
});
//# sourceMappingURL=NoMissingClientDirectives.test.js.map