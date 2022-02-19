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
function init(log_config) {
    if (typeof log_config === 'number') {
        log_defaults_1.default.log_level = log_config;
    }
    else if (log_config) {
        if (typeof log_config.log_level === 'number' && log_config.log_level >= 0) {
            log_defaults_1.default.log_level = log_config.log_level;
        }
        if (typeof log_config.time_format === 'string' && log_config.time_format !== '') {
            log_defaults_1.default.time_format = log_config.time_format;
        }
        if (typeof log_config.max_str_length === 'number' && log_config.max_str_length > 0) {
            log_defaults_1.default.max_str_length = log_config.max_str_length;
        }
        if (typeof log_config.context === 'string' && log_config.context !== '') {
            log_defaults_1.default.context = log_config.context;
        }
        if (typeof log_config.prefix === 'string' && log_config.prefix !== '') {
            log_defaults_1.default.prefix = log_config.prefix;
        }
        if (log_config.prefix_type === true) {
            log_defaults_1.default.prefix_type = true;
        }
        if (log_config.debug_info === false) {
            log_defaults_1.default.debug_info = false;
        }
        if (log_config.color === false) {
            log_defaults_1.default.color = false;
        }
    }
    if (typeof log_config === 'object'
        && log_config
        && Array.isArray(log_config.injectors)
        && log_config.injectors.length > 0) {
        log_defaults_1.default.injectors = log_config.injectors;
    }
    else {
        const log_injector = (log_defaults_1.default.context === types_1.LogContext.BROWSER) ?
            console_injectors_1.console_injectors.browser : console_injectors_1.console_injectors.terminal;
        log_defaults_1.default.injectors = [log_injector];
    }
    for (const cmd of process.argv) {
        const splitted = cmd.split('=');
        if (splitted[0] === 'urn_log_prefix_type') {
            log_defaults_1.default.prefix_type = (!!splitted[1]);
        }
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