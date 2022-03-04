"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deep_clone = exports.serialize = exports.has_key = void 0;
/**
 * Util module for Objects
 *
 */
const json = __importStar(require("./json"));
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
function deep_clone(obj) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    return json.clean_parse(json.safe_stringify(obj));
}
exports.deep_clone = deep_clone;
//# sourceMappingURL=object.js.map