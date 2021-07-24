"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safe_stringify = void 0;
/**
 * Util module for JSON
 *
 */
function safe_stringify(obj) {
    try {
        return JSON.stringify(obj);
    }
    catch (ex) {
        return `{error: ${ex.getMessage}}`;
    }
}
exports.safe_stringify = safe_stringify;
//# sourceMappingURL=json.js.map