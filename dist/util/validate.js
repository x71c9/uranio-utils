"use strict";
/**
 * Util mixed functions module
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.email = exports.date = void 0;
function date(v) {
    return Object.prototype.toString.call(v) === '[object Date]';
}
exports.date = date;
function email(v) {
    // const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    // return re.test(v);
    return /\S+@\S+\.\S+/.test(v);
}
exports.email = email;
//# sourceMappingURL=validate.js.map