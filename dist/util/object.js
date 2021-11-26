"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = exports.has_key = void 0;
/**
 * Util module for Objects
 *
 */
/*
 * Returns a list of keys to use in loops so Typescript do not complain about keys
 *
 * @param object - The object
 *
 * ```
 * for(let k in keys(obj))
 * for(let k of keys(obj))
 * ```
 */
// export function keys<O extends object>(obj: O): Array<keyof O> {
//   return Object.keys(obj) as Array<keyof O>;
// }
/*
 * Function that checks if a key is present in an object so Tyepscript do no complain
 *
 * @param obj - The object
 * @param key - The key to check
 *
 * ```
 * if(hasKey(obj,key))
 * ```
 */
function has_key(obj, key) {
    // if(typeof obj === 'undefined')
    //   return false;
    return key in obj;
}
exports.has_key = has_key;
function serialize(obj, prefix = '') {
    const str = [];
    if (typeof obj !== 'object') {
        return '';
    }
    for (const p in obj) {
        if (has_key(obj, p)) {
            const k = prefix ? prefix + "[" + p + "]" : p;
            const v = obj[p];
            str.push((v !== null && typeof v === "object") ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
}
exports.serialize = serialize;
//# sourceMappingURL=object.js.map