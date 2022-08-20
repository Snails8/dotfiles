"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesStore = void 0;
class FavoritesStore {
    constructor(context, platform) {
        this.context = context;
        this.platform = platform;
    }
    key() {
        return `openapi-42crunch.favorite-${this.platform.connection.platformUrl}`;
    }
    getFavoriteCollectionIds() {
        const favorite = this.context.globalState.get(this.key());
        if (!favorite) {
            return [];
        }
        return favorite;
    }
    addFavoriteCollection(id) {
        const favorite = this.getFavoriteCollectionIds();
        if (!favorite.includes(id)) {
            favorite.push(id);
        }
        this.context.globalState.update(this.key(), favorite);
    }
    removeFavoriteCollection(id) {
        const favorite = this.getFavoriteCollectionIds().filter((existng) => existng !== id);
        this.context.globalState.update(this.key(), favorite);
    }
}
exports.FavoritesStore = FavoritesStore;
//# sourceMappingURL=favorites-store.js.map