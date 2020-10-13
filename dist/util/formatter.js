"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonOneLine = void 0;
/**
 * Stringify in oneline
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function jsonOneLine(obj, white_space = ' ') {
    return JSON.stringify(obj, (k, v) => { return v === undefined || k === undefined ? 'undefined' : v; }, white_space);
}
exports.jsonOneLine = jsonOneLine;
//# sourceMappingURL=formatter.js.map