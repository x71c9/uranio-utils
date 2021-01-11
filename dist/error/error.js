"use strict";
/**
 * Module for URANIO error
 *
 * @packageDocumentation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.URNError = void 0;
const urn_log = __importStar(require("../log/"));
class URNError extends Error {
    constructor(message = '', error) {
        super(message);
        this.message = message;
        urn_log.error(message);
        if (error)
            urn_log.error(error);
        const actual_prototype = new.target.prototype;
        Object.setPrototypeOf(this, actual_prototype);
    }
}
exports.URNError = URNError;
/**
 * A function the will create a URNError instance.
 * Its parameters are the same as the constructor of the class.
 */
function create(message = '', error) {
    // urn_log.fn_debug('create for URNError');
    return new URNError(message, error);
}
exports.default = create;
//# sourceMappingURL=error.js.map