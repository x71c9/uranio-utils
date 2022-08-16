"use strict";
/**
 * Context module
 *
 * The Context calss is an abstraction for handling configuration object and
 * environmental variables.
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
exports.create = void 0;
const util = __importStar(require("../util/index"));
const exception = __importStar(require("../exception/index"));
const log = __importStar(require("../log/index"));
const urn_exc = exception.init(`CONTEXT_MODULE`, `Context module`);
class Context {
    constructor(_default, _is_production, name) {
        this._is_production = _is_production;
        this.name = name;
        this.context = _default;
    }
    set(_overwrite) {
        for (const [okey, ovalue] of Object.entries(_overwrite)) {
            if (typeof ovalue === typeof this.context[okey]) {
                this.context[okey] = ovalue;
            }
            // const noclientkey = okey.replace(`client_`,'');
            // if(typeof ovalue === typeof this.context[noclientkey]){
            //   this.context[okey as keyof T] = ovalue;
            // }
            // // server context must contain also client_ starting key
            // // so that util generate client config can work.
            // if(okey.indexOf('client_') === 0){
            //   this.context[okey as keyof T] = ovalue;
            // }
        }
        return this.context;
    }
    get(key) {
        if (!util.object.has_key(this.context, key)) {
            throw urn_exc.create(`INVALID_CONTEXT_KEY`, `Cannot find key [${key}] in Context.`);
        }
        return this._get(key);
    }
    get_all() {
        return this.context;
    }
    set_env() {
        const env = this._get_env_vars();
        // console.log(this.name, env);
        this.set(env);
    }
    /**
     * Do not check if the key paramter is a valid one.
     *
     * @param key: any key
     */
    get_any(key) {
        return this._get(key);
    }
    _get(key) {
        if (!this._is_production
            && typeof this.context[`dev_${key}`] !== 'undefined') {
            return this.context[`dev_${key}`];
        }
        return this.context[key];
    }
    _get_env_vars() {
        const env = {};
        for (const [conf_key, conf_value] of Object.entries(this.context)) {
            const env_var_name = `URN_${conf_key.toUpperCase()}`;
            if (env_var_name === `URN_LOG_LEVEL` || env_var_name === `URN_DEV_LOG_LEVEL`) {
                const string_log_level = process.env[env_var_name];
                if (typeof string_log_level === 'string' && string_log_level.length > 1) {
                    process.env[env_var_name] = log.LogLevel[string_log_level];
                }
            }
            switch (typeof conf_value) {
                case 'number': {
                    if (typeof process.env[env_var_name] === 'number'
                        || typeof process.env[env_var_name] === 'string'
                            && process.env[env_var_name] !== '') {
                        env[conf_key] = Number(process.env[env_var_name]);
                    }
                    break;
                }
                case 'boolean': {
                    if (typeof process.env[env_var_name] === 'boolean'
                        || typeof process.env[env_var_name] === 'string'
                            && process.env[env_var_name] !== '') {
                        env[conf_key] =
                            (process.env[env_var_name] === 'true')
                                || (process.env[env_var_name] === true);
                    }
                    break;
                }
                case 'string': {
                    if (typeof process.env[env_var_name] === 'string'
                        && process.env[env_var_name] !== '') {
                        env[conf_key] = process.env[env_var_name];
                    }
                    break;
                }
            }
        }
        return env;
    }
}
function create(_default, _is_production, name) {
    const ctx = new Context(_default, _is_production, name);
    return ctx;
}
exports.create = create;
//# sourceMappingURL=context.js.map