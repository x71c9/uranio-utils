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
exports.error = exports.warn = exports.success = exports.info = exports.debug = exports.trace = exports.init = exports.defaults = void 0;
const minimist_1 = __importDefault(require("minimist"));
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
        if (log_config.prefix_log_type === true) {
            log_defaults_1.default.prefix_log_type = true;
        }
        if (log_config.debug_info === false) {
            log_defaults_1.default.debug_info = false;
        }
        if (log_config.color === false) {
            log_defaults_1.default.color = false;
        }
        if (log_config.full_trace === true) {
            log_defaults_1.default.full_trace = true;
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
    // When flag --prefix_logtype is set set default prefix_log_type = true
    // and log_level = TRACE
    const args = (0, minimist_1.default)(process.argv.slice(2));
    if (args.prefix_logtype == true) {
        log_defaults_1.default.prefix_log_type = true;
        log_defaults_1.default.log_level = types_1.LogLevel.TRACE;
    }
    // for(const cmd of process.argv.slice(2)){
    // 	const splitted = cmd.split('=');
    // 	if(splitted[0] === 'urn_prefix_loglevel'){
    // 		log_defaults.prefix_log_type = (!!splitted[1]);
    // 	}
    // }
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
            case 'info':
                if (typeof injector.info_inject === 'function')
                    injector.info_inject(...params);
                break;
            case 'success':
                if (typeof injector.success_inject === 'function')
                    injector.success_inject(...params);
                break;
            case 'debug':
                if (typeof injector.debug_inject === 'function')
                    injector.debug_inject(...params);
                break;
            case 'trace':
                if (typeof injector.trace_inject === 'function')
                    injector.trace_inject(...params);
                break;
        }
    }
}
/**
 * Debug functions log
 *
 * @param ...params - variables to log
 */
function trace(...params) {
    if (log_defaults_1.default.log_level > 4) {
        _run_injector('trace', ...params);
    }
}
exports.trace = trace;
/**
 * Debug log
 *
 * @param ...params - variables to log
 */
function debug(...params) {
    if (log_defaults_1.default.log_level > 3) {
        _run_injector('debug', ...params);
    }
}
exports.debug = debug;
/**
 * Info log
 *
 * @param ...params - variables to log
 */
function info(...params) {
    if (log_defaults_1.default.log_level > 2) {
        _run_injector('info', ...params);
    }
}
exports.info = info;
/**
 * Success log
 *
 * @param ...params - variables to log
 */
function success(...params) {
    if (log_defaults_1.default.log_level > 2) {
        _run_injector('success', ...params);
    }
}
exports.success = success;
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