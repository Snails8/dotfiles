"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleInstanceTimeout = exports.sleep = exports.exec = void 0;
const cp = require("child_process");
function exec(cmd, args) {
    return new Promise((resolve, reject) => {
        cp.execFile(cmd, args, (err, stdout, stderr) => {
            if (err) {
                return reject(err);
            }
            return resolve({ stdout, stderr });
        });
    });
}
exports.exec = exec;
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleep = sleep;
// A small wrapper around setTimeout which ensures that only a single timeout
// timer can be running at a time. Attempts to add a new timeout silently fail.
class SingleInstanceTimeout {
    constructor() {
        this.timerLock = false;
        this.timerId = null;
    }
    timeout(fn, delay, ...args) {
        if (!this.timerLock) {
            this.timerLock = true;
            // temporary fix until we use platform specific extensions and can remove this class
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.timerId = setTimeout(() => {
                this.timerLock = false;
                fn();
            }, delay, args);
        }
    }
    clear() {
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
        this.timerLock = false;
    }
}
exports.SingleInstanceTimeout = SingleInstanceTimeout;
//# sourceMappingURL=utils.js.map