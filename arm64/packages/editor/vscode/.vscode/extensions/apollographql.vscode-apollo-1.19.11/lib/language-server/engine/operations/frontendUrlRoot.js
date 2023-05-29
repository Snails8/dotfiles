"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRONTEND_URL_ROOT = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.FRONTEND_URL_ROOT = graphql_tag_1.default `
  query FrontendUrlRoot {
    frontendUrlRoot
  }
`;
//# sourceMappingURL=frontendUrlRoot.js.map