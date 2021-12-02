"use strict";
/**
 * Module for logging
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.warn = exports.debug = exports.fn_debug = exports.init = exports.defaults = void 0;
const types_1 = require("./types");
const log_defaults_1 = __importDefault(require("./log.defaults"));
exports.defaults = log_defaults_1.default;
const console_injectors_1 = require("./console_injectors");
/**
 * Log init
 *
 * @param type - the injector method type, same as LogType.
 * @param context - the injector context type, same as LogContext.
 * @param injectors - this will override the default injector [the console injector]
 */
function init(level, context, prefix, injectors) {
    if (level) {
        log_defaults_1.default.log_level = level;
    }
    if (context) {
        log_defaults_1.default.context = context;
    }
    if (prefix) {
        log_defaults_1.default.prefix = prefix;
    }
    if (Array.isArray(injectors) && injectors.length > 0) {
        log_defaults_1.default.injectors = injectors;
    }
    else {
        const log_injector = (log_defaults_1.default.context === types_1.LogContext.BROWSER) ?
            console_injectors_1.console_injectors.browser : console_injectors_1.console_injectors.terminal;
        log_defaults_1.default.injectors = [log_injector];
    }
}
exports.init = init;
/**
 * Function that will check the type and run the corresponding injector method
 *
 * @param type - the injector method type, same as LogType.
 * @param ...params - parameters to log.
 */
function _run_injector(type, ...params) {
    if (!Array.isArray(log_defaults_1.default.injectors) || log_defaults_1.default.injectors.length == 0)
        return;
    for (const injector of log_defaults_1.default.injectors) {
        if (typeof injector !== 'object')
            return;
        switch (type) {
            case 'error':
                if (typeof injector.error_inject === 'function')
                    injector.error_inject(...params);
                break;
            case 'warn':
                if (typeof injector.warn_inject === 'function')
                    injector.warn_inject(...params);
                break;
            case 'debug':
                if (typeof injector.debug_inject === 'function')
                    injector.debug_inject(...params);
                break;
            case 'fn_debug':
                if (typeof injector.fn_debug_inject === 'function')
                    injector.fn_debug_inject(...params);
                break;
        }
    }
}
/**
 * Debug functions log
 *
 * @param ...params - variables to log
 */
function fn_debug(...params) {
    if (log_defaults_1.default.log_level > 3) {
        _run_injector('fn_debug', ...params);
    }
}
exports.fn_debug = fn_debug;
/**
 * Debug log
 *
 * @param ...params - variables to log
 */
function debug(...params) {
    if (log_defaults_1.default.log_level > 2) {
        _run_injector('debug', ...params);
    }
}
exports.debug = debug;
/**
 * Warning log
 *
 * @param ...params - variables to log
 */
function warn(...params) {
    if (log_defaults_1.default.log_level > 1) {
        _run_injector('warn', ...params);
    }
}
exports.warn = warn;
/**
 * Error log
 *
 * @param ...params - variables to log
 */
function error(...params) {
    if (log_defaults_1.default.log_level > 0) {
        _run_injector('error', ...params);
    }
}
exports.error = error;
//# sourceMappingURL=log.js.map