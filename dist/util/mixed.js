"use strict";
/**
 * Util mixed functions module
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_date = void 0;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function is_date(v) {
    return Object.prototype.toString.call(v) === '[object Date]';
}
exports.is_date = is_date;
//# sourceMappingURL=mixed.js.map