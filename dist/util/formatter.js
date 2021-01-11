"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json_one_line = void 0;
/**
 * Stringify in oneline
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function json_one_line(obj, white_space = ' ') {
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
exports.json_one_line = json_one_line;
//# sourceMappingURL=formatter.js.map