"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootNode = void 0;
const collection_1 = require("./collection");
const favorite_1 = require("./favorite");
class RootNode {
    constructor(store, favorites) {
        this.store = store;
        this.favorites = favorites;
        this.id = "root";
        this.parent = undefined;
        this.favorite = new favorite_1.FavoriteCollectionsNode(this, this.store, this.favorites);
        this.collections = new collection_1.CollectionsNode(this, this.store);
        this.item = {};
    }
    getChildren() {
        return __awaiter(this, void 0, void 0, function* () {
            return [this.favorite, this.collections];
        });
    }
}
exports.RootNode = RootNode;
//# sourceMappingURL=root.js.map