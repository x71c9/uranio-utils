"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safe_json_stringify = void 0;
/**
 * Util module for JSON
 *
 */
function safe_json_stringify(obj) {
    try {
        return JSON.stringify(obj);
    }
    catch (ex) {
        return `{error: ${ex.getMessage}}`;
    }
}
exports.safe_json_stringify = safe_json_stringify;
//# sourceMappingURL=json.js.map