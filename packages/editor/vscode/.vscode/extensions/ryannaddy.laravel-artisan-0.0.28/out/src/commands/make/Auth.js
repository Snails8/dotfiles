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
const Common_1 = require("../../Common");
class MakeAuth extends Common_1.default {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            let onlyViews = yield this.getYesNo('Should only the views be created?');
            let overWrite = yield this.getYesNo('Should the views be overwritten?');
            let command = `make:auth ${onlyViews ? '--views' : ''} ${overWrite ? '--force' : ''}`;
            // Generate the controller
            this.execCmd(command, (info) => __awaiter(this, void 0, void 0, function* () {
                if (info.err) {
                    this.showError('Could not create the auth', info.err);
                }
                else {
                    this.showMessage('Auth has successfully be created.');
                }
            }));
        });
    }
}
exports.default = MakeAuth;
//# sourceMappingURL=Auth.js.map