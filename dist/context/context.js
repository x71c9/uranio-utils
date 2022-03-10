"use strict";
/**
 * Context module
 *
 * @packageDocumentation
 */
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
exports.init = void 0;
const util = __importStar(require("../util/index"));
const exception = __importStar(require("../exception/index"));
const urn_exc = exception.init(`CONTEXT_MODULE`, `Context module`);
class Context {
    // public is_init:boolean
    constructor(_default, _is_production) {
        this._is_production = _is_production;
        this.context = _default;
        // this.is_init = false;
    }
    set(_overwrite) {
        Object.assign(this.context, _overwrite);
        return this.context;
    }
    get(key) {
        if (!util.object.has_key(this.context, key)) {
            throw urn_exc.create(`INVALID_CONTEXT_KEY`, `Cannot find key [${key}] in Context.`);
        }
        if (!this._is_production
            && typeof this.context[`dev_${key}`] !== 'undefined') {
            return this.context[`dev_${key}`];
        }
        return this.context[key];
    }
}
function init(_default, _is_production) {
    const ctx = new Context(_default, _is_production);
    return ctx;
}
exports.init = init;
//# sourceMappingURL=context.js.map