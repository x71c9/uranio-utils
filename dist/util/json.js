"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safe_stringify_oneline = exports.safe_stringify = void 0;
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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function safe_stringify_oneline(obj, white_space = ' ') {
    if (obj === null || typeof obj !== 'object') {
        return '';
    }
    try {
        return JSON.stringify(obj, (k, v) => {
            if (v instanceof Set) {
                let set_string = `Set(${v.size})`;
                set_string += ` { `;
                const array_set = Array.from(v);
                const set_elements = array_set.map(el => `'${el}'`).join(', ');
                set_string += set_elements + ` }`;
                v = set_string;
            }
            v = (v instanceof Set) ? Array.from(v).toString() : v;
            return v === undefined || k === undefined ? 'undefined' : v;
        }, white_space);
    }
    catch (e) {
        return '[ERROR] ' + e.message;
    }
}
exports.safe_stringify_oneline = safe_stringify_oneline;
//# sourceMappingURL=json.js.map